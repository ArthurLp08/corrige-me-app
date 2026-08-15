"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { EmptyState } from "@/components/common/empty-state"
import { ErrorState } from "@/components/common/error-state"
import { LoadingState } from "@/components/common/loading-state"
import { cn } from "@/lib/utils"
import {
  AlertTriangle,
  CheckCircle2,
  FileText,
  Inbox,
  Loader2,
  MoreHorizontal,
  Plus,
  Send,
} from "lucide-react"
import { toast } from "sonner"

const colorTokens = [
  { name: "background", className: "bg-background border-border" },
  { name: "foreground", className: "bg-foreground" },
  { name: "primary", className: "bg-primary" },
  { name: "card", className: "bg-card border-border" },
  { name: "muted", className: "bg-muted" },
  { name: "border", className: "bg-border" },
  { name: "ring", className: "bg-ring" },
  { name: "success", className: "bg-success" },
  { name: "warning", className: "bg-warning" },
  { name: "destructive", className: "bg-destructive" },
  { name: "info", className: "bg-info" },
] as const

const radiusTokens = [
  { name: "sm", className: "rounded-sm" },
  { name: "md", className: "rounded-md" },
  { name: "lg", className: "rounded-lg" },
  { name: "xl", className: "rounded-xl" },
  { name: "2xl", className: "rounded-2xl" },
  { name: "full", className: "rounded-full" },
] as const

function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="font-heading text-lg font-medium">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="flex flex-wrap items-start gap-4">{children}</div>
    </section>
  )
}

function DemoCard({
  title,
  children,
  className,
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Card className={cn("w-full sm:w-auto sm:min-w-64", className)}>
      <CardHeader>
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap items-center gap-3">
        {children}
      </CardContent>
    </Card>
  )
}

export default function DesignSystemPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-14 px-4 py-12 sm:px-6">
      <header className="flex flex-col gap-2">
        <Badge className="w-fit">Design System</Badge>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Corrige-Me
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Página de referência para visualizar e testar todos os componentes,
          tokens de cor, tipografia e estados do produto.
        </p>
      </header>

      <Section title="Cores" description="Tokens semânticos utilizados em todo o produto.">
        {colorTokens.map((token) => (
          <div key={token.name} className="flex w-24 flex-col items-center gap-1.5">
            <div
              className={cn(
                "h-14 w-14 rounded-xl border shadow-sm",
                token.className
              )}
            />
            <span className="text-xs text-muted-foreground">{token.name}</span>
          </div>
        ))}
      </Section>

      <Section title="Tipografia" description="Hierarquia tipográfica do produto.">
        <Card className="w-full">
          <CardContent className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              Display
            </span>
            <p className="text-4xl font-semibold tracking-tight">
              Sua redação, avaliada com clareza
            </p>
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              H1
            </span>
            <h1 className="text-3xl font-semibold tracking-tight">
              Entenda sua nota
            </h1>
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              H2
            </span>
            <h2 className="text-2xl font-medium tracking-tight">
              Como funciona
            </h2>
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              H3
            </span>
            <h3 className="text-xl font-medium tracking-tight">
              Competência 1
            </h3>
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              Body
            </span>
            <p className="text-base">
              Receba uma estimativa de nota e entenda como evoluir competência por competência.
            </p>
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              Small
            </span>
            <p className="text-sm text-muted-foreground">
              Texto auxiliar, descrições e metadados.
            </p>
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              Caption
            </span>
            <p className="text-xs text-muted-foreground">
              Legenda ou informação complementar.
            </p>
          </CardContent>
        </Card>
      </Section>

      <Section title="Border Radius" description="Escala utilizada em cards, inputs, botões e badges.">
        {radiusTokens.map((token) => (
          <div key={token.name} className="flex w-20 flex-col items-center gap-1.5">
            <div className={cn("h-14 w-14 border border-foreground/15 bg-muted", token.className)} />
            <span className="text-xs text-muted-foreground">{token.name}</span>
          </div>
        ))}
      </Section>

      <Section title="Button" description="Variantes, tamanhos e estados.">
        <DemoCard title="Variantes">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </DemoCard>
        <DemoCard title="Tamanhos">
          <Button size="xs">Extra small</Button>
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" aria-label="Mais opções">
            <MoreHorizontal />
          </Button>
        </DemoCard>
        <DemoCard title="Estados">
          <Button disabled>Disabled</Button>
          <Button disabled>
            <Loader2 className="animate-spin" />
            Loading
          </Button>
          <Button>
            <Plus />
            Nova redação
          </Button>
          <Button>
            Enviar
            <Send />
          </Button>
        </DemoCard>
      </Section>

      <Section title="Input" description="Campos de entrada com label, erro e disabled.">
        <DemoCard title="Padrão" className="sm:min-w-72">
          <Input placeholder="Digite o tema da redação" />
        </DemoCard>
        <DemoCard title="Com label e erro" className="sm:min-w-72">
          <div className="flex w-full flex-col gap-1.5">
            <label htmlFor="ds-email" className="text-sm font-medium">
              Email
            </label>
            <Input id="ds-email" type="email" placeholder="voce@exemplo.com" aria-invalid />
            <span className="text-xs text-destructive">
              Informe um email válido.
            </span>
          </div>
        </DemoCard>
        <DemoCard title="Disabled" className="sm:min-w-72">
          <Input placeholder="Campo bloqueado" disabled />
        </DemoCard>
      </Section>

      <Section title="Textarea" description="Área de texto multilinha.">
        <DemoCard title="Padrão" className="sm:min-w-96">
          <Textarea placeholder="Escreva sua redação aqui..." />
        </DemoCard>
        <DemoCard title="Disabled" className="sm:min-w-96">
          <Textarea placeholder="Área bloqueada" disabled />
        </DemoCard>
      </Section>

      <Section title="Card" description="Contêiner padrão para agrupar conteúdo.">
        <Card className="w-full sm:max-w-sm">
          <CardHeader>
            <CardTitle>Última nota</CardTitle>
            <CardDescription>Sua correção mais recente</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            <span className="text-3xl font-semibold tracking-tight">760</span>
            <span className="text-sm text-muted-foreground">de 1000 pontos</span>
            <Progress value={76} className="mt-2" />
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Ver correção
            </Button>
          </CardFooter>
        </Card>
      </Section>

      <Section title="Badge" description="Rótulos curtos de status ou categoria.">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="ghost">Ghost</Badge>
        <Badge variant="link">Link</Badge>
      </Section>

      <Section title="Dialog" description="Conteúdo modal com foco e semântica acessíveis.">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Abrir dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar envio</DialogTitle>
              <DialogDescription>
                Sua redação será enviada para correção. Essa ação consome uma
                das suas correções mensais.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline">Cancelar</Button>
              <Button>Confirmar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Section>

      <Section title="Dropdown" description="Menu de ações contextuais.">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Abrir menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuItem>Histórico</DropdownMenuItem>
            <DropdownMenuItem variant="destructive">Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Section>

      <Section title="Toast" description="Feedback de ações em andamento e conclusão.">
        <Button
          variant="outline"
          onClick={() => toast.success("Correção enviada com sucesso!")}
        >
          <CheckCircle2 />
          Sucesso
        </Button>
        <Button variant="outline" onClick={() => toast.info("Aguarde, analisando sua redação...")}>
          Info
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.error("Não foi possível enviar sua redação.")}
        >
          <AlertTriangle />
          Erro
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast("Analisando sua redação...", {
              description: "Isso pode levar alguns instantes.",
            })
          }
        >
          Padrão
        </Button>
      </Section>

      <Section title="Skeleton" description="Placeholder de conteúdo em carregamento.">
        <Card className="w-full sm:max-w-sm">
          <CardContent className="flex flex-col gap-3">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-20 w-full" />
          </CardContent>
        </Card>
      </Section>

      <Section title="Progress" description="Indicador de progresso.">
        <DemoCard title="Valor" className="w-full sm:max-w-sm">
          <div className="flex w-full flex-col gap-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Competência 2</span>
              <span className="font-medium">168 / 200</span>
            </div>
            <Progress value={84} />
          </div>
        </DemoCard>
      </Section>

      <Section title="Tabs" description="Alternância entre conteúdos relacionados.">
        <Card className="w-full sm:max-w-sm">
          <CardContent>
            <Tabs defaultValue="nota">
              <TabsList>
                <TabsTrigger value="nota">Nota</TabsTrigger>
                <TabsTrigger value="feedback">Feedback</TabsTrigger>
              </TabsList>
              <TabsContent value="nota" className="py-4">
                <span className="text-3xl font-semibold tracking-tight">760</span>
                <span className="ml-2 text-sm text-muted-foreground">/ 1000</span>
              </TabsContent>
              <TabsContent value="feedback" className="py-4 text-sm text-muted-foreground">
                Seu texto apresenta boa argumentação e propostas de intervenção
                claras.
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </Section>

      <Section title="Loading State" description="Estados de carregamento.">
        <Card className="w-full sm:max-w-sm">
          <CardHeader>
            <CardTitle>Spinner</CardTitle>
          </CardHeader>
          <CardContent>
            <LoadingState label="Enviando redação..." />
          </CardContent>
        </Card>
        <Card className="w-full sm:max-w-sm">
          <CardHeader>
            <CardTitle>Skeleton</CardTitle>
          </CardHeader>
          <CardContent>
            <LoadingState variant="skeleton" />
          </CardContent>
        </Card>
      </Section>

      <Section title="Empty State" description="Estado sem conteúdo, com próximo passo.">
        <Card className="w-full sm:max-w-sm">
          <CardContent>
            <EmptyState
              icon={<Inbox className="size-5 text-muted-foreground" />}
              title="Você ainda não tem redações"
              description="Escreva sua primeira redação para começar a acompanhar sua evolução."
              action={
                <Button>
                  <FileText />
                  Nova redação
                </Button>
              }
            />
          </CardContent>
        </Card>
      </Section>

      <Section title="Error State" description="Estado de erro com ação de recuperação.">
        <Card className="w-full sm:max-w-sm">
          <CardContent>
            <ErrorState
              title="Não foi possível carregar suas redações"
              description="Verifique sua conexão e tente novamente."
              action={
                <Button variant="outline">Tentar novamente</Button>
              }
            />
          </CardContent>
        </Card>
      </Section>
    </main>
  )
}
