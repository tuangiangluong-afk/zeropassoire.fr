import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Une question sur le simulateur, les barèmes, ou le site ? Écrivez-nous.",
  alternates: { canonical: "https://zeropassoire.fr/contact" },
};

export default function ContactPage() {
  return (
    <section className="py-20 bg-stone-50 min-h-[70vh]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h1 className="font-display text-4xl font-bold text-stone-900 mb-3">Contact</h1>
        <p className="text-stone-600 mb-8">
          On r&eacute;pond en 48h ouvr&eacute;es. Pas de t&eacute;l&eacute;phone, uniquement par &eacute;crit,
          pour garder une trace.
        </p>
        <ContactForm />
      </div>
    </section>
  );
}
