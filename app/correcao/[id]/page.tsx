import type { Metadata } from "next"
import { ArrowLeft, LayoutDashboard } from "lucide-react"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

import { Button } from "@/components/ui/button"
import { CorrectionResult } from "@/features/corrections/correction-result"
import { getCorrection } from "@/lib/corrections/correction-store"
import { formatDateTime } from "@/lib/format"
import { createClient } from "@/lib/supabase/server"

type Params = {
  id: string
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Correção",
    description: "Correção completa de uma redação.",
  }
}

export default async function CorrectionPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { id } = await params

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/entrar")
  }

  const correction = getCorrection(user.id, id)

  if (!correction) {
    notFound()
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6">
      <div>
        <div className="flex flex-wrap items-center gap-1">
          <Button asChild variant="ghost" size="sm" className="-ml-2 text-muted-foreground">
            <Link href="/historico">
              <ArrowLeft className="size-4" />
              Voltar ao histórico
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
            <Link href="/dashboard">
              <LayoutDashboard className="size-4" />
              Dashboard
            </Link>
          </Button>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            {correction.theme}
          </h1>
          <p className="text-muted-foreground">
            {formatDateTime(correction.correctedAt)}
          </p>
        </div>
      </div>

      <CorrectionResult correction={correction.result} />
    </main>
  )
}
