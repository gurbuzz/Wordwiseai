import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"; // bcryptjs kullanıyoruz

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Kullanıcıyı email ile bul
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ success: false, error: "Kullanıcı bulunamadı." }, { status: 404 });
    }

    // Şifre kontrolü
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ success: false, error: "Şifre hatalı." }, { status: 401 });
    }

    // (Opsiyonel) JWT veya oturum yönetimi ekleyebilirsiniz.
    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
