import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, interest, message } = body;

    // Validate required fields
    if (!name || !email || !interest || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    // Log the consultation request (replace with email/DB integration)
    console.log("=== New Consultation Request ===");
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Interest: ${interest}`);
    console.log(`Message: ${message}`);
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log("================================");

    // TODO: Integrate with email service (Resend, SendGrid) or database
    // Example with Resend:
    // await resend.emails.send({
    //   from: 'Recovery Altitude <hello@recoveryaltitude.com>',
    //   to: ['hello@recoveryaltitude.com'],
    //   subject: `Consultation Request: ${interest}`,
    //   replyTo: email,
    //   text: `Name: ${name}\nEmail: ${email}\nInterest: ${interest}\n\nMessage:\n${message}`,
    // });

    return NextResponse.json(
      { success: true, message: "Consultation request received." },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
