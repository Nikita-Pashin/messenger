import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/db";
import { jwtDecode } from "jwt-decode";

interface Res {
  message: string;
}

const getSome = (userId: string) => {
  return prisma.message.findMany({
    where: {
      OR: [
        {
          from: Number(userId),
        },
      ]
    },
    include: {
      fromUserId: true,
    },
  })
}

export type MessagesGetRouteReturnType = Awaited<ReturnType<typeof getSome>>

export async function GET(req: NextRequest, res: NextResponse<Res>) {
  const token = req.headers.get('token');

  if (!token) {
    return new Response('Hello, Next.js!', {
      status: 401,
      statusText: 'Unauthorised'
    });
  }

  const { sub: userId } = jwtDecode(token.split(' ')[1]);

  if (!userId) {
    return new Response('Hello, Next.js!', {
      status: 404,
      statusText: 'Not found'
    });
  }

  const result = await getSome(userId);

  return NextResponse.json(result);
}