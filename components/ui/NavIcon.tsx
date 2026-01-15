import { withBasePath } from "@/lib/withBasePath";

const toWebp = (src: string) => src.replace(/\.(png|jpe?g)$/i, ".webp");

export function NavIcon({ link }: { link: any }) {
  if ("imageSrc" in link) {
    return (
      <span className="relative h-6 w-6 shrink-0">
        <picture className="absolute inset-0 h-full w-full">
          <source
            srcSet={withBasePath(`/categories/webp/${toWebp(link.imageSrc.split("/").pop() || "")}`)}
            type="image/webp"
          />
          <img
            src={withBasePath(link.imageSrc)}
            alt=""
            className="h-full w-full object-contain scale-110 opacity-90"
            sizes="24px"
            loading="lazy"
          />
        </picture>
      </span>
    );
  }

  const Icon = link.Icon;
  return <Icon className="h-6 w-6 opacity-90" />;
}
