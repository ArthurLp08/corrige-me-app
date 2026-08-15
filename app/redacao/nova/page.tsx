import type { Metadata } from "next"
import { PenLine } from "lucide-react"
import Link from "next/link"

import { EmptyState } from "@/components/common/empty-state"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Nova redação",
  description: "Escreva e envie sua redação para correção.",
}

export default function NewEssayPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <EmptyState
        icon={<PenLine className="size-5 text-muted-foreground" />}
        title="Editor em construção"
        description="O editor de redação chega na próxima fase. Enquanto isso, explore o dashboard."
        action={
          <Button asChild>
            <Link href="/dashboard">Voltar ao dashboard</Link>
          </Button>
        }
      />
    </main>
  )
}
