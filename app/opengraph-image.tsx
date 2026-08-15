import { ImageResponse } from "next/og"

export const alt = "Corrige-Me — Correção de redações do ENEM"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

type FontData = {
  name: string
  data: ArrayBuffer
  weight: 400 | 600 | 700
  style: "normal"
}

async function loadFont(weight: 400 | 600 | 700): Promise<FontData | undefined> {
  try {
    const url = `https://cdn.jsdelivr.net/fontsource/fonts/geist-sans@latest/latin-${weight}-normal.ttf`
    const data = await fetch(url).then((res) => res.arrayBuffer())
    return { name: "Geist", data, weight, style: "normal" }
  } catch {
    return undefined
  }
}

const BRAND_BLUE = "#93c8ff"
const BACKGROUND = "#111318"
const FOREGROUND = "#ffffff"
const MUTED = "#cbd5e1"
const FAINT = "#94a3b8"
const TRACK = "#2a2e38"

export default async function OpengraphImage() {
  const fonts = (
    await Promise.all([loadFont(400), loadFont(600), loadFont(700)])
  ).filter((font): font is FontData => Boolean(font))

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background: BACKGROUND,
          color: FOREGROUND,
          fontFamily: "Geist, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          <div
            style={{
              width: "96px",
              height: "96px",
              borderRadius: "24px",
              background: BRAND_BLUE,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke={BACKGROUND}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
          </div>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            Corrige-Me
          </div>
        </div>

        <div style={{ marginTop: "40px", fontSize: "34px", fontWeight: 600, color: BRAND_BLUE }}>
          Correção de redações do ENEM com inteligência artificial
        </div>

        <div style={{ marginTop: "20px", fontSize: "28px", color: MUTED, lineHeight: 1.5 }}>
          Nota estimada, feedback detalhado por competência e exemplos práticos para evoluir.
        </div>

        <div style={{ marginTop: "56px", display: "flex", gap: "14px" }}>
          {["C1", "C2", "C3", "C4", "C5"].map((competency, index) => (
            <div
              key={competency}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}
            >
              <div
                style={{
                  width: "96px",
                  height: "10px",
                  borderRadius: "999px",
                  background: index < 4 ? BRAND_BLUE : TRACK,
                }}
              />
              <div style={{ fontSize: "18px", color: FAINT }}>{competency}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    }
  )
}
