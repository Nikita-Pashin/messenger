import { getTokenPayload } from "@/shared/helpers/getTokenPayload/getTokenPayload";
import { prisma } from "../../../../prisma/db";
import { NextRequest, NextResponse } from "next/server";

const getChats = (userId: number) => {
  return prisma.chat.findMany({
    where: {
      users: {
        some: {
          id: userId,
        },
      },
    },
    include: {
      users: {
        where: {
          id: {
            not: userId,
          },
        },
        take: 1,
      },
      messages: {
        orderBy: {
          createdAt: 'asc',
        },
      }
    },
  })
}

export type ApiGetChats = Awaited<ReturnType<typeof getChats>>;

export async function GET(req: NextRequest) {
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
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const chats: ApiGetChats = await getChats(Number(tokenPayload.sub));

    return NextResponse.json(chats, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}