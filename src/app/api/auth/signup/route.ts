import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/db";

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json() as unknown;

  if (
    data
    && typeof data === 'object'
    && 'login' in data
    && 'password' in data
    && 'fullname' in data
    && typeof data.login === 'string'
    && typeof data.password === 'string'
    && typeof data.fullname === 'string'
  ) {
    const {
      fullname,
      login,
      password,
    } = data;

    const newUser = await prisma.user.create({
      data: {
        fullName: fullname,
        login,
        password,
      },
    });

    return new Response('Пользователь создан', {
      status: 201,
      statusText: 'HTTP 201 Created'
    })
  }

  return new Response('Некорректные данные', {
    status: 400,
    statusText: 'HTTP 400 Bad Request'
  })
}