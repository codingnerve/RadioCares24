import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

export const alt = "RadioCares24: independent help for your car's satellite radio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const filePath = path.join(process.cwd(), "public", "logo-light.png");
  const base64 = fs.readFileSync(filePath).toString("base64");
  const dataUrl = `data:image/png;base64,${base64}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b2a55",
          borderBottom: "14px solid #f26a0c",
          padding: "72px 72px 58px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={dataUrl} alt="RadioCares24" width={380} height={115} style={{ objectFit: "contain" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 72, fontWeight: 700, color: "#ffffff", lineHeight: 1.08, maxWidth: 940 }}>
            Independent help for your car&apos;s satellite radio
          </div>
          <div style={{ fontSize: 30, color: "#dbe5f3" }}>
            Activation · Signal · Missing channels · Renewals
          </div>
        </div>
      </div>
    ),
    size,
  );
}
