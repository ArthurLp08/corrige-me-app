import { TriangleAlert } from "lucide-react"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type ErrorStateProps = {
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function ErrorState({
  title,
  description,
  action,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center gap-1.5 py-16 text-center",
        className
      )}
    >
      <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <TriangleAlert className="size-5" />
      </div>
      <h3 className="font-heading text-base font-medium">{title}</h3>
      {description && (
        <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
