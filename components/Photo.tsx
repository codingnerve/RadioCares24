import Image from "next/image";
import { findPhoto, photoSlots, type PhotoSlot } from "@/lib/images";

type PhotoProps = {
  slot: PhotoSlot;
  /** Overrides the slot's default alt text. Pass "" for a purely decorative image. */
  alt?: string;
  /** Replaces the default aspect-ratio sizing, e.g. "absolute inset-0" or "h-full w-full". */
  className?: string;
  /** Preload the image (use for the hero only). */
  preload?: boolean;
  sizes?: string;
};

/** A real photo in a named slot; a plain navy panel until the file exists. */
export function Photo({ slot, alt, className, preload = false, sizes = "(min-width: 1024px) 50vw, 100vw" }: PhotoProps) {
  const src = findPhoto(slot);
  const sizing = className ?? "w-full";
  const style = className ? undefined : { aspectRatio: photoSlots[slot].ratio };

  if (!src) {
    return <div aria-hidden="true" className={`relative overflow-hidden bg-navy-900 ${sizing}`} style={style} />;
  }
  return (
    <div className={`relative overflow-hidden bg-navy-900 ${sizing}`} style={style}>
      <Image
        src={src}
        alt={alt ?? photoSlots[slot].defaultAlt}
        fill
        sizes={sizes}
        preload={preload}
        className="object-cover"
      />
    </div>
  );
}
