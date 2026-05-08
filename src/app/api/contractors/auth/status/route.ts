import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { isContractorAuthorized } from "@/lib/contractor-auth";

export async function GET() {
  const cookieStore = await cookies();

  if (!isContractorAuthorized(cookieStore)) {
    return new NextResponse("Not Found", { status: 404 });
  }

  return NextResponse.json({ authorized: true });
}
