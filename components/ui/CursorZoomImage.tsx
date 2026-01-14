"use client";

import { withBasePath } from "@/lib/withBasePath";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";

type CursorZoomImageProps = {
  src: string;
  alt: string;
  sizes?: string;
  zoom?: number; // ex: 1.8
  className?: string;
  priority?: boolean;
};

export default function CursorZoomImage({
  src,
  alt,
  sizes,
  zoom = 1.8,
  className = "",
  priority = false,
}: CursorZoomImageProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [hover, setHover] = useState(false);
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 }); // 0..1

  const onMove = (e: React.MouseEvent) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;

    // clamp
    const cx = Math.max(0, Math.min(1, x));
    const cy = Math.max(0, Math.min(1, y));
    setPos({ x: cx, y: cy });
  };

  const transform = useMemo(() => {
    // translation max = (zoom - 1) * 50% (car on centre)
    // on mappe pos 0..1 -> -1..1
    const dx = (pos.x - 0.5) * 2; // -1..1
    const dy = (pos.y - 0.5) * 2; // -1..1

    // plus zoom est grand, plus on peut “pan” pour rester dans le cadre
    const max = (zoom - 1) * 50;

    const tx = -dx * max;
    const ty = -dy * max;

    return `translate(${tx}%, ${ty}%) scale(${hover ? zoom : 1})`;
  }, [pos.x, pos.y, hover, zoom]);

  return (
    <div
      ref={wrapRef}
      className={[
        "relative h-full w-full overflow-hidden",
        "cursor-zoom-in select-none",
        className,
      ].join(" ")}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setPos({ x: 0.5, y: 0.5 });
      }}
      onMouseMove={onMove}
    >
      <div
        className="absolute inset-0 will-change-transform transition-transform duration-150 ease-out"
        style={{ transform }}
      >
        <Image
          src={withBasePath(src)}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
          draggable={false}
          unoptimized
        />
      </div>

      {/* voile léger au hover (optionnel) */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 ease-out hover:opacity-100 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

      {/* liseré */}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5" />
    </div>
  );
}
