import Link from "next/link";
import { cn } from "@/lib/utils";

export default function PrimaryButton({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3",
        "bg-brandChampagne text-brandNavy",              // ✅ important
        "text-sm font-extrabold shadow-soft",
        "transition hover:opacity-90 hover:-translate-y-0.5",
        "whitespace-nowrap",
        className
      )}
    >
      {children}
    </Link>
  );
}
