import { CalendarClock, Gauge } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { DashboardUsage } from "@/lib/dashboard"

export function UsageCard({ used, limit, resetsAt }: DashboardUsage) {
  const remaining = limit - used

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          <Gauge className="size-4 text-primary" />
          Correções deste mês
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-semibold tracking-tight">
            {remaining}
          </span>
          <span className="text-muted-foreground">
            {remaining === 1 ? "restante de" : "restantes de"} {limit}
          </span>
        </div>
        <Progress
          value={(used / limit) * 100}
          aria-label={`${remaining} de ${limit} correções restantes`}
        />
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarClock className="size-3.5" />
          Renova em {resetsAt}
        </p>
      </CardContent>
    </Card>
  )
}
