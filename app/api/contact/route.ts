import { CONTACT_EMAIL, validateContact } from '@/lib/contact';
import { allowRequest, readBody } from '@/lib/server';

export async function POST(req: Request) {
  if (!allowRequest(req)) return Response.json({ error: 'Please wait a minute and try again.' }, { status: 429 });
  let data;
  try { data = validateContact(await readBody(req)); } catch { data = null; }
  if (!data) return Response.json({ error: 'Please enter a valid name, email, subject, and message (10–5,000 characters).' }, { status: 400 });
  const endpoint = process.env.MAIL_WORKER_URL;
  const secret = process.env.MAIL_WORKER_SECRET;
  if (!endpoint || !secret) return Response.json({ error: `Message delivery is not available yet. Please email ${CONTACT_EMAIL} directly.` }, { status: 503 });
  try {
    const url = new URL(endpoint);
    if (url.protocol !== 'https:' && !(url.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(url.hostname))) throw new Error('Invalid worker URL');
    const response = await fetch(url, {
      method: 'POST', redirect: 'error',
      headers: { Authorization: `Bearer ${secret}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(data), signal: AbortSignal.timeout(15000),
    });
    const result = await response.json();
    if (!response.ok || result.sent !== true) throw new Error('Delivery not accepted');
    return Response.json({ sent: true, message: 'Your message has been submitted to Zahidul. Thank you for getting in touch!' });
  } catch {
    return Response.json({ error: `We could not confirm that your message was sent. Please try again later or email ${CONTACT_EMAIL} directly.` }, { status: 502 });
  }
}
