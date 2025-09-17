import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';

type RequestBody = {
  email?: string;
  message?: string;
};

const TO_EMAIL = process.env.OT_TO_EMAIL!;
const FROM_EMAIL = process.env.OT_FROM_EMAIL!;

const EMAIL_VALIDATION_REGEX =
  /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,}$/;

const MIN_MESSAGE_LENGTH = 1;
const MAX_MESSAGE_LENGTH = 3000;

const ses = new SESClient();

export async function handler(
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> {
  try {
    const body = <RequestBody>JSON.parse(event.body || '{}');
    const userEmail = body.email?.trim().toLowerCase() || '';
    const message = body.message?.trim() || '';

    if (!isEmail(userEmail) || !messageIsValid(message)) {
      return getResponse(400, { error: 'Invalid input' });
    }

    const { html, subject } = getPreparedEmail(userEmail, message);

    await ses.send(
      new SendEmailCommand({
        Destination: { ToAddresses: [TO_EMAIL] },
        Source: FROM_EMAIL,
        ReplyToAddresses: [userEmail],
        Message: {
          Subject: { Data: subject },
          Body: { Html: { Data: html } },
        },
      }),
    );

    return getResponse(200, { ok: true });
  } catch (err) {
    console.error(err);
    return getResponse(500, { error: 'Internal Server Error' });
  }
}

function messageIsValid(message: string): boolean {
  return message.length > MIN_MESSAGE_LENGTH || message.length <= MAX_MESSAGE_LENGTH;
}

function isEmail(value: string): boolean {
  return EMAIL_VALIDATION_REGEX.test(value);
}

function getPreparedEmail(
  userEmail: string,
  message: string,
): { subject: string; html: string } {
  return {
    subject: `🟠 Inquiry from ${userEmail}`,
    html: `
      <h2>New Inquiry</h2>
      <p><b>From:</b></p>
      <p>${escapeHtml(userEmail)}</p>
      <p><b>Message:</b></p>
      <p style="white-space:pre-line">${escapeHtml(message)}</p>
    `,
  };
}

const htmlEscapeMap: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (element) => {
    return htmlEscapeMap[element] || element;
  });
}

function getResponse(status: number, body?: unknown): APIGatewayProxyResultV2 {
  return {
    statusCode: status,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : '',
  };
}
