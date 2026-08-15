"use client"

import { CheckCircle2, Lightbulb } from "lucide-react"

import { FadeIn } from "@/components/landing/fade-in"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const competencyMocks = [
  { name: "Competência 1", score: 160 },
  { name: "Competência 2", score: 160 },
  { name: "Competência 3", score: 200 },
  { name: "Competência 4", score: 120 },
  { name: "Competência 5", score: 160 },
]

const strengths = [
  "Introdução clara que apresenta o tema e a tese",
  "Proposta de intervenção com agente e detalhamento",
  "Boa progressão textual entre os parágrafos",
]

const improvements = [
  {
    problem: "Repertório limitado",
    explanation:
      "Há poucas referências externas para sustentar os argumentos.",
    example:
      "Cite dados do IBGE ou autores como Zygmunt Bauman ao discutir relações sociais.",
  },
  {
    problem: "Desvios de norma padrão",
    explanation:
      "Foram identificados erros de concordância e pontuação.",
    example:
      "Evite vírgula entre sujeito e verbo: “O acesso à internet, é essencial” → “O acesso à internet é essencial”.",
  },
]

export function Demo() {
  return (
    <section id="demonstracao" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 md:py-24">
        <FadeIn>
          <div className="flex flex-col items-center gap-3 text-center">
            <Badge variant="secondary">Demonstração</Badge>
            <h2 className="max-w-xl font-heading text-3xl font-semibold tracking-tight">
              Veja o que você recebe
            </h2>
            <p className="max-w-xl text-muted-foreground">
              Um exemplo do resultado da sua correção: nota, competências,
              feedback geral, pontos fortes e exemplos de melhoria.
            </p>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <FadeIn delay={0.1}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Nota estimada</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-5xl font-semibold tracking-tight">
                    800
                  </span>
                  <span className="text-muted-foreground">/ 1000</span>
                  <Badge className="ml-auto">Boa evolução</Badge>
                </div>

                <Progress value={80} aria-label="800 de 1000 pontos" />

                <div className="flex flex-col gap-2.5">
                  {competencyMocks.map((competency) => (
                    <div key={competency.name} className="flex items-center gap-3">
                      <span className="w-28 text-sm text-muted-foreground">
                        {competency.name}
                      </span>
                      <Progress value={competency.score / 2} className="flex-1" />
                      <span className="w-8 text-right text-sm font-medium">
                        {competency.score}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          <div className="flex flex-col gap-4">
            <FadeIn delay={0.2}>
              <Card>
                <CardHeader>
                  <CardTitle>Feedback geral</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Sua redação apresenta boa estrutura e argumentação consistente,
                  com proposta de intervenção clara. Para avançar, foque em
                  ampliar o repertório sociocultural e revisar a norma padrão
                  em trechos específicos.
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={0.3}>
              <Card>
                <CardHeader>
                  <CardTitle>Pontos fortes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-col gap-2.5">
                    {strengths.map((strength) => (
                      <li key={strength} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                        <span className="text-muted-foreground">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </FadeIn>
          </div>

          <FadeIn delay={0.4} className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Pontos de melhoria e exemplos</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                {improvements.map((improvement) => (
                  <div
                    key={improvement.problem}
                    className="flex flex-col gap-2 rounded-lg border border-border bg-muted/40 p-4"
                  >
                    <div className="flex items-center gap-2">
                      <Lightbulb className="size-4 text-warning" />
                      <span className="text-sm font-medium">
                        {improvement.problem}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {improvement.explanation}
                    </p>
                    <p className="rounded-md bg-background p-2.5 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">
                        Exemplo:{" "}
                      </span>
                      {improvement.example}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
