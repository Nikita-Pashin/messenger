import { getTokenPayload } from "@/shared/helpers/getTokenPayload/getTokenPayload";
import { NextApiRequest, NextApiResponse } from "next";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/db";

export async function GET(req: NextApiRequest, { params }: { params: unknown }) {
  try {
    const headersList = headers()
    const token = headersList.get('token')

    if (typeof token !== 'string') {
      throw new Error('Something went wrong!');
    }
    
    const tokenPayload = getTokenPayload(token);
    
    if (typeof tokenPayload === 'string') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (
      params
      && typeof params === 'object'
      && 'chatId' in params
      && typeof params.chatId === 'number'
    ) {
      const chat = await prisma.chat.findFirst({
        where: {
          id: params.chatId
        },
      });
  
      return NextResponse.json({ chat }, { status: 200 });
    }
    
    return NextResponse.json(null, { status: 400, statusText: 'Bad Request'});
  } catch (e) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}