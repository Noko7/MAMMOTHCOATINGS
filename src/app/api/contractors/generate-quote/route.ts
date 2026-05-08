import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { isContractorAuthorized } from "@/lib/contractor-auth";

type QuotePayload = {
  sqft: number;
  coat: string;
  markup: number;
  phaseLabel: string;
  customerQuote: number;
  mammothCut: number;
  materialCost: number;
  contractorNet: number;
  deposit: number;
  finalPayment: number;
  generatedAt: string;
};

function fmt(n: number) {
  return `$${Math.round(n).toLocaleString()}`;
}

export async function POST(request: Request) {
  const cookieStore = await cookies();

  if (!isContractorAuthorized(cookieStore)) {
    return new NextResponse("Not Found", { status: 404 });
  }

  let payload: QuotePayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const quoteText = [
    "MammothCoat Contractor Quote",
    "",
    `Generated: ${payload.generatedAt}`,
    `Square Feet: ${payload.sqft}`,
    `Coating Type: ${payload.coat}`,
    `Material Markup: ${payload.markup}%`,
    `Phase: ${payload.phaseLabel}`,
    "",
    `Customer Quote: ${fmt(payload.customerQuote)}`,
    `Mammoth Coat's Cut: ${fmt(payload.mammothCut)}`,
    `Real Material Cost: ${fmt(payload.materialCost)}`,
    `Contractor Net: ${fmt(payload.contractorNet)}`,
    "",
    `Deposit (50%): ${fmt(payload.deposit)}`,
    `Final Payment: ${fmt(payload.finalPayment)}`,
    "",
    "Customer Agreement:",
    "Download from /api/contractors/customer-agreement (authorized users only)",
    "",
    "This quote package is for contractor/internal use.",
  ].join("\n");

  const filename = `mammothcoat-quote-${new Date().toISOString().slice(0, 10)}.txt`;

  return new NextResponse(quoteText, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
