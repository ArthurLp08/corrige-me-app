import type { Metadata } from "next"

import { AuthCard } from "@/components/auth/auth-card"
import { SignupForm } from "@/components/auth/signup-form"

export const metadata: Metadata = {
  title: "Criar conta",
  description: "Crie sua conta no Corrige-Me e comece a evoluir nas redações.",
}

export default function SignupPage() {
  return (
    <AuthCard
      title="Criar conta"
      description="Comece a receber correções de redação com feedback detalhado."
    >
      <SignupForm />
    </AuthCard>
  )
}
