import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/db";
import { getTokenPayload } from "@/shared/helpers/getTokenPayload/getTokenPayload";

const getUsers = (thatUserId: number) => {
  return prisma.user.findMany({
    where: {
      id: {
        not: thatUserId,
      }
    },
    include: {
      chats: {
        where: {
          users: {
            some: {
              id: {
                equals: thatUserId,
              }
            }
          },
          type: {
            equals: 'Private',
          }
        }
      }
    }
  });
};

export type GetUsersApi = Awaited<ReturnType<typeof getUsers>>

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
      tokenPayload = getTokenPayload(token) as { id: number };
    } catch (e) {
      return NextResponse.json({ error: 'Unauthorized' }, {
        status: 401,
        headers: { "Set-Cookie": `access_token=null; Secure; HttpOnly; SameSite=None; Path=/; Max-Age=0;` }
      });
    }
    
    const result = await getUsers(tokenPayload.id);

    return NextResponse.json(result);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}