import type { Metadata } from "next"

import { AuthCard } from "@/components/auth/auth-card"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"

export const metadata: Metadata = {
  title: "Recuperar senha",
  description: "Recupere o acesso à sua conta no Corrige-Me.",
}

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Recuperar senha"
      description="Enviaremos um link de recuperação para seu email."
    >
      <ForgotPasswordForm />
    </AuthCard>
  )
}
