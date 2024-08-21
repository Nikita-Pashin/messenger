import { getTokenPayload } from "@/shared/helpers/getTokenPayload/getTokenPayload";
import { prisma } from "../../../../prisma/db";
import { headers } from "next/headers";
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
          createdAt: 'desc',
        },
      }
    },
  })
}

export type ApiGetChats = Awaited<ReturnType<typeof getChats>>;

export async function GET(req: NextRequest) {
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
    
    const chats: ApiGetChats = await getChats(Number(tokenPayload.sub));

    return NextResponse.json(chats, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}