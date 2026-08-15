import { MetricCard } from "@/components/common/metric-card"
import { cn } from "@/lib/utils"

type ScoreMetricsProps = {
  lastScore: number | null
  averageScore: number | null
  bestScore: number | null
  evolution: number | null
}

export function ScoreMetrics({
  lastScore,
  averageScore,
  bestScore,
  evolution,
}: ScoreMetricsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Última nota"
        value={lastScore ?? "—"}
        description="Sua correção mais recente"
      />
      <MetricCard
        title="Média"
        value={averageScore ?? "—"}
        description="Média de todas as correções"
      />
      <MetricCard
        title="Melhor nota"
        value={bestScore ?? "—"}
        description="Sua melhor pontuação"
      />
      <MetricCard
        title="Evolução"
        value={
          evolution === null ? (
            "—"
          ) : (
            <span
              className={cn(
                evolution >= 0 ? "text-success" : "text-destructive"
              )}
            >
              {evolution >= 0 ? "+" : ""}
              {evolution} pts
            </span>
          )
        }
        description="Da primeira para a última correção"
      />
    </div>
  )
}
