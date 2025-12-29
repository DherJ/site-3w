import SignatureLine from "./SignatureLine";

export default function SectionTitle({
  kicker,
  title,
  subtitle,
  align = "center",
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  const isLeft = align === "left";

  return (
    <div className={isLeft ? "text-left" : "text-center"}>
      {kicker ? (
        <div className={isLeft ? "" : "flex justify-center"}>
          <div className={["inline-flex flex-col", isLeft ? "items-start" : "items-center"].join(" ")}>
            <div className="text-xs font-bold tracking-[0.2em] text-brandNavy/70">
              {kicker}
            </div>

            {/* ✅ Ligne signature (toujours visible, même largeur partout) */}
            <SignatureLine align={isLeft ? "left" : "center"} className="mt-2" />
          </div>
        </div>
      ) : null}

      <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-brandNavy md:text-4xl">
        {title}
      </h2>

      {subtitle ? (
        <p className={["mt-4 max-w-2xl text-base text-brandMuted md:text-lg", isLeft ? "" : "mx-auto"].join(" ")}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
