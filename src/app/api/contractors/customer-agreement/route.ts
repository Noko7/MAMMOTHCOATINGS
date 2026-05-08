import { promises as fs } from "node:fs";
import path from "node:path";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { isContractorAuthorized } from "@/lib/contractor-auth";

const AGREEMENT_NAME = "MammothCoat_Customer_Agreement.docx";

export async function GET() {
  const cookieStore = await cookies();

  if (!isContractorAuthorized(cookieStore)) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const filePath = path.join(process.cwd(), AGREEMENT_NAME);

  try {
    const fileBuffer = await fs.readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${AGREEMENT_NAME}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return new NextResponse("Not Found", { status: 404 });
  }
}
