import { getTokenPayload } from "@/shared/helpers/getTokenPayload/getTokenPayload";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prisma/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
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
    
    const chats = await prisma.chat.findMany({
      where: {
        users: {
          every: {
            id: Number(tokenPayload.sub),
          },
        },
      },
    });

    return NextResponse.json({ chats }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}