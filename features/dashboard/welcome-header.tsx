export function WelcomeHeader({ userName }: { userName: string }) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
        Olá, {userName}
      </h1>
      <p className="text-muted-foreground">
        Aqui está o resumo do seu desempenho.
      </p>
    </div>
  )
}
