import Image from "next/image";
import { findPhoto, photoSlots, type PhotoSlot } from "@/lib/images";

type PhotoProps = {
  slot: PhotoSlot;
  /** Overrides the slot's default alt text. Pass "" for a purely decorative image. */
  alt?: string;
  /** Extra classes for the wrapper (spacing, visibility, rounding). */
  className?: string;
  /**
   * "slot" (default): the wrapper takes the slot's aspect ratio and the parent's width.
   * "parent": the parent sizes the wrapper (use with `absolute inset-0` or `h-full w-full`).
   */
  sizing?: "slot" | "parent";
  /** Preload the image (use for the hero only). */
  preload?: boolean;
  sizes?: string;
};

/** A real photo in a named slot; a plain navy panel until the file exists. */
export function Photo({
  slot,
  alt,
  className = "",
  sizing = "slot",
  preload = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: PhotoProps) {
  const src = findPhoto(slot);
  const byRatio = sizing === "slot";
  const wrapperClass = `relative overflow-hidden bg-navy-900 ${byRatio ? "w-full" : ""} ${className}`;
  const style = byRatio ? { aspectRatio: photoSlots[slot].ratio } : undefined;

  if (!src) {
    return <div aria-hidden="true" className={wrapperClass} style={style} />;
  }
  return (
    <div className={wrapperClass} style={style}>
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
