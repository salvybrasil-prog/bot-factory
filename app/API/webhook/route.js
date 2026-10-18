import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    return NextResponse.json({ success: true, message: "Webhook received", data: body });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "Active" });
}
