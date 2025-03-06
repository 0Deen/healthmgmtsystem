import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// A faulty API route to test Sentry's error monitoring
export function GET() {
  const shouldThrowError = true; // Control the error condition

  if (shouldThrowError) {
    throw new Error("Sentry Example API Route Error");
  }

  return NextResponse.json({ data: "Testing Sentry Error..." });
}
