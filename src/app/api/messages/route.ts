import { getTokenPayload } from "@/shared/helpers/getTokenPayload/getTokenPayload";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/db";

export async function POST(req: NextRequest) {
  try {
    const { cookies } = req;
    const accessToken = cookies.get('access_token');
    const body = await req.json() as unknown;

    if (!accessToken || !('value' in accessToken) || typeof accessToken.value !== 'string') {
      throw new Error('Something went wrong!');
    }

    const token = accessToken.value;
    let tokenPayload;
    
    try {
      tokenPayload = getTokenPayload(token);
    } catch (e) {
      return NextResponse.json({ error: 'Unauthorized' }, {
        status: 401,
        headers: { "Set-Cookie": `access_token=null; Secure; HttpOnly; SameSite=None; Path=/; Max-Age=0;` }
      });
    }

    if (
      body
      && typeof body === 'object'
      && 'text' in body
      && 'chatId' in body
      && typeof body.text === 'string'
      && typeof body.chatId === 'number'
    ) {
      const newMessage: ApiPostMessage = await prisma.message.create({
        data: {
          isReaded: false,
          text: body.text,
          chatId: Number(body.chatId),
          from: Number(tokenPayload?.sub || 0),
        }
      });
  
      return NextResponse.json({ newMessage }, { status: 200 });
    }

    if (
      body
      && typeof body === 'object'
      && 'text' in body
      && 'toUserId' in body
      && typeof body.text === 'string'
      && typeof body.toUserId === 'number'
    ) {
      const chat = await prisma.chat.findMany({
        where: {
          users: {
            every: {
              id: {
                in: [body.toUserId, Number(tokenPayload?.sub || 0)]
              }
            }
          },
        },
      });

      if (chat.length) {
        return NextResponse.json(null, { status: 400, statusText: 'Bad Request' });
      }

      const newChat = await prisma.chat.create({
        data: {
          users: {
            connect: [
              { id: body.toUserId },
              { id: Number(tokenPayload?.sub || 0) }
            ],
          },
        },
      });

      const newMessage: ApiPostMessage = await prisma.message.create({
        data: {
          isReaded: false,
          text: body.text,
          chatId: newChat.id,
          from: Number(tokenPayload?.sub || 0),
        }
      });
  
      return NextResponse.json({ newMessage }, { status: 200 });
    }

    return NextResponse.json(null, { status: 400, statusText: 'Bad Request' });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}