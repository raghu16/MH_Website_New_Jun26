import type { Metadata } from "next";
import ConsultantExperience from "@/components/ConsultantExperience";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Consultant — Scope Your Project",
  description:
    "Talk to Monkhub's AI consultant. It gathers your requirements through a guided conversation and our team prepares a scope and a same-day fixed price.",
  alternates: { canonical: `${site.url}/consultant` },
};

export default function ConsultantPage() {
  return <ConsultantExperience />;
}
