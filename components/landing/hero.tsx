"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const competencyMocks = [
  { name: "C1", score: 160 },
  { name: "C2", score: 160 },
  { name: "C3", score: 200 },
  { name: "C4", score: 120 },
  { name: "C5", score: 160 },
]

export function Hero() {
  const reduceMotion = useReducedMotion()

  const entrance = reduceMotion
    ? {}
    : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } }
  const transition = { duration: 0.5, ease: "easeOut" as const }

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid w-full max-w-5xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center md:gap-8 md:py-24">
        <div className="flex flex-col items-start gap-6">
          <motion.div {...entrance} transition={{ ...transition, delay: 0 }}>
            <Badge variant="secondary" className="gap-1.5">
              <Sparkles className="size-3" />
              Correção com inteligência artificial
            </Badge>
          </motion.div>

          <motion.h1
            {...entrance}
            transition={{ ...transition, delay: 0.05 }}
            className="font-heading text-4xl font-semibold leading-tight tracking-tight sm:text-5xl"
          >
            Receba uma nota estimada e feedback claro na sua redação do ENEM
          </motion.h1>

          <motion.p
            {...entrance}
            transition={{ ...transition, delay: 0.1 }}
            className="max-w-md text-lg text-muted-foreground"
          >
            Escreva sua redação, envie e entenda seu desempenho nas 5
            competências com pontos fortes, pontos de melhoria e exemplos
            práticos para evoluir.
          </motion.p>

          <motion.div
            {...entrance}
            transition={{ ...transition, delay: 0.15 }}
            className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          >
            <Button size="lg" asChild>
              <a href="/cadastro">
                Corrigir minha redação
                <ArrowRight />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#como-funciona">Como funciona</a>
            </Button>
          </motion.div>
        </div>

        <motion.div
          {...entrance}
          transition={{ ...transition, delay: 0.2 }}
          className="flex justify-center md:justify-end"
        >
          <Card className="w-full max-w-sm">
            <CardContent className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Nota estimada
                </span>
                <Badge variant="secondary">ENEM</Badge>
              </div>

              <div className="flex items-baseline gap-1.5">
                <span className="text-5xl font-semibold tracking-tight">
                  800
                </span>
                <span className="text-muted-foreground">/ 1000</span>
              </div>

              <Progress value={76} aria-label="760 de 1000 pontos" />

              <div className="flex flex-col gap-2.5">
                {competencyMocks.map((competency) => (
                  <div key={competency.name} className="flex items-center gap-3">
                    <span className="w-6 text-xs font-medium text-muted-foreground">
                      {competency.name}
                    </span>
                    <Progress value={competency.score / 2} className="flex-1" />
                    <span className="w-10 text-right text-xs text-muted-foreground">
                      {competency.score}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between rounded-lg bg-success/10 px-3 py-2.5">
                <span className="text-sm font-medium text-success">
                  Boa evolução
                </span>
                <span className="text-xs text-muted-foreground">
                  +40 desde a última correção
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
