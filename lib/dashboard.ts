import { getUsage } from "@/lib/usage/usage-store"
import { listCorrections } from "@/lib/corrections/correction-store"
import { formatDate } from "@/lib/format"

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

export type DashboardData = {
  usage: DashboardUsage
  lastScore: number | null
  averageScore: number | null
  bestScore: number | null
  evolution: number | null
  essays: RecentEssay[]
}

export async function getDashboardData(userId: string): Promise<DashboardData> {
  const corrections = listCorrections(userId)

  return {
    usage: getUsage(userId),
    lastScore: null,
    averageScore: null,
    bestScore: null,
    evolution: null,
    essays: corrections.slice(0, 3).map((correction) => ({
      id: correction.id,
      theme: correction.theme,
      score: correction.result.totalScore,
      correctedAt: formatDate(correction.correctedAt),
    })),
  }
}
