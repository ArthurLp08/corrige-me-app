import type {
  CompetencyId,
  CorrectionResult,
  Improvement,
} from "@/lib/gemini/types"

const API_KEY = process.env.GEMINI_API_KEY
const MODEL = process.env.GEMINI_MODEL ?? "gemini-3.5-flash"

export type CorrectResult =
  | { ok: true; data: CorrectionResult }
  | { ok: false; error: string }

const COMPETENCY_SCHEMA = {
  type: "OBJECT",
  properties: {
    score: { type: "INTEGER", description: "Nota da competência, de 0 a 200." },
    feedback: {
      type: "STRING",
      description: "Feedback específico sobre o desempenho nessa competência.",
    },
  },
  required: ["score", "feedback"],
} as const

const CORRECTION_SCHEMA = {
  type: "OBJECT",
  properties: {
    totalScore: { type: "INTEGER", description: "Nota final da redação, de 0 a 1000." },
    competencies: {
      type: "OBJECT",
      description: "Notas das cinco competências.",
      properties: {
        c1: COMPETENCY_SCHEMA,
        c2: COMPETENCY_SCHEMA,
        c3: COMPETENCY_SCHEMA,
        c4: COMPETENCY_SCHEMA,
        c5: COMPETENCY_SCHEMA,
      },
      required: ["c1", "c2", "c3", "c4", "c5"],
    },
    strengths: {
      type: "ARRAY",
      description: "Pontos fortes da redação.",
      items: { type: "STRING" },
    },
    improvements: {
      type: "ARRAY",
      description: "Pontos de melhoria da redação.",
      items: {
        type: "OBJECT",
        properties: {
          problem: { type: "STRING", description: "Problema identificado." },
          explanation: {
            type: "STRING",
            description: "Explicação do porquê do problema e de como afeta a nota.",
          },
          example: {
            type: "STRING",
            description: "Exemplo prático de como corrigir o problema.",
          },
        },
        required: ["problem", "explanation", "example"],
      },
    },
    generalFeedback: {
      type: "STRING",
      description: "Feedback geral sobre a redação.",
    },
  },
  required: [
    "totalScore",
    "competencies",
    "strengths",
    "improvements",
    "generalFeedback",
  ],
} as const

function buildPrompt(theme: string, text: string): string {
  return `Você é um corretor experiente e rigoroso de redações do ENEM.

Avalie a redação abaixo seguindo as regras oficiais do ENEM e seja específico, citando trechos da redação sempre que possível. Não seja genérico nem apenas repita o texto do estudante.

Tema da redação:
${theme}

Redação:
${text}

Critérios de avaliação por competência (cada uma vale de 0 a 200):
- c1: domínio da escrita formal da língua portuguesa (ortografia, concordância, pontuação, registro).
- c2: compreensão do tema e organização coerente dos argumentos.
- c3: seleção, relação e uso de repertório sociocultural produtivo.
- c4: domínio dos mecanismos linguísticos de coesão e coerência.
- c5: elaboração de proposta de intervenção que respeite os direitos humanos.

Regras:
- A nota final é a soma das cinco competências, de 0 a 1000.
- Atribua notas consistentes com os problemas e pontos fortes citados no feedback.
- Em "strengths", liste os pontos fortes reais.
- Em "improvements", para cada problema aponte a explicação do impacto e um exemplo prático de melhoria.
- Em "generalFeedback", escreva um parágrafo que resuma o desempenho e aponte o próximo passo de evolução.

Responda SOMENTE com um JSON válido que siga exatamente o schema definido.`
}

function isString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0
}

function parseScore(value: unknown, max: number): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null
  const rounded = Math.round(value)
  if (rounded < 0 || rounded > max) return null
  return rounded
}

function parseImprovements(value: unknown): Improvement[] | null {
  if (!Array.isArray(value)) return null

  const improvements: Improvement[] = []
  for (const item of value) {
    if (typeof item !== "object" || item === null) return null
    const { problem, explanation, example } = item as Record<string, unknown>
    if (!isString(problem) || !isString(explanation) || !isString(example)) {
      return null
    }
    improvements.push({ problem, explanation, example })
  }
  return improvements
}

function parseCorrection(raw: unknown): CorrectionResult | null {
  if (typeof raw !== "object" || raw === null) return null
  const { totalScore, competencies, strengths, improvements, generalFeedback } =
    raw as Record<string, unknown>

  const finalScore = parseScore(totalScore, 1000)
  if (finalScore === null) return null

  if (typeof competencies !== "object" || competencies === null) return null
  const comps = competencies as Record<string, unknown>
  const parsedCompetencies = {} as CorrectionResult["competencies"]

  const ids: CompetencyId[] = ["c1", "c2", "c3", "c4", "c5"]
  for (const id of ids) {
    const comp = comps[id]
    if (typeof comp !== "object" || comp === null) return null
    const { score, feedback } = comp as Record<string, unknown>
    const parsed = parseScore(score, 200)
    if (parsed === null || !isString(feedback)) return null
    parsedCompetencies[id] = { score: parsed, feedback }
  }

  if (!Array.isArray(strengths) || !strengths.every(isString)) return null

  const parsedImprovements = parseImprovements(improvements)
  if (parsedImprovements === null) return null

  if (!isString(generalFeedback)) return null

  return {
    totalScore: finalScore,
    competencies: parsedCompetencies,
    strengths,
    improvements: parsedImprovements,
    generalFeedback,
  }
}

function extractErrorMessage(payload: unknown): string {
  const error =
    payload &&
    typeof payload === "object" &&
    "error" in payload &&
    payload.error &&
    typeof payload.error === "object" &&
    "message" in payload.error &&
    typeof payload.error.message === "string"
      ? payload.error.message
      : null

  return error ? `O serviço de correção retornou um erro (${error}).` : "O serviço de correção retornou um erro. Tente novamente."
}

export async function correctEssay(
  theme: string,
  text: string
): Promise<CorrectResult> {
  if (!API_KEY) {
    return { ok: false, error: "A correção ainda não foi configurada no servidor." }
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`

  let response: Response
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": API_KEY,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: buildPrompt(theme, text) }] }],
        generationConfig: {
          temperature: 0.5,
          maxOutputTokens: 4096,
          responseMimeType: "application/json",
          responseSchema: CORRECTION_SCHEMA,
        },
      }),
      signal: AbortSignal.timeout(90_000),
    })
  } catch {
    return { ok: false, error: "Não foi possível falar com o serviço de correção. Tente novamente." }
  }

  const payload: unknown = await response.json().catch(() => null)

  if (!response.ok) {
    return { ok: false, error: extractErrorMessage(payload) }
  }

  const candidates =
    payload && typeof payload === "object" && "candidates" in payload
      ? payload.candidates
      : undefined
  const first = Array.isArray(candidates) ? candidates[0] : undefined
  const content =
    first && typeof first === "object" && "content" in first ? first.content : undefined
  const parts =
    content && typeof content === "object" && "parts" in content ? content.parts : undefined
  const part = Array.isArray(parts) ? parts[0] : undefined
  const rawText =
    part && typeof part === "object" && "text" in part && typeof part.text === "string"
      ? part.text
      : null

  if (!rawText || !rawText.trim()) {
    return { ok: false, error: "O Gemini não retornou uma resposta válida." }
  }

  let parsed: unknown
  try {
    parsed = JSON.parse(rawText)
  } catch {
    return { ok: false, error: "A resposta do Gemini não pôde ser interpretada. Tente novamente." }
  }

  const correction = parseCorrection(parsed)
  if (correction === null) {
    return { ok: false, error: "A resposta do Gemini não seguiu o formato esperado. Tente novamente." }
  }

  return { ok: true, data: correction }
}
