import type { DashboardUsage } from "@/lib/dashboard"
import { createClient } from "@/lib/supabase/server"

export const MONTHLY_CORRECTION_LIMIT = 5

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

export async function getUsage(userId: string): Promise<DashboardUsage> {
  const month = currentMonthKey()
  const supabase = await createClient()
  const { data } = await supabase
    .from("monthly_usage")
    .select("used")
    .eq("user_id", userId)
    .eq("month", month)
    .maybeSingle()

  return {
    used: data?.used ?? 0,
    limit: MONTHLY_CORRECTION_LIMIT,
    resetsAt: nextMonthLabel(),
  }
}

export async function consumeCorrection(userId: string): Promise<void> {
  const month = currentMonthKey()
  const supabase = await createClient()
  const { data } = await supabase
    .from("monthly_usage")
    .select("used")
    .eq("user_id", userId)
    .eq("month", month)
    .maybeSingle()

  if (data) {
    await supabase
      .from("monthly_usage")
      .update({ used: data.used + 1 })
      .eq("user_id", userId)
      .eq("month", month)
    return
  }

  await supabase
    .from("monthly_usage")
    .insert({ user_id: userId, month, used: 1 })
}
