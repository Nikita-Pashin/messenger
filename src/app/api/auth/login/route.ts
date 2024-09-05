import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { prisma } from "../../../../../prisma/db";

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json() as unknown;

  if (
    !data
    || typeof data !== 'object'
    || !('login' in data)
    || !('password' in data)
    || typeof data.login !== 'string'
  ) {
    return new Response('Некорректные данные', {
      status: 400,
      statusText: 'HTTP 400 Bad Request'
    })
  }

  const user = await prisma.user.findUnique({
    where: {
      login: data.login,
    },
  });

  if (!user) {
    return new Response('Пользователь не найден', {
      status: 401,
      statusText: 'Unauthorised'
    })
  }

  const payload = { sub: user.id, username: user.fullName };

  const result = {
    access_token: await jwt.sign(payload, 'secret', { expiresIn: '10m' }),
  };

  return NextResponse.json(null, {
    headers: { "Set-Cookie": `access_token=Bearer ${result.access_token}; Secure; HttpOnly; SameSite=None; Path=/; Max-Age=99999999;` }
  });
}