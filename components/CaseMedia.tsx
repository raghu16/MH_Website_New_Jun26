import Image from "next/image";
import type { MediaItem } from "@/lib/work";

/**
 * Case-study media slot. Renders an image (next/image, lazy + responsive) or a
 * video (poster + native controls, preload="none" for performance). Falls back
 * to a generated brand visual when no media is supplied yet.
 */
export default function CaseMedia({
  item,
  accent,
  char,
  aspect = "aspect-[4/3]",
  priority = false,
}: {
  item?: MediaItem;
  accent: "magenta" | "cyan";
  char: string;
  aspect?: string;
  priority?: boolean;
}) {
  const grad = accent === "cyan" ? "from-cyan/30 via-cyan/[0.06] to-transparent" : "from-accent/30 via-accent/[0.06] to-transparent";
  const text = accent === "cyan" ? "text-cyan" : "text-accent";
  const wrap = `relative overflow-hidden rounded-2xl border border-ink-700 bg-ink-950 ${aspect}`;

  if (!item) {
    return (
      <div className={wrap}>
        <div className={`absolute inset-0 bg-gradient-to-br ${grad}`} />
        <div className="absolute inset-0 blueprint-dense opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-serif text-[40vw] leading-none opacity-[0.1] md:text-[12rem] ${text}`}>{char}</span>
        </div>
      </div>
    );
  }

  if (item.type === "video") {
    return (
      <figure className={wrap}>
        <video
          src={item.src}
          poster={item.poster}
          controls
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {item.caption && (
          <figcaption className="absolute bottom-3 left-3 rounded-full bg-ink-950/80 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted backdrop-blur">{item.caption}</figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure className={wrap}>
      <Image
        src={item.src}
        alt={item.alt ?? ""}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
      {item.caption && (
        <figcaption className="absolute bottom-3 left-3 rounded-full bg-ink-950/80 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted backdrop-blur">{item.caption}</figcaption>
      )}
    </figure>
  );
}
