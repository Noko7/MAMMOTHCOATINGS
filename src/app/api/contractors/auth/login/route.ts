import { NextResponse } from "next/server";

import { CONTRACTOR_AUTH_COOKIE, getContractorPassword } from "@/lib/contractor-auth";

type LoginBody = {
  password?: string;
};

export async function POST(request: Request) {
  let body: LoginBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (body.password !== getContractorPassword()) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set({
    name: CONTRACTOR_AUTH_COOKIE,
    value: "1",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return response;
}
