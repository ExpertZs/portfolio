export const CONTACT_EMAIL = 'zs.engineer1@gmail.com';
export type ContactMessage = { name: string; email: string; title: string; message: string };

export function validateContact(value: unknown): ContactMessage | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const data = value as Record<string, unknown>;
  if (data.website) return null;
  const fields = ['name', 'email', 'title', 'message'] as const;
  if (fields.some(key => typeof data[key] !== 'string')) return null;
  const { name, email, title, message } = Object.fromEntries(
    fields.map(key => [key, (data[key] as string).trim()])
  ) as ContactMessage;
  if (name.length < 2 || name.length > 100 || /[\r\n]/.test(name) ||
      email.length > 200 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) ||
      !title || title.length > 100 || /[\r\n]/.test(title) ||
      message.length < 10 || message.length > 5000) return null;
  return { name, email, title, message };
}
