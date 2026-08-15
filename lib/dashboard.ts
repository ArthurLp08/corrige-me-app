import { getUsage } from "@/lib/usage/usage-store"
import { listCorrections } from "@/lib/corrections/correction-store"
import { formatDate, formatShortDate } from "@/lib/format"
import type { CompetencyId } from "@/lib/gemini/types"

export type DashboardUsage = {
  used: number
  limit: number
  resetsAt: string
}

export type RecentEssay = {
  id: string
  theme: string
  score: number | null
  correctedAt: string
}

export type ScorePoint = {
  id: string
  label: string
  score: number
}

export type CompetencyEvolution = {
  id: CompetencyId
  first: number
  last: number
  delta: number
}

export type DashboardData = {
  usage: DashboardUsage
  lastScore: number | null
  averageScore: number | null
  bestScore: number | null
  evolution: number | null
  evolutionPoints: ScorePoint[]
  competencyEvolution: CompetencyEvolution[] | null
  essays: RecentEssay[]
}

const COMPETENCY_IDS: CompetencyId[] = ["c1", "c2", "c3", "c4", "c5"]

export async function getDashboardData(userId: string): Promise<DashboardData> {
  const [corrections, usage] = await Promise.all([
    listCorrections(userId),
    getUsage(userId),
  ])
  const scores = corrections.map((correction) => correction.result.totalScore)

  const averageScore =
    scores.length > 0
      ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
      : null
  const bestScore = scores.length > 0 ? Math.max(...scores) : null
  const lastScore = scores[0] ?? null
  const evolution =
    scores.length >= 2 ? scores[0] - scores[scores.length - 1] : null

  const evolutionPoints: ScorePoint[] = corrections
    .slice()
    .reverse()
    .map((correction) => ({
      id: correction.id,
      label: formatShortDate(correction.correctedAt),
      score: correction.result.totalScore,
    }))

  const competencyEvolution: CompetencyEvolution[] | null =
    corrections.length >= 2
      ? COMPETENCY_IDS.map((id) => {
          const first =
            corrections[corrections.length - 1].result.competencies[id].score
          const last = corrections[0].result.competencies[id].score
          return { id, first, last, delta: last - first }
        })
      : null

  return {
    usage,
    lastScore,
    averageScore,
    bestScore,
    evolution,
    evolutionPoints,
    competencyEvolution,
    essays: corrections.slice(0, 3).map((correction) => ({
      id: correction.id,
      theme: correction.theme,
      score: correction.result.totalScore,
      correctedAt: formatDate(correction.correctedAt),
    })),
  }
}
