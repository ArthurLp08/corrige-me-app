import type { Metadata } from "next"

import { AuthCard } from "@/components/auth/auth-card"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Entrar",
  description: "Acesse sua conta no Corrige-Me.",
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>
}) {
  const { next } = await searchParams

  return (
    <AuthCard title="Entrar" description="Acesse sua conta para continuar.">
      <LoginForm next={next} />
    </AuthCard>
  )
}
