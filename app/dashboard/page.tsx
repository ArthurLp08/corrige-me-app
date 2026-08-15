import { redirect } from "next/navigation"

import { LogoutButton } from "@/components/auth/logout-button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/entrar")
  }

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <Card className="w-full max-w-sm">
        <CardHeader className="gap-2">
          <Badge variant="secondary" className="w-fit">
            Logado
          </Badge>
          <CardTitle>Bem-vindo ao Corrige-Me</CardTitle>
          <CardDescription>
            Sua conta está ativa com o email {user.email}. O dashboard completo
            com suas correções chega na próxima fase.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LogoutButton />
        </CardContent>
      </Card>
    </main>
  )
}
