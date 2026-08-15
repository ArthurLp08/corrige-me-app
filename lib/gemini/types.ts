export type CompetencyId = "c1" | "c2" | "c3" | "c4" | "c5"

export type CompetencyScore = {
  score: number
  feedback: string
}

export type Improvement = {
  problem: string
  explanation: string
  example: string
}

export type CorrectionResult = {
  totalScore: number
  competencies: Record<CompetencyId, CompetencyScore>
  strengths: string[]
  improvements: Improvement[]
  generalFeedback: string
}
