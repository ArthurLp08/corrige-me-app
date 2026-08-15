"use server"

import { ESSAY_MAX_WORDS, ESSAY_MIN_WORDS, countWords } from "@/lib/essays/validation"

export type SubmitState = {
  error?: string
  success?: string
}

export async function submitEssay(
  _prevState: SubmitState,
  formData: FormData
): Promise<SubmitState> {
  const theme = String(formData.get("theme") ?? "").trim()
  const text = String(formData.get("text") ?? "").trim()

  if (!theme) {
    return { error: "Informe o tema da redação." }
  }

  const wordCount = countWords(text)
  if (wordCount < ESSAY_MIN_WORDS) {
    return {
      error: `Sua redação precisa ter pelo menos ${ESSAY_MIN_WORDS} palavras (atualmente ${wordCount}).`,
    }
  }

  if (wordCount > ESSAY_MAX_WORDS) {
    return {
      error: `Sua redação pode ter no máximo ${ESSAY_MAX_WORDS} palavras (atualmente ${wordCount}).`,
    }
  }

  return { success: "Sua redação foi enviada para o fluxo de correção." }
}
