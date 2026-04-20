import { NextResponse } from "next/server";

const RESEND_API_URL = "https://api.resend.com/contacts";

type ResendErrorResponse = {
  message?: string;
  name?: string;
};

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const segmentId = process.env.RESEND_SEGMENT_ID;

  if (!apiKey || !segmentId) {
    return NextResponse.json(
      { message: "Server is not configured for email collection." },
      { status: 500 }
    );
  }

  const body = (await request.json().catch(() => null)) as { email?: unknown } | null;
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }

  const resendResponse = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "User-Agent": "dolegal-landing/1.0",
    },
    body: JSON.stringify({
      email,
      segmentIds: [segmentId],
      unsubscribed: false,
    }),
  });

  const resendPayload = (await resendResponse.json().catch(() => null)) as ResendErrorResponse | null;
  const resendMessage = resendPayload?.message ?? "";

  // Resend may reject duplicates; keep UX positive for already-subscribed emails.
  if (!resendResponse.ok) {
    if (resendResponse.status === 409 || resendMessage.toLowerCase().includes("already")) {
      return NextResponse.json({ message: "This email is already on the early access list." });
    }

    return NextResponse.json(
      { message: "We could not add your email right now. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ message: "Success! You are on the early access list." });
}
