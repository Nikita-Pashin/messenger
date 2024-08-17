import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/db";

export async function GET() {
  const result = await prisma.user.findMany();

  return NextResponse.json(result);
}