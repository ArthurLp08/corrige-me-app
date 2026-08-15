"use server"

import { correctEssay } from "@/lib/gemini/correction"
import type { CorrectionResult } from "@/lib/gemini/types"
import { ESSAY_MAX_WORDS, ESSAY_MIN_WORDS, countWords } from "@/lib/essays/validation"
import { createClient } from "@/lib/supabase/server"
import { consumeCorrection, getUsage } from "@/lib/usage/usage-store"
import { saveCorrection } from "@/lib/corrections/correction-store"

export type SubmitState = {
  error?: string
  success?: string
  correction?: CorrectionResult
  correctionId?: string
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

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Sua sessão expirou. Faça login novamente." }
  }

  const usage = await getUsage(user.id)
  if (usage.used >= usage.limit) {
    return {
      error: `Você usou todas as ${usage.limit} correções deste mês. Seu limite renova em ${usage.resetsAt}.`,
    }
  }

  const result = await correctEssay(theme, text)
  if (!result.ok) {
    return { error: result.error }
  }

  await consumeCorrection(user.id)

  const correctionId = await saveCorrection(user.id, {
    theme,
    text,
    wordCount,
    result: result.data,
  })

  return {
    success: "Sua redação foi corrigida com sucesso.",
    correction: result.data,
    correctionId,
  }
}
