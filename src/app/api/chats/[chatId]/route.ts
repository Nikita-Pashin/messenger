import { getTokenPayload } from "@/shared/helpers/getTokenPayload/getTokenPayload";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/db";

const getChat = (chatId: number, userId: number) => {
  return prisma.chat.findFirst({
    where: {
      id: chatId,
    },
    include: {
      users: {},
      messages: {},
    }
  })
}

export type ApiGetChat = Awaited<ReturnType<typeof getChat>>

export async function GET(req: NextRequest, { params }: { params: unknown }) {
  try {
    const { cookies } = req;
    const accessToken = cookies.get('access_token');

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
    
    if (typeof tokenPayload === 'string') {
      return NextResponse.json({ error: 'Unauthorized' }, {
        status: 401,
        headers: { "Set-Cookie": `access_token=null; Secure; HttpOnly; SameSite=None; Path=/; Max-Age=0;` }
      });
    }

    if (
      params
      && typeof params === 'object'
      && 'chatId' in params
      && typeof params.chatId === 'string'
    ) {
      const chat = await getChat(Number(params.chatId), Number(tokenPayload?.sub || 0));
  
      return NextResponse.json(chat, { status: 200 });
    }
    
    return NextResponse.json(null, { status: 400, statusText: 'Bad Request'});
  } catch (e) {
    console.error('Error', e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}