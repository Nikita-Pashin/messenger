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

    const user = await prisma.user.findUnique({
      where: {
        login
      }
    });

    if (user) {
      return new Response(JSON.stringify({ message: 'User already exists' }), {
        status: 409,
        statusText: 'HTTP 409 Conflict'
      });
    }

    const newUser = await prisma.user.create({
      data: {
        fullName: fullname,
        login,
        password,
      },
    });

    return new Response(JSON.stringify(newUser), {
      status: 201,
      statusText: 'HTTP 201 Created'
    })
  }

  return new Response('Некорректные данные', {
    status: 400,
    statusText: 'HTTP 400 Bad Request'
  });
}