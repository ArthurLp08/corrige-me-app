import { Minus, TrendingDown, TrendingUp } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { CompetencyEvolution as CompetencyEvolutionData } from "@/lib/dashboard"
import { cn } from "@/lib/utils"

type CompetencyEvolutionProps = {
  items: CompetencyEvolutionData[]
}

export function CompetencyEvolution({ items }: CompetencyEvolutionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolução por competência</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col gap-1 rounded-lg bg-muted px-3 py-3">
              <span className="text-xs uppercase tracking-wide text-muted-foreground">
                C{item.id.slice(1)}
              </span>
              <div className="flex items-baseline gap-1.5 text-sm font-medium">
                <span>{item.first}</span>
                <span className="text-muted-foreground">→</span>
                <span>{item.last}</span>
              </div>
              <span
                className={cn(
                  "flex items-center gap-0.5 text-xs font-medium",
                  item.delta > 0
                    ? "text-success"
                    : item.delta < 0
                      ? "text-destructive"
                      : "text-muted-foreground"
                )}
              >
                {item.delta > 0 ? (
                  <TrendingUp className="size-3" />
                ) : item.delta < 0 ? (
                  <TrendingDown className="size-3" />
                ) : (
                  <Minus className="size-3" />
                )}
                {item.delta > 0 ? `+${item.delta}` : item.delta} pts
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
