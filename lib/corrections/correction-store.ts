import type { CompetencyId, CorrectionResult } from "@/lib/gemini/types"
import { createClient } from "@/lib/supabase/server"

export type StoredCorrection = {
  id: string
  theme: string
  correctedAt: string
  result: CorrectionResult
}

type CorrectionRow = {
  id: string
  created_at: string
  total_score: number
  general_feedback: string
  strengths: unknown
  improvements: unknown
  competencies: Array<{
    competency_id: CompetencyId
    score: number
    feedback: string
  }>
  essays: { theme: string } | Array<{ theme: string }>
}

const SELECT_COLUMNS = `
  id,
  created_at,
  total_score,
  general_feedback,
  strengths,
  improvements,
  competencies (competency_id, score, feedback),
  essays (theme)
`

function toStoredCorrection(row: CorrectionRow): StoredCorrection {
  const essay = Array.isArray(row.essays) ? row.essays[0] : row.essays
  const competencies = row.competencies.reduce(
    (acc, item) => {
      acc[item.competency_id] = { score: item.score, feedback: item.feedback }
      return acc
    },
    {} as Record<CompetencyId, { score: number; feedback: string }>
  )

  return {
    id: row.id,
    theme: essay?.theme ?? "",
    correctedAt: row.created_at,
    result: {
      totalScore: row.total_score,
      competencies,
      strengths: Array.isArray(row.strengths) ? row.strengths : [],
      improvements: Array.isArray(row.improvements) ? row.improvements : [],
      generalFeedback: row.general_feedback,
    },
  }
}

export async function saveCorrection(
  userId: string,
  data: {
    theme: string
    text: string
    wordCount: number
    result: CorrectionResult
  }
): Promise<string> {
  const supabase = await createClient()

  const { data: essay, error: essayError } = await supabase
    .from("essays")
    .insert({
      user_id: userId,
      theme: data.theme,
      text: data.text,
      word_count: data.wordCount,
    })
    .select("id")
    .single()

  if (essayError || !essay) {
    throw new Error("Não foi possível salvar a redação.")
  }

  const { data: correction, error: correctionError } = await supabase
    .from("corrections")
    .insert({
      essay_id: essay.id,
      user_id: userId,
      total_score: data.result.totalScore,
      general_feedback: data.result.generalFeedback,
      strengths: data.result.strengths,
      improvements: data.result.improvements,
    })
    .select("id")
    .single()

  if (correctionError || !correction) {
    throw new Error("Não foi possível salvar a correção.")
  }

  const competencies = (
    Object.entries(data.result.competencies) as Array<
      [CompetencyId, { score: number; feedback: string }]
    >
  ).map(([competencyId, item]) => ({
    correction_id: correction.id,
    competency_id: competencyId,
    score: item.score,
    feedback: item.feedback,
  }))

  const { error: competenciesError } = await supabase
    .from("competencies")
    .insert(competencies)

  if (competenciesError) {
    throw new Error("Não foi possível salvar as competências.")
  }

  return correction.id
}

export async function listCorrections(
  userId: string
): Promise<StoredCorrection[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("corrections")
    .select(SELECT_COLUMNS)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error || !data) {
    return []
  }

  return (data as CorrectionRow[]).map(toStoredCorrection)
}

export async function getCorrection(
  userId: string,
  id: string
): Promise<StoredCorrection | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("corrections")
    .select(SELECT_COLUMNS)
    .eq("user_id", userId)
    .eq("id", id)
    .maybeSingle()

  if (error || !data) {
    return null
  }

  return toStoredCorrection(data as CorrectionRow)
}
