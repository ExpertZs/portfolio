import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacy policy' };

export default function PrivacyPage() {
  return <article className="mx-auto max-w-3xl py-10 text-brand-text">
    <h1 className="text-4xl font-bold">Privacy policy</h1>
    <p className="mt-3 text-sm text-brand-muted">Last updated: November 11, 2026</p>
    <div className="mt-8 space-y-7 rounded-3xl border border-brand-border bg-brand-surface p-6 leading-relaxed md:p-10">
      <section><h2 className="text-xl font-semibold">About this website</h2><p className="mt-2 text-brand-muted">This is Md. Zahidul Islam’s professional portfolio. Zahidul Portfolio Mail is the contact-form email integration used to receive inquiries.</p></section>
      <section><h2 className="text-xl font-semibold">Contact messages</h2><p className="mt-2 text-brand-muted">When you submit the contact form, your name, email address, subject, and message are processed to deliver your inquiry and respond to it. The website hosting service, Cloudflare Worker, and Google Gmail process this information for delivery. Messages received in Gmail may be retained for correspondence; you can request deletion by emailing me.</p></section>
      <section><h2 className="text-xl font-semibold">Google account access</h2><p className="mt-2 text-brand-muted">Only the portfolio owner authorizes Gmail access. The integration uses the Gmail send permission to send contact notifications to the owner’s mailbox. It does not request permission to read inbox messages. Visitors do not sign in with Google or grant access to their Google accounts. OAuth credentials are stored on the server and are not exposed to visitors.</p></section>
      <section><h2 className="text-xl font-semibold">AI features and preferences</h2><p className="mt-2 text-brand-muted">If an AI provider is configured, questions and job descriptions submitted to the AI features are sent to that provider to generate a response. Otherwise, these features use resume-based fallback responses. Please avoid submitting confidential information. Your browser stores interface preferences such as the selected theme. Hosting services may process technical request data to operate and protect the website.</p></section>
      <section><h2 className="text-xl font-semibold">Use and sharing</h2><p className="mt-2 text-brand-muted">Personal information is used to handle inquiries and operate these features. It is not sold or used for advertising. Google user data is not used to train AI models. Information is shared with service providers as needed for these functions or where legally required.</p></section>
      <section><h2 className="text-xl font-semibold">Contact and deletion requests</h2><p className="mt-2 text-brand-muted">For privacy questions or requests to delete your correspondence, email <a className="text-brand-accent underline underline-offset-4" href="mailto:zs.engineer1@gmail.com">zs.engineer1@gmail.com</a>.</p></section>
    </div>
  </article>;
}
