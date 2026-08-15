"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"

export type AuthState = {
  error?: string
  success?: string
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

function getAuthErrorMessage(message: string): string {
  const lower = message.toLowerCase()
  if (lower.includes("invalid login credentials")) {
    return "Email ou senha incorretos."
  }
  if (lower.includes("email not confirmed")) {
    return "Confirme seu email antes de entrar."
  }
  if (lower.includes("already registered")) {
    return "Já existe uma conta com esse email."
  }
  if (lower.includes("rate limit") || lower.includes("security purposes")) {
    return "Muitas tentativas. Aguarde alguns minutos e tente novamente."
  }
  return message
}

function validateEmail(email: string): string | null {
  if (!email.trim()) {
    return "Informe seu email."
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return "Informe um email válido."
  }
  return null
}

function validateLoginPassword(password: string): string | null {
  if (!password) {
    return "Informe sua senha."
  }
  return null
}

function validateNewPassword(password: string): string | null {
  if (!password) {
    return "Informe uma nova senha."
  }
  if (password.length < 8) {
    return "A senha deve ter pelo menos 8 caracteres."
  }
  return null
}

export async function signIn(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "")
  const password = String(formData.get("password") ?? "")
  const next = String(formData.get("next") ?? "/dashboard")

  const emailError = validateEmail(email)
  const passwordError = validateLoginPassword(password)
  if (emailError) {
    return { error: emailError }
  }
  if (passwordError) {
    return { error: passwordError }
  }

  const safeNext =
    next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard"

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  })

  if (error) {
    return { error: getAuthErrorMessage(error.message) }
  }

  revalidatePath("/", "layout")
  redirect(safeNext)
}

export async function signUp(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "")
  const password = String(formData.get("password") ?? "")
  const confirmPassword = String(formData.get("confirmPassword") ?? "")

  const emailError = validateEmail(email)
  const passwordError = validateNewPassword(password)
  if (emailError) {
    return { error: emailError }
  }
  if (passwordError) {
    return { error: passwordError }
  }
  if (password !== confirmPassword) {
    return { error: "As senhas não coincidem." }
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: {
      emailRedirectTo: `${APP_URL}/auth/confirm`,
    },
  })

  if (error) {
    return { error: getAuthErrorMessage(error.message) }
  }

  if (data.session) {
    revalidatePath("/", "layout")
    redirect("/dashboard")
  }

  return {
    success:
      "Cadastro criado! Enviamos um link de confirmação para seu email.",
  }
}

function validateDisplayName(name: string): string | null {
  if (!name.trim()) {
    return "Informe seu nome."
  }
  if (name.trim().length > 60) {
    return "O nome deve ter no máximo 60 caracteres."
  }
  return null
}

export async function updateProfileName(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const name = String(formData.get("displayName") ?? "").trim()

  const nameError = validateDisplayName(name)
  if (nameError) {
    return { error: nameError }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Sua sessão expirou. Entre novamente." }
  }

  const { error } = await supabase
    .from("profiles")
    .update({ display_name: name })
    .eq("id", user.id)

  if (error) {
    return { error: getAuthErrorMessage(error.message) }
  }

  revalidatePath("/configuracoes")
  revalidatePath("/dashboard")
  return { success: "Nome atualizado com sucesso." }
}

export async function updateAccountPassword(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const password = String(formData.get("password") ?? "")
  const confirmPassword = String(formData.get("confirmPassword") ?? "")

  const passwordError = validateNewPassword(password)
  if (passwordError) {
    return { error: passwordError }
  }
  if (password !== confirmPassword) {
    return { error: "As senhas não coincidem." }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.updateUser({ password })

  if (error) {
    return { error: getAuthErrorMessage(error.message) }
  }

  return { success: "Senha atualizada com sucesso." }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath("/", "layout")
  redirect("/")
}

export async function resetPasswordForEmail(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "")

  const emailError = validateEmail(email)
  if (emailError) {
    return { error: emailError }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
    redirectTo: `${APP_URL}/auth/confirm`,
  })

  if (error) {
    return { error: getAuthErrorMessage(error.message) }
  }

  return {
    success: "Enviamos um link de recuperação para seu email.",
  }
}

export async function updatePassword(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const password = String(formData.get("password") ?? "")
  const confirmPassword = String(formData.get("confirmPassword") ?? "")

  const passwordError = validateNewPassword(password)
  if (passwordError) {
    return { error: passwordError }
  }
  if (password !== confirmPassword) {
    return { error: "As senhas não coincidem." }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.updateUser({ password })

  if (error) {
    return { error: getAuthErrorMessage(error.message) }
  }

  revalidatePath("/", "layout")
  redirect("/dashboard")
}
