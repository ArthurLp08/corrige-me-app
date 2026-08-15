import { Loader2 } from "lucide-react"

import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

type LoadingStateProps = {
  label?: string
  variant?: "spinner" | "skeleton"
  className?: string
}

export function LoadingState({
  label,
  variant = "spinner",
  className,
}: LoadingStateProps) {
  if (variant === "skeleton") {
    return (
      <div
        role="status"
        aria-live="polite"
        aria-label={label ?? "Carregando"}
        className={cn("flex flex-col gap-4", className)}
      >
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    )
  }

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label ?? "Carregando"}
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-16 text-center",
        className
      )}
    >
      <Loader2 className="size-6 animate-spin text-muted-foreground" />
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
    </div>
  )
}
