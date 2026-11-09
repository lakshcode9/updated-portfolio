import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

const fontFile = (pkg: string, file: string) => path.join(process.cwd(), "node_modules", "@fontsource", pkg, "files", file);

async function dataUrl(publicPath: string) {
  const buf = await fs.readFile(path.join(process.cwd(), "public", publicPath));
  return `data:image/png;base64,${buf.toString("base64")}`;
}

/** Brand share card: kicker, headline with one underlined word, and a cover or avatar on the right. */
export async function brandCard({
  kicker,
  headline,
  image,
  imageKind,
}: {
  kicker: string;
  headline: string;
  image: string;
  imageKind: "cover" | "avatar";
}) {
  const [bold, mono, img] = await Promise.all([
    fs.readFile(fontFile("space-grotesk", "space-grotesk-latin-700-normal.woff")),
    fs.readFile(fontFile("ibm-plex-mono", "ibm-plex-mono-latin-500-normal.woff")),
    dataUrl(image),
  ]);

  const words = headline.split(/(\*[^*]+\*)/g).filter(Boolean);

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#F4F1E9", color: "#17191E" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, padding: "64px 0 56px 72px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontFamily: "Mono", fontSize: 26, letterSpacing: 4, textTransform: "uppercase" }}>
            <div style={{ width: 14, height: 14, background: "#FF5A3D" }} />
            {kicker}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", fontFamily: "Display", fontSize: 76, lineHeight: 1.05, letterSpacing: -2, paddingRight: 40 }}>
            {words.map((w, i) =>
              w.startsWith("*") ? (
                <span key={i} style={{ borderBottom: "9px solid #FF5A3D", paddingBottom: 2, marginRight: 18 }}>
                  {w.slice(1, -1)}
                </span>
              ) : (
                w
                  .trim()
                  .split(/\s+/)
                  .filter(Boolean)
                  .map((t, j) => (
                    <span key={`${i}-${j}`} style={{ marginRight: 18 }}>
                      {t}
                    </span>
                  ))
              ),
            )}
          </div>
          <div style={{ display: "flex", fontFamily: "Mono", fontSize: 24, color: "#555B64", letterSpacing: 2 }}>
            LAKSH | AI EXPLAINED
          </div>
        </div>
        {imageKind === "cover" ? (
          <div style={{ display: "flex", alignItems: "center", padding: "40px 64px 40px 0" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img} width={309} height={550} style={{ borderRadius: 12, border: "2px solid rgba(23,25,30,0.12)" }} alt="" />
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img} width={460} height={460} alt="" />
          </div>
        )}
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Display", data: bold, weight: 700, style: "normal" },
        { name: "Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
