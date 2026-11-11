import { CONTACT_EMAIL, validateContact } from '../../lib/contact';

interface Env {
  CLIENT_ID: string;
  CLIENT_SECRET: string;
  REFRESH_TOKEN: string;
  MAIL_WORKER_SECRET: string;
}

const json = (body: object, status = 200) => Response.json(body, {
  status, headers: { 'Cache-Control': 'no-store' },
});
const base64 = (text: string) => btoa(String.fromCharCode(...new TextEncoder().encode(text)));

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (new URL(request.url).pathname !== '/send') return json({ error: 'Not found' }, 404);
    if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
    // Only the portfolio server can invoke delivery, never the public browser.
    if (!env.MAIL_WORKER_SECRET || request.headers.get('Authorization') !== `Bearer ${env.MAIL_WORKER_SECRET}`) {
      return json({ error: 'Unauthorized' }, 401);
    }
    if (!env.CLIENT_ID || !env.CLIENT_SECRET || !env.REFRESH_TOKEN) {
      return json({ error: 'Mail is not configured' }, 503);
    }
    let data;
    try {
      const reader = request.body?.getReader();
      if (!reader) return json({ error: 'Empty request' }, 400);
      const chunks: Uint8Array[] = [];
      let size = 0;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.length;
        if (size > 16000) { await reader.cancel(); return json({ error: 'Request too large' }, 413); }
        chunks.push(value);
      }
      const bytes = new Uint8Array(size);
      let offset = 0;
      for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
      data = validateContact(JSON.parse(new TextDecoder().decode(bytes)));
    } catch { return json({ error: 'Invalid request' }, 400); }
    if (!data) return json({ error: 'Invalid contact details' }, 400);

    try {
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        body: new URLSearchParams({
          client_id: env.CLIENT_ID, client_secret: env.CLIENT_SECRET,
          refresh_token: env.REFRESH_TOKEN, grant_type: 'refresh_token',
        }),
        signal: AbortSignal.timeout(5000),
      });
      const token = await tokenResponse.json() as { access_token?: string };
      if (!tokenResponse.ok || !token.access_token) throw new Error('OAuth failed');
      const content = [
        `From: Zahidul Portfolio <${CONTACT_EMAIL}>`,
        `To: ${CONTACT_EMAIL}`,
        `Reply-To: ${data.email}`,
        `Subject: =?UTF-8?B?${base64('[Portfolio] ' + data.title)}?=`,
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
        '',
        base64(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`).match(/.{1,76}/g)!.join('\r\n'),
      ].join('\r\n');
      const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token.access_token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ raw: base64(content).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '') }),
        signal: AbortSignal.timeout(7000),
      });
      const result = await response.json() as { id?: string };
      if (!response.ok || !result.id) throw new Error('Gmail rejected delivery');
      return json({ sent: true });
    } catch {
      // Never log OAuth tokens, secrets, or visitor message content.
      return json({ error: 'Email delivery could not be confirmed' }, 502);
    }
  },
};
