import { withBasePath } from "@/lib/withBasePath";
import Image from "next/image";

export function NavIcon({ link }: { link: any }) {
  if ("imageSrc" in link) {
    return (
      <span className="relative h-6 w-6 shrink-0">
        <Image
          src={withBasePath(link.imageSrc)}
          alt=""
          fill
          className="object-contain scale-110 opacity-90"
          sizes="24px"
          unoptimized
        />
      </span>
    );
  }

  const Icon = link.Icon;
  return <Icon className="h-6 w-6 opacity-90" />;
}
