import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // your Gmail address
    pass: process.env.EMAIL_PASS, // your app password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export async function sendMail({ name, email, message }) {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Always use your verified Gmail as sender to avoid rejection
    replyTo: email,               // Reply-to is the user email who sent the message
    to: process.env.EMAIL_USER,   // Your Gmail to receive support emails
    subject: `Support message from ${name}`,
    text: message,
  };

  await transporter.sendMail(mailOptions);
}

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }

    await sendMail({ name, email, message });

    return new Response(JSON.stringify({ message: "Email sent successfully" }), { status: 200 });
  } catch (error: any) {
    console.error("Email send error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send email" }),
      { status: 500 }
    );
  }
}
