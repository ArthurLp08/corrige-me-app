import { classifyScore } from "./constants"

type ScoreDisplayProps = {
  score: number
}

export function ScoreDisplay({ score }: ScoreDisplayProps) {
  return (
    <div className="flex flex-col items-center gap-1 py-2 text-center">
      <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
        Nota estimada
      </p>
      <p className="text-6xl font-semibold tracking-tight sm:text-7xl">{score}</p>
      <p className="text-lg text-muted-foreground">/ 1000</p>
      <p className="mt-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
        {classifyScore(score)}
      </p>
    </div>
  )
}
