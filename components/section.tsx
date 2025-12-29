export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 md:py-28">
      <h2 className="text-2xl font-bold text-brand-text">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}
