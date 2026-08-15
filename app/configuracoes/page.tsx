import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

import { LogoutButton } from "@/components/auth/logout-button"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PasswordForm } from "@/features/settings/password-form"
import { ProfileForm } from "@/features/settings/profile-form"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Configurações",
  description: "Gerencie as informações da sua conta.",
}

export default async function SettingsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/entrar")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("id", user.id)
    .maybeSingle()

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6">
      <div>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="-ml-2 text-muted-foreground"
        >
          <Link href="/dashboard">
            <ArrowLeft className="size-4" />
            Voltar ao dashboard
          </Link>
        </Button>
        <div className="mt-4 flex flex-col gap-1">
          <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            Configurações
          </h1>
          <p className="text-muted-foreground">
            Gerencie as informações essenciais da sua conta.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Perfil</CardTitle>
          <CardDescription>
            Seu nome aparece na saudação do dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm
            displayName={profile?.display_name ?? ""}
            email={user.email ?? ""}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Senha</CardTitle>
          <CardDescription>
            Atualize sua senha de acesso à conta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PasswordForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sessão</CardTitle>
          <CardDescription>
            Encerre sua sessão neste dispositivo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LogoutButton />
        </CardContent>
      </Card>
    </main>
  )
}
