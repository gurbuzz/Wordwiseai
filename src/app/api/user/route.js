import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password, username } = await req.json();
    const newUser = await prisma.user.create({
      data: { email, password, username },
    });
    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
