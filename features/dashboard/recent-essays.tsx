import { FileText } from "lucide-react"
import Link from "next/link"

import { EmptyState } from "@/components/common/empty-state"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { RecentEssay } from "@/lib/dashboard"

export function RecentEssays({ essays }: { essays: RecentEssay[] }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <CardTitle>Últimas redações</CardTitle>
        {essays.length > 0 && (
          <Button variant="ghost" size="sm" asChild className="-mr-2 text-primary">
            <Link href="/historico">Ver histórico</Link>
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {essays.length === 0 ? (
          <EmptyState
            icon={<FileText className="size-5 text-muted-foreground" />}
            title="Você ainda não tem redações"
            description="Sua primeira redação aparecerá aqui com a nota e o feedback completo."
            action={
              <Button asChild>
                <a href="/redacao/nova">Nova redação</a>
              </Button>
            }
          />
        ) : (
          <ul className="flex flex-col divide-y divide-border">
            {essays.map((essay) => (
              <li key={essay.id}>
                <Link
                  href={`/correcao/${essay.id}`}
                  className="-mx-2 flex items-center justify-between gap-4 rounded-lg px-2 py-3 transition-colors hover:bg-muted/50"
                >
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span className="truncate text-sm font-medium">
                      {essay.theme}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {essay.correctedAt}
                    </span>
                  </div>
                  {essay.score ? (
                    <Badge variant="secondary">{essay.score}</Badge>
                  ) : (
                    <Badge variant="outline">Corrigindo</Badge>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
