import type { Metadata } from "next"

import { AuthCard } from "@/components/auth/auth-card"
import { ResetPasswordForm } from "@/components/auth/reset-password-form"

export const metadata: Metadata = {
  title: "Definir nova senha",
  description: "Defina uma nova senha para sua conta no Corrige-Me.",
}

export default function ResetPasswordPage() {
  return (
    <AuthCard
      title="Definir nova senha"
      description="Escolha uma nova senha para sua conta."
    >
      <ResetPasswordForm />
    </AuthCard>
  )
}
