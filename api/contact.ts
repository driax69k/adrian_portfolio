interface ContactPayload {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
}

const MAX_BODY_BYTES = 12_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (body: Record<string, unknown>, status = 200) =>
  Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
    },
  });

const cleanText = (value: unknown) =>
  typeof value === 'string' ? value.replace(/\r\n/g, '\n').trim() : '';

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response(null, {
      status: 405,
      headers: { Allow: 'POST' },
    });
  }

  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return json({ ok: false, message: 'The message is too large.' }, 413);
  }

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return json({ ok: false, message: 'Invalid request body.' }, 400);
  }

  const name = cleanText(payload.name);
  const email = cleanText(payload.email).toLowerCase();
  const subject = cleanText(payload.subject).replace(/[\r\n]+/g, ' ');
  const message = cleanText(payload.message);
  const website = cleanText(payload.website);

  // Bots commonly complete this hidden field. Return success without sending.
  if (website) {
    return json({ ok: true, message: 'Message sent successfully.' });
  }

  if (name.length < 2 || name.length > 80) {
    return json({ ok: false, message: 'Please enter a valid name.' }, 400);
  }

  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return json({ ok: false, message: 'Please enter a valid email address.' }, 400);
  }

  if (subject.length < 3 || subject.length > 120) {
    return json({ ok: false, message: 'Please enter a valid subject.' }, 400);
  }

  if (message.length < 15 || message.length > 5_000) {
    return json(
      {
        ok: false,
        message: 'Your message must contain between 15 and 5,000 characters.',
      },
      400,
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail =
    process.env.CONTACT_TO_EMAIL ?? 'adriancordero.business@gmail.com';
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ??
    'Adrian Cordero Portfolio <onboarding@resend.dev>';

  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured.');
    return json(
      {
        ok: false,
        message: 'Email delivery is not configured yet. Please email me directly.',
      },
      503,
    );
  }

  const emailText = [
    'New portfolio contact form submission',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    '',
    'Message:',
    message,
  ].join('\n');

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': crypto.randomUUID(),
        'User-Agent': 'adrian-cordero-portfolio/1.0',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        text: emailText,
      }),
    });

    if (!resendResponse.ok) {
      const resendError = await resendResponse.text();
      console.error('Resend rejected the contact email:', resendError);
      return json(
        {
          ok: false,
          message: 'The message could not be delivered. Please try again later.',
        },
        502,
      );
    }

    return json({ ok: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Contact email delivery failed:', error);
    return json(
      {
        ok: false,
        message: 'The email service is temporarily unavailable. Please try again.',
      },
      502,
    );
  }
}
