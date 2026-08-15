import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { CompetencyId, CompetencyScore } from "@/lib/gemini/types"
import { COMPETENCIES, classifyCompetency } from "./constants"

type CompetencyCardProps = {
  id: CompetencyId
  data: CompetencyScore
}

export function CompetencyCard({ id, data }: CompetencyCardProps) {
  const meta = COMPETENCIES[id]

  return (
    <Card>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-semibold">{meta.name}</p>
            <p className="text-sm text-muted-foreground">{meta.description}</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-xl font-semibold tracking-tight">
              {data.score}
              <span className="text-sm font-normal text-muted-foreground">
                {" "}
                / 200
              </span>
            </p>
            <p className="text-xs text-muted-foreground">
              {classifyCompetency(data.score)}
            </p>
          </div>
        </div>
        <Progress
          value={(data.score / 200) * 100}
          aria-label={`${meta.name}: ${data.score} de 200 pontos (${classifyCompetency(data.score)})`}
        />
        <p className="text-sm leading-6 text-muted-foreground">{data.feedback}</p>
      </CardContent>
    </Card>
  )
}
