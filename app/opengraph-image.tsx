import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

export const alt = "RadioCares24: friendly help for your car's satellite radio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const filePath = path.join(process.cwd(), "public", "logo.png");
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
          background: "#fbf6ec",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={dataUrl} alt="RadioCares24" width={380} height={115} style={{ objectFit: "contain" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 76, fontWeight: 700, color: "#083f3d", lineHeight: 1.05, maxWidth: 940 }}>
            Friendly help for your car&apos;s satellite radio
          </div>
          <div style={{ fontSize: 32, color: "#3f5a58" }}>
            Activation · Signal · Missing channels · Renewals. Independent, never your provider.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
