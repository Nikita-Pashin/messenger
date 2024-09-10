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
      tokenPayload = getTokenPayload(token) as { id: number };
    } catch (e) {
      return NextResponse.json({ error: 'Unauthorized' }, {
        status: 401,
        headers: { "Set-Cookie": `access_token=null; Secure; HttpOnly; SameSite=None; Path=/; Max-Age=0;` }
      });
    }

    if (
      body
      && typeof body === 'object'
      && 'id' in body
      && typeof body.id === 'number'
    ) {
      const newMessage: ApiPostMessage = await prisma.message.update({
        where: {
          id: body.id,
        },
        data: {
          isReaded: true,
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