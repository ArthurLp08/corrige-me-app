"use client"

import { ErrorState } from "@/components/common/error-state"
import { Button } from "@/components/ui/button"

export default function HistoryError({
  reset,
}: {
  reset: () => void
}) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
      <ErrorState
        title="Não foi possível carregar o histórico"
        description="Tente novamente em instantes."
        action={
          <Button variant="outline" onClick={reset}>
            Tentar novamente
          </Button>
        }
      />
    </div>
  )
}
