import { FileQuestion } from "lucide-react"
import Link from "next/link"

import { EmptyState } from "@/components/common/empty-state"
import { Button } from "@/components/ui/button"

export default function CorrectionNotFound() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-16">
      <EmptyState
        icon={<FileQuestion className="size-5 text-muted-foreground" />}
        title="Correção não encontrada"
        description="Essa correção não existe ou não pertence à sua conta."
        action={
          <Button asChild>
            <Link href="/historico">Voltar ao histórico</Link>
          </Button>
        }
      />
    </div>
  )
}
