import { ClipboardCheck, PenLine, Sparkles } from "lucide-react"

import { FadeIn } from "@/components/landing/fade-in"
import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const steps = [
  {
    icon: PenLine,
    step: "1",
    title: "Escreva sua redação",
    description:
      "Digite ou cole seu texto e informe o tema. Sem burocracia e no seu ritmo.",
  },
  {
    icon: Sparkles,
    step: "2",
    title: "A IA analisa em detalhes",
    description:
      "Suas 5 competências do ENEM são avaliadas com critérios claros e consistentes.",
  },
  {
    icon: ClipboardCheck,
    step: "3",
    title: "Receba seu feedback",
    description:
      "Veja sua nota, pontos fortes, pontos de melhoria e exemplos práticos de como evoluir.",
  },
]

export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="scroll-mt-20 border-t border-border/60 bg-muted/40"
    >
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 md:py-24">
        <FadeIn>
          <div className="flex flex-col items-center gap-3 text-center">
            <Badge variant="secondary">Como funciona</Badge>
            <h2 className="max-w-xl font-heading text-3xl font-semibold tracking-tight">
              Do texto à nota em três passos
            </h2>
            <p className="max-w-xl text-muted-foreground">
              Um fluxo simples pensado para você focar no que importa: escrever
              e aprender.
            </p>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <FadeIn key={step.step} delay={index * 0.1}>
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <step.icon className="size-5" />
                    </span>
                    <span className="font-heading text-3xl font-semibold text-muted-foreground/40">
                      {step.step}
                    </span>
                  </div>
                  <CardTitle className="mt-4">{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
