import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });
  return NextResponse.json(user);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const json = await request.json();
  const updated = await prisma.user.update({
    where: {
      id: parseInt(id, 10),
    },
    data: json,
  });

  return new NextResponse(JSON.stringify(updated), { status: 200 });
}
