import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

const root = join(__dirname, "..");
const targets = ["app", "lib", "components", "server", "deploy", "docs/api-contract.md", "README.md", ".env.example", "package.json"];
const textExt = /\.(ts|tsx|css|json|md|txt|cjs|conf|svg|example)$|^\.env\.example$/;

function walk(path: string, out: string[] = []) {
  const st = statSync(path);
  if (st.isDirectory()) {
    for (const name of readdirSync(path)) walk(join(path, name), out);
  } else if (textExt.test(path.split(/[\/]/).pop()!)) {
    out.push(path);
  }
  return out;
}

describe("brand hygiene", () => {
  it("has no leftover references to the sister site", () => {
    const offenders = targets
      .flatMap((t) => walk(join(root, t)))
      .filter((f) => /radiosat[s]?care|\bRSC-/i.test(readFileSync(f, "utf8")))
      .map((f) => relative(root, f));
    expect(offenders).toEqual([]);
  });
});
