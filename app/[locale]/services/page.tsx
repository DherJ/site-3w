import { Section } from "@/components/section";
import Link from "next/link";

export default function ServiceDetail({ params }: { params: { slug: string } }) {
  const { slug } = params;
  return (
    <Section title={`Service : ${slug}`}>
      <p className="text-brand-muted">
        Template de page services. Ajoute ici : description, étapes, FAQ, CTA devis.
      </p>
      <div className="mt-6">
        <Link className="inline-flex rounded-2xl bg-brand-teal px-5 py-3 font-semibold text-white shadow-soft hover:opacity-95" href="../quote">
          Demander un devis
        </Link>
      </div>
    </Section>
  );
}
