import type { DashboardUsage } from "@/lib/dashboard"

export const MONTHLY_CORRECTION_LIMIT = 5

type UsageRecord = {
  month: string
  used: number
}

const store = new Map<string, UsageRecord>()

function currentMonthKey(): string {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
}

function nextMonthLabel(): string {
  const now = new Date()
  const next = new Date(now.getFullYear(), now.getMonth() + 1, 1)
  return next.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  })
}

export function getUsage(userId: string): DashboardUsage {
  const month = currentMonthKey()
  const record = store.get(userId)
  const used = record && record.month === month ? record.used : 0

  return {
    used,
    limit: MONTHLY_CORRECTION_LIMIT,
    resetsAt: nextMonthLabel(),
  }
}

export function consumeCorrection(userId: string): boolean {
  const month = currentMonthKey()
  const record = store.get(userId)

  if (!record || record.month !== month) {
    store.set(userId, { month, used: 1 })
    return true
  }

  if (record.used >= MONTHLY_CORRECTION_LIMIT) {
    return false
  }

  record.used += 1
  return true
}
