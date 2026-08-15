"use client"

import { CheckCircle2, Lightbulb, Sparkles, Star, Target } from "lucide-react"

import { FadeIn } from "@/components/common/fade-in"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { CompetencyId } from "@/lib/gemini/types"
import type { CorrectionResult as CorrectionResultData } from "@/lib/gemini/types"
import { COMPETENCIES } from "./constants"
import { CompetencyCard } from "./competency-card"
import { ScoreDisplay } from "./score-display"

type CorrectionResultProps = {
  correction: CorrectionResultData
}

export function CorrectionResult({ correction }: CorrectionResultProps) {
  return (
    <div className="flex flex-col gap-4">
      <FadeIn>
        <Card>
          <CardContent className="flex justify-center py-6">
            <ScoreDisplay score={correction.totalScore} />
          </CardContent>
        </Card>
      </FadeIn>

      <FadeIn delay={0.08}>
        <section aria-labelledby="correction-competencies-title">
          <h2
            id="correction-competencies-title"
            className="mb-3 font-heading text-lg font-semibold"
          >
            Notas das competências
          </h2>
          <div className="grid gap-3">
            {(Object.keys(COMPETENCIES) as CompetencyId[]).map((id) => (
              <CompetencyCard
                key={id}
                id={id}
                data={correction.competencies[id]}
              />
            ))}
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.16}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="size-4 text-primary" />
              Feedback geral
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-6 text-muted-foreground">
              {correction.generalFeedback}
            </p>
          </CardContent>
        </Card>
      </FadeIn>

      <FadeIn delay={0.24}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Star className="size-4 text-primary" />
              Pontos fortes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {correction.strengths.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {correction.strengths.map((strength, index) => (
                  <li key={index} className="flex gap-2 text-sm leading-6">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                Não foram identificados pontos fortes nesta redação.
              </p>
            )}
          </CardContent>
        </Card>
      </FadeIn>

      <FadeIn delay={0.32}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Target className="size-4 text-primary" />
              Pontos de melhoria
            </CardTitle>
          </CardHeader>
          <CardContent>
            {correction.improvements.length > 0 ? (
              <ol className="flex flex-col gap-4">
                {correction.improvements.map((item, index) => (
                  <li key={index} className="flex flex-col gap-1.5">
                    <p className="flex items-start gap-2 text-sm font-medium">
                      <Badge variant="outline" className="mt-0.5 shrink-0">
                        {index + 1}
                      </Badge>
                      <span>{item.problem}</span>
                    </p>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {item.explanation}
                    </p>
                    <p className="flex gap-2 rounded-lg bg-muted px-3 py-2 text-sm leading-6">
                      <Lightbulb className="mt-0.5 size-4 shrink-0 text-warning" />
                      <span>
                        <span className="font-medium">Como melhorar: </span>
                        {item.example}
                      </span>
                    </p>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-sm text-muted-foreground">
                Nenhum ponto de melhoria destacado.
              </p>
            )}
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  )
}
