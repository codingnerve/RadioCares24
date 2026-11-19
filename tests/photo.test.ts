import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Photo } from "@/components/Photo";

const classOf = (html: string) => html.match(/class="([^"]*)"/)?.[1].split(/\s+/) ?? [];

describe("Photo", () => {
  it("renders a navy fallback panel with the slot's aspect ratio by default", () => {
    const html = renderToStaticMarkup(createElement(Photo, { slot: "service-signal" }));
    expect(html).toContain("aspect-ratio:4/3");
    expect(classOf(html)).toContain("bg-navy-900");
  });

  it("in parent sizing mode never adds `relative`, so an `absolute inset-0` wrapper keeps its size", () => {
    const html = renderToStaticMarkup(
      createElement(Photo, { slot: "hero", sizing: "parent", className: "absolute inset-0 -z-10" }),
    );
    const classes = classOf(html);
    expect(classes).toContain("absolute");
    expect(classes).not.toContain("relative");
    expect(html).not.toContain("aspect-ratio");
  });
});
