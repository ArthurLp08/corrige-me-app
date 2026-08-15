import { ArrowRight } from "lucide-react"

import { BrandLogo } from "@/components/common/brand-logo"
import { FadeIn } from "@/components/landing/fade-in"
import { Button } from "@/components/ui/button"

export function Cta() {
  return (
    <section id="comecar" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 md:py-24">
        <FadeIn>
          <div className="flex flex-col items-center gap-6 rounded-xl bg-primary px-6 py-14 text-center text-primary-foreground sm:px-12">
            <BrandLogo className="size-12 rounded-xl" />
            <div className="flex flex-col items-center gap-3">
              <h2 className="max-w-xl font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                Pronto para evoluir na sua redação?
              </h2>
              <p className="max-w-md text-primary-foreground/80">
                Comece agora e receba sua primeira correção com nota, feedback
                detalhado e exemplos práticos.
              </p>
            </div>
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="bg-background text-foreground hover:bg-background/90"
            >
              <a href="/cadastro">
                Corrigir minha primeira redação
                <ArrowRight />
              </a>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
