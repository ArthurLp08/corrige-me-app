import type { CorrectionResult } from "@/lib/gemini/types"

export type StoredCorrection = {
  id: string
  theme: string
  correctedAt: string
  result: CorrectionResult
}

const store = new Map<string, StoredCorrection[]>()

const MAX_CORRECTIONS_PER_USER = 50

export function saveCorrection(
  userId: string,
  data: { theme: string; result: CorrectionResult }
): string {
  const corrections = store.get(userId) ?? []

  const stored: StoredCorrection = {
    id: crypto.randomUUID(),
    theme: data.theme,
    correctedAt: new Date().toISOString(),
    result: data.result,
  }

  corrections.unshift(stored)
  store.set(userId, corrections.slice(0, MAX_CORRECTIONS_PER_USER))

  return stored.id
}

export function listCorrections(userId: string): StoredCorrection[] {
  return store.get(userId) ?? []
}

export function getCorrection(
  userId: string,
  id: string
): StoredCorrection | null {
  return (store.get(userId) ?? []).find((correction) => correction.id === id) ?? null
}
