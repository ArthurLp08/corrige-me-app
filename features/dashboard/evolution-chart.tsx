"use client"

import type { ScorePoint } from "@/lib/dashboard"

const WIDTH = 640
const HEIGHT = 220
const PAD_X = 18
const PAD_TOP = 24
const PAD_BOTTOM = 28

type EvolutionChartProps = {
  points: ScorePoint[]
}

export function EvolutionChart({ points }: EvolutionChartProps) {
  if (points.length === 0) return null

  const values = points.map((point) => point.score)
  const rawMin = Math.min(...values)
  const rawMax = Math.max(...values)
  const range = Math.max(rawMax - rawMin, 100)
  const minScore = Math.max(0, Math.floor((rawMin - range * 0.12) / 10) * 10)
  const maxScore = Math.min(1000, Math.ceil((rawMax + range * 0.12) / 10) * 10)
  const span = Math.max(maxScore - minScore, 1)

  const plotWidth = WIDTH - PAD_X * 2
  const plotHeight = HEIGHT - PAD_TOP - PAD_BOTTOM

  const x = (index: number) =>
    points.length === 1
      ? PAD_X + plotWidth / 2
      : PAD_X + (index / (points.length - 1)) * plotWidth
  const y = (score: number) => PAD_TOP + (1 - (score - minScore) / span) * plotHeight

  const linePoints = points
    .map((point, index) => `${x(index)},${y(point.score)}`)
    .join(" ")

  const showValueLabels = points.length <= 8
  const first = points[0]
  const last = points[points.length - 1]

  const ariaLabel = `Gráfico de evolução da nota: ${points
    .map((point) => `${point.label} ${point.score}`)
    .join(", ")}`

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="h-auto w-full"
      role="img"
      aria-label={ariaLabel}
    >
      <line
        x1={PAD_X}
        x2={WIDTH - PAD_X}
        y1={y(maxScore)}
        y2={y(maxScore)}
        className="stroke-border"
        strokeDasharray="4 4"
      />
      <line
        x1={PAD_X}
        x2={WIDTH - PAD_X}
        y1={y(minScore)}
        y2={y(minScore)}
        className="stroke-border"
        strokeDasharray="4 4"
      />

      <text
        x={PAD_X}
        y={y(maxScore) - 6}
        className="fill-muted-foreground text-[11px]"
      >
        {maxScore}
      </text>
      <text
        x={PAD_X}
        y={y(minScore) - 6}
        className="fill-muted-foreground text-[11px]"
      >
        {minScore}
      </text>

      <polyline
        points={linePoints}
        fill="none"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-primary"
      />

      {points.map((point, index) => (
        <g key={point.id}>
          <circle
            cx={x(index)}
            cy={y(point.score)}
            r={4}
            strokeWidth={2}
            className="fill-background stroke-primary"
          />
          {showValueLabels && (
            <text
              x={x(index)}
              y={y(point.score) - 10}
              textAnchor="middle"
              className="fill-muted-foreground text-[11px]"
            >
              {point.score}
            </text>
          )}
          <title>{`${point.label}: ${point.score}`}</title>
        </g>
      ))}

      {points.length > 1 && (
        <>
          <text
            x={PAD_X}
            y={HEIGHT - 8}
            textAnchor="middle"
            className="fill-muted-foreground text-[11px]"
          >
            {first.label}
          </text>
          <text
            x={WIDTH - PAD_X}
            y={HEIGHT - 8}
            textAnchor="middle"
            className="fill-muted-foreground text-[11px]"
          >
            {last.label}
          </text>
        </>
      )}
    </svg>
  )
}
