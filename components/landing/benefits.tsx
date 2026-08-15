"use client"

import {
  BarChart3,
  BookOpenCheck,
  ListChecks,
  MessageSquareText,
  Target,
  TrendingUp,
} from "lucide-react"

import { FadeIn } from "@/components/landing/fade-in"
import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const benefits = [
  {
    icon: Target,
    title: "Estimativa de nota",
    description:
      "Saiba sua pontuação aproximada logo após o envio da redação.",
  },
  {
    icon: ListChecks,
    title: "Análise das 5 competências",
    description:
      "Entenda seu desempenho em cada competência do ENEM, com nota individual.",
  },
  {
    icon: TrendingUp,
    title: "Pontos fortes",
    description:
      "Veja o que você já faz bem para manter e potencializar na próxima.",
  },
  {
    icon: MessageSquareText,
    title: "Pontos de melhoria",
    description:
      "Identifique com clareza o que está prejudicando sua nota.",
  },
  {
    icon: BookOpenCheck,
    title: "Exemplos práticos",
    description:
      "Receba exemplos concretos de como reescrever trechos e melhorar.",
  },
  {
    icon: BarChart3,
    title: "Evolução acompanhada",
    description:
      "Compare suas correções ao longo do tempo e acompanhe seu progresso.",
  },
]

export function Benefits() {
  return (
    <section
      id="beneficios"
      className="scroll-mt-20 border-t border-border/60 bg-muted/40"
    >
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 md:py-24">
        <FadeIn>
          <div className="flex flex-col items-center gap-3 text-center">
            <Badge variant="secondary">Benefícios</Badge>
            <h2 className="max-w-xl font-heading text-3xl font-semibold tracking-tight">
              Um feedback que faz você entender e evoluir
            </h2>
            <p className="max-w-xl text-muted-foreground">
              Cada correção é transformada em aprendizado prático para a sua
              próxima redação.
            </p>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <FadeIn key={benefit.title} delay={(index % 3) * 0.1}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <benefit.icon className="size-5" />
                  </span>
                  <CardTitle className="mt-3">{benefit.title}</CardTitle>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardHeader>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
