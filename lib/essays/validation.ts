export const ESSAY_MIN_WORDS = 180
export const ESSAY_MAX_WORDS = 1000

export function countWords(text: string): number {
  const trimmed = text.trim()
  if (!trimmed) return 0
  return trimmed.split(/\s+/).length
}

export type EssayValidationResult = {
  isValid: boolean
  wordCount: number
  message?: string
}

export function validateEssay(theme: string, text: string): EssayValidationResult {
  const wordCount = countWords(text)

  if (!theme.trim()) {
    return { isValid: false, wordCount, message: "Informe o tema da redação." }
  }

  if (wordCount < ESSAY_MIN_WORDS) {
    return {
      isValid: false,
      wordCount,
      message: `Sua redação precisa ter pelo menos ${ESSAY_MIN_WORDS} palavras (atualmente ${wordCount}).`,
    }
  }

  if (wordCount > ESSAY_MAX_WORDS) {
    return {
      isValid: false,
      wordCount,
      message: `Sua redação pode ter no máximo ${ESSAY_MAX_WORDS} palavras (atualmente ${wordCount}).`,
    }
  }

  return { isValid: true, wordCount }
}
