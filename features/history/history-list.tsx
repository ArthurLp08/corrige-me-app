import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { FadeIn } from "@/components/common/fade-in"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { COMPETENCIES } from "@/features/corrections/constants"
import type { CompetencyId } from "@/lib/gemini/types"
import type { StoredCorrection } from "@/lib/corrections/correction-store"
import { formatDate } from "@/lib/format"

export function HistoryList({ corrections }: { corrections: StoredCorrection[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {corrections.map((correction, index) => (
        <li key={correction.id}>
          <FadeIn delay={Math.min(index * 0.05, 0.3)}>
            <Card>
              <CardContent className="flex flex-col gap-3 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <p className="font-medium leading-snug">{correction.theme}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(correction.correctedAt)}
                    </p>
                  </div>
                  <Badge variant="secondary" className="shrink-0">
                    {correction.result.totalScore}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                  {(Object.keys(COMPETENCIES) as CompetencyId[]).map((id) => (
                    <div
                      key={id}
                      className="flex flex-col rounded-lg bg-muted px-2.5 py-2"
                    >
                      <span className="text-xs uppercase tracking-wide text-muted-foreground">
                        C{id.slice(1)}
                      </span>
                      <span className="text-sm font-medium">
                        {correction.result.competencies[id].score} / 200
                      </span>
                    </div>
                  ))}
                </div>

                <div>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="-ml-2 text-primary"
                  >
                    <Link href={`/correcao/${correction.id}`}>
                      Ver correção completa
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </li>
      ))}
    </ul>
  )
}
