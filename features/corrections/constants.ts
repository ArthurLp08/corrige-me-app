import type { CompetencyId } from "@/lib/gemini/types"

export const COMPETENCIES: Record<
  CompetencyId,
  { id: CompetencyId; name: string; description: string }
> = {
  c1: {
    id: "c1",
    name: "Competência 1",
    description: "Domínio da escrita formal da língua portuguesa",
  },
  c2: {
    id: "c2",
    name: "Competência 2",
    description: "Compreensão do tema e organização dos argumentos",
  },
  c3: {
    id: "c3",
    name: "Competência 3",
    description: "Seleção e articulação de repertório sociocultural produtivo",
  },
  c4: {
    id: "c4",
    name: "Competência 4",
    description: "Coesão e coerência textual",
  },
  c5: {
    id: "c5",
    name: "Competência 5",
    description: "Proposta de intervenção respeitando os direitos humanos",
  },
}

export function classifyScore(score: number): string {
  if (score >= 900) return "Excelente"
  if (score >= 800) return "Muito boa"
  if (score >= 700) return "Boa evolução"
  if (score >= 600) return "Boa"
  if (score >= 400) return "Em desenvolvimento"
  return "Requer atenção"
}

export function classifyCompetency(score: number): string {
  if (score >= 180) return "Excelente"
  if (score >= 160) return "Muito bom"
  if (score >= 140) return "Bom"
  if (score >= 100) return "Regular"
  return "Insuficiente"
}
