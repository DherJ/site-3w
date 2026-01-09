export default function LegalSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="rounded-3xl bg-white/70 p-6 ring-1 ring-brandLine md:p-8">
        <h2 className="font-serif text-xl font-semibold tracking-tight text-brandNavy md:text-2xl">
          {title}
        </h2>
        <div className="mt-2 h-[2px] w-10 rounded-full bg-brandChampagne/70" />
        <div className="mt-4 prose prose-sm max-w-none prose-p:text-brandMuted prose-li:text-brandMuted prose-strong:text-brandNavy prose-a:text-brandNavy">
          {children}
        </div>
      </div>
    </section>
  );
}
