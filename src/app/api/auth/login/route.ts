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

  if (!user || user.password !== data.password) {
    return new Response('404 Not Found', {
      status: 404,
      statusText: '404 Not Found'
    })
  };

  const {
    avatarEmoji,
    fullName,
    id,
    login,
  } = user;

  const payload = {
    avatarEmoji,
    fullName,
    id,
    login,
  };

  const result = {
    access_token: await jwt.sign(payload, 'secret', { expiresIn: '1h' }),
  };

  return NextResponse.json(null, {
    headers: { "Set-Cookie": `access_token=Bearer ${result.access_token}; Secure; HttpOnly; SameSite=None; Path=/; Max-Age=99999999;` }
  });
}