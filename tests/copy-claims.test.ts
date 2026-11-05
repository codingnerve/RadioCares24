import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import { contactMethods } from "@/lib/enquiry-schema";

const root = join(__dirname, "..");

function walk(path: string, out: string[] = []) {
  if (statSync(path).isDirectory()) {
    for (const name of readdirSync(path)) walk(join(path, name), out);
  } else if (/\.(ts|tsx)$/.test(path)) out.push(path);
  return out;
}

describe("copy matches what the form really offers", () => {
  it("never promises a choice of reply method unless the form offers one", () => {
    const offersEmail = contactMethods.some((m) => (m.value as string) === "email");
    if (offersEmail) return;
    const claim =
      /phone or email|pick how we reply|reply (by|using|the (way|method))|(the|by the) (way|method) you (choose|chose|picked|prefer|asked)|you prefer|whichever you picked/i;
    const offenders = ["app", "components", "lib/content.ts"]
      .flatMap((t) => walk(join(root, t)))
      .filter((f) => claim.test(readFileSync(f, "utf8")))
      .map((f) => relative(root, f));
    expect(offenders).toEqual([]);
  });
});
