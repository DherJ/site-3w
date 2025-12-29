import Link from "next/link";

export default function SecondaryButton({
    href,
    children,
    className = "",
}: {
    href: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <Link
            href={href}
            className={[
                "inline-flex items-center gap-2 rounded-full",
                "bg-white/80 px-7 py-3 text-sm font-extrabold text-brandNavy",
                "ring-1 ring-brandLine backdrop-blur",
                "transition hover:bg-white hover:-translate-y-0.5",
                "whitespace-nowrap",
                className,
            ].join(" ")}
        >
            {children}
        </Link>
    );
}
