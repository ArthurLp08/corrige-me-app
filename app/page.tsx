import type { Metadata } from "next"

import { Benefits } from "@/components/landing/benefits"
import { Cta } from "@/components/landing/cta"
import { Demo } from "@/components/landing/demo"
import { Hero } from "@/components/landing/hero"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Footer } from "@/components/layout/footer"
import { Navbar } from "@/components/layout/navbar"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Corrija sua redação do ENEM com IA",
  description:
    "Escreva sua redação, receba uma nota estimada e feedback claro sobre as 5 competências do ENEM, com pontos fortes, pontos de melhoria e exemplos práticos.",
  keywords: [
    "correção de redação",
    "redação ENEM",
    "nota estimada",
    "competências do ENEM",
    "feedback de redação",
    "inteligência artificial",
  ],
  openGraph: {
    title: "Corrige-Me — Corrige sua redação do ENEM com IA",
    description:
      "Nota estimada e feedback claro sobre as 5 competências do ENEM, com exemplos práticos para evoluir.",
    type: "website",
    url: "/",
    siteName: "Corrige-Me",
    locale: "pt_BR",
  },
}

export default async function Home() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="flex flex-1 flex-col">
      <Navbar isAuthenticated={Boolean(user)} />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <Demo />
        <Benefits />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}
