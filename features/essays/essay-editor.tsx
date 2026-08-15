"use client"

import { useActionState, useEffect, useMemo, useRef, useState } from "react"
import {
  CalendarClock,
  CheckCircle2,
  CloudUpload,
  Loader2,
  Save,
} from "lucide-react"
import Link from "next/link"

import { EmptyState } from "@/components/common/empty-state"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CorrectionResult } from "@/features/corrections/correction-result"
import type { DashboardUsage } from "@/lib/dashboard"
import { ESSAY_MAX_WORDS, ESSAY_MIN_WORDS, countWords, validateEssay } from "@/lib/essays/validation"
import { submitEssay } from "@/lib/essays/submit"

const DRAFT_KEY = "corrige-me:essay-draft"

type EssayEditorProps = {
  usage: DashboardUsage
}

export function EssayEditor({ usage }: EssayEditorProps) {
  const [state, formAction, pending] = useActionState(submitEssay, {})

  const [theme, setTheme] = useState("")
  const [text, setText] = useState("")
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle")
  const [confirmOpen, setConfirmOpen] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const remaining = usage.limit - usage.used
  const canSubmit = remaining > 0

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const raw = localStorage.getItem(DRAFT_KEY)
        if (raw) {
          const draft = JSON.parse(raw) as { theme?: string; text?: string }
          if (typeof draft.theme === "string") setTheme(draft.theme)
          if (typeof draft.text === "string") setText(draft.text)
        }
      } catch {
        // rascunho inválido é ignorado
      }
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!theme && !text) return

    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify({ theme, text }))
      } catch {
        // armazenamento indisponível
      }
      setSaveState("saved")
    }, 800)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [theme, text])

  useEffect(() => {
    if (state.success) {
      try {
        localStorage.removeItem(DRAFT_KEY)
      } catch {
        // armazenamento indisponível
      }
    }
  }, [state.success])

  const wordCount = useMemo(() => countWords(text), [text])
  const validation = useMemo(() => validateEssay(theme, text), [theme, text])

  if (!canSubmit) {
    return (
      <Card>
        <CardContent>
          <EmptyState
            icon={<CalendarClock className="size-5 text-muted-foreground" />}
            title="Você atingiu o limite de correções"
            description={`Você usou todas as ${usage.limit} correções deste mês. Seu limite renova em ${usage.resetsAt}.`}
            action={
              <Button asChild variant="outline">
                <Link href="/dashboard">Voltar ao dashboard</Link>
              </Button>
            }
          />
        </CardContent>
      </Card>
    )
  }

  if (state.success) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 rounded-lg bg-success/10 px-3 py-2 text-sm text-success">
          <CheckCircle2 className="size-4 shrink-0" />
          {state.success}
        </div>
        {state.correction && <CorrectionResult correction={state.correction} />}
        <div className="flex justify-center sm:justify-end">
          <Button asChild>
            <Link href="/dashboard">Voltar ao dashboard</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <form id="essay-form" action={formAction} className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Escreva sua redação</CardTitle>
            <CardDescription>
              Entre {ESSAY_MIN_WORDS} e {ESSAY_MAX_WORDS} palavras, seguindo as regras do ENEM.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            {state.error && (
              <p
                role="alert"
                className="rounded-lg bg-destructive/10 px-3 py-2.5 text-sm text-destructive"
              >
                {state.error}
              </p>
            )}

            <div className="flex flex-col gap-1.5">
              <label htmlFor="essay-theme" className="text-sm font-medium">
                Tema da redação
              </label>
              <Input
                id="essay-theme"
                name="theme"
                value={theme}
                onChange={(event) => {
                  setTheme(event.target.value)
                  setSaveState("saving")
                }}
                placeholder="Ex.: Os desafios do acesso à cultura no Brasil"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-2">
                <label htmlFor="essay-text" className="text-sm font-medium">
                  Redação
                </label>
                <span className="text-xs text-muted-foreground">
                  Palavras: {wordCount}
                </span>
              </div>
              <Textarea
                id="essay-text"
                name="text"
                value={text}
                onChange={(event) => {
                  setText(event.target.value)
                  setSaveState("saving")
                }}
                placeholder="Escreva sua redação aqui..."
                className="min-h-80 text-base leading-7"
              />
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                <span
                  className={
                    wordCount > 0 && wordCount < ESSAY_MIN_WORDS
                      ? "text-warning"
                      : "text-muted-foreground"
                  }
                >
                  Mínimo: {ESSAY_MIN_WORDS}
                </span>
                <span aria-hidden className="text-muted-foreground">
                  ·
                </span>
                <span
                  className={
                    wordCount > ESSAY_MAX_WORDS
                      ? "text-destructive"
                      : "text-muted-foreground"
                  }
                >
                  Máximo: {ESSAY_MAX_WORDS}
                </span>
                {validation.message && (
                  <>
                    <span aria-hidden className="text-muted-foreground">
                      ·
                    </span>
                    <span className="text-destructive">{validation.message}</span>
                  </>
                )}
                {validation.isValid && (
                  <>
                    <span aria-hidden className="text-muted-foreground">
                      ·
                    </span>
                    <span className="text-success">Pronto para enviar</span>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground" aria-live="polite">
            <Save className="size-3.5 shrink-0" />
            {pending
              ? "Isso pode levar alguns instantes"
              : saveState === "saving"
                ? "Salvando rascunho..."
                : saveState === "saved"
                  ? "Rascunho salvo neste dispositivo"
                  : "Seu rascunho é salvo automaticamente"}
          </div>
          <Button
            type="button"
            size="lg"
            disabled={!validation.isValid || pending}
            onClick={() => setConfirmOpen(true)}
          >
            {pending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Analisando sua redação...
              </>
            ) : (
              <>
                <CloudUpload className="size-4" />
                Enviar para correção
              </>
            )}
          </Button>
        </div>
      </form>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar envio</DialogTitle>
            <DialogDescription>
              Sua redação será enviada para correção e consumirá uma das suas{" "}
              {remaining} {remaining === 1 ? "correção restante" : "correções restantes"}.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancelar
            </Button>
            <Button
              type="submit"
              form="essay-form"
              onClick={() => setConfirmOpen(false)}
            >
              Confirmar envio
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
