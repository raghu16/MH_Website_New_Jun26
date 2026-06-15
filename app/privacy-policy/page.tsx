import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Monkhub collects, uses and protects your personal information.",
};

export default function Privacy() {
  return (
    <section className="container-page max-w-3xl py-24">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-4 font-serif text-5xl leading-[1.02]">Privacy Policy</h1>
      <p className="mt-4 font-mono text-xs text-muted">
        Effective and last updated: {new Date().getFullYear()}. (Placeholder — have counsel review
        and finalize before launch; add GDPR &amp; CCPA sections per the blueprint.)
      </p>

      <div className="prose-invert mt-10 space-y-8 text-muted">
        {[
          ["Information we collect", "We collect information you provide via our contact form (name, work email, phone, project details), and standard log/analytics data when you use this site."],
          ["How we use it", "To respond to your enquiry, prepare proposals, deliver and improve our services, and meet legal obligations. We do not sell your personal information."],
          ["Cookies & analytics", "We use cookies and analytics tools to understand site usage and improve performance. You can control cookies through your browser."],
          ["Sharing", "We share data only with service providers who help us operate (e.g., hosting, CRM), and where required by law."],
          ["Your rights (GDPR / CCPA)", "Depending on your location you may have rights to access, correct, delete or port your data, and to object to or restrict processing. Contact us to exercise them."],
          ["Data retention & security", "We retain personal data only as long as needed for the purposes above, and apply appropriate technical and organizational safeguards."],
        ].map(([h, b]) => (
          <div key={h}>
            <h2 className="font-sans text-xl font-medium text-paper">{h}</h2>
            <p className="mt-2">{b}</p>
          </div>
        ))}
        <div>
          <h2 className="font-sans text-xl font-medium text-paper">Contact</h2>
          <p className="mt-2">
            Questions or data requests: <a href={`mailto:${site.email}`} className="text-accent hover:underline">{site.email}</a> · {site.address}
          </p>
        </div>
      </div>
    </section>
  );
}
