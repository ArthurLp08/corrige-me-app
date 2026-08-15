# ROADMAP.md — Corrige-Me

> Este documento é executado pela IA em ordem.
> O `AGENTS.md` contém as regras gerais que devem ser respeitadas durante toda a execução.

## Como executar

- Execute apenas uma fase por vez.
- Antes de iniciar uma fase, leia o `AGENTS.md`.
- Leia a fase atual completamente antes de implementar.
- Não implemente funcionalidades de fases futuras.
- Antes de alterar código existente, entenda sua estrutura.
- Ao concluir uma tarefa, marque-a como `[x]` no `ROADMAP.md` imediatamente.
- Ao concluir uma fase, revise sua implementação e marque todas as tarefas da fase.
- Marque como concluído somente aquilo que realmente foi implementado.
- Se uma decisão importante não estiver definida, pare e peça confirmação.
- Ao finalizar uma fase, informe o que foi feito e indique a próxima fase.

---

# FASE 1 — Fundação

## Objetivo

Criar a base técnica do Corrige-Me.

## Tarefas

- [x] Criar/configurar projeto Next.js com TypeScript
- [x] Configurar Tailwind CSS
- [x] Configurar shadcn/ui
- [x] Configurar Framer Motion
- [x] Configurar ESLint
- [x] Configurar estrutura de pastas
- [x] Configurar aliases
- [x] Criar `.env.example`
- [x] Criar layout base
- [x] Garantir que o projeto execute corretamente

## Critério de conclusão

- Projeto inicia sem erros.
- TypeScript funciona.
- ESLint funciona.
- Estrutura inicial está organizada.

---

# FASE 2 — Componentes base

## Objetivo

Criar os componentes reutilizáveis necessários para construir o Corrige-Me.

Todos os componentes devem seguir integralmente o Design System definido no `AGENTS.md`.

## Tarefas

- [x] Button
- [x] Input
- [x] Textarea
- [x] Card
- [x] Badge
- [x] Dialog
- [x] Dropdown
- [x] Toast
- [x] Skeleton
- [x] Progress
- [x] Tabs
- [x] Loading State
- [x] Empty State
- [x] Error State

Para cada componente:

- [x] Implementar variantes necessárias
- [x] Implementar estados
- [x] Garantir responsividade
- [x] Garantir acessibilidade
- [x] Utilizar tokens do tema
- [x] Evitar estilos arbitrários

## Critério de conclusão

- Componentes necessários estão disponíveis.
- Componentes são reutilizáveis.
- Estados principais estão implementados.
- Não existem componentes duplicados.
- Adicione uma pagina temporaria chamada "design-system", onde posso ver todos os componentes.

---

# FASE 3 — Landing Page

## Objetivo

Apresentar o Corrige-Me para um visitante que ainda não conhece o produto.

## Tarefas

- [x] Navbar
- [x] Hero
- [x] Explicação de como funciona
- [x] Demonstração visual da correção
- [x] Benefícios
- [x] CTA
- [x] Footer
- [x] Responsividade
- [x] Microinterações
- [x] SEO básico

A página deve comunicar:

1. O que é o Corrige-Me.
2. Como funciona.
3. O que o estudante recebe.
4. Por que o feedback é útil.

## Critério de conclusão

Um visitante deve conseguir entender o produto sem explicação externa.

---

# FASE 4 — Autenticação

## Objetivo

Criar o sistema de acesso dos usuários.

## Tarefas

- [ ] Cadastro
- [ ] Login
- [ ] Logout
- [ ] Recuperação de senha
- [ ] Validação de formulários
- [ ] Loading states
- [ ] Error states
- [ ] Proteção das rotas privadas
- [ ] Integração com Supabase Auth

## Critério de conclusão

O usuário consegue criar conta, entrar, acessar páginas privadas, sair e recuperar a senha.

---

# FASE 5 — Dashboard

## Objetivo

Criar a página principal do usuário.

## Tarefas

Exibir:

- [x] Saudação
- [x] Correções restantes
- [x] Última nota
- [x] Média
- [x] Melhor nota
- [x] Evolução
- [x] Últimas redações
- [x] CTA para nova redação

Estados:

- [x] Usuário sem redações
- [x] Usuário com redações
- [x] Loading
- [x] Error

## Critério de conclusão

O usuário consegue entender rapidamente seu estado atual e iniciar uma nova correção.

---

# FASE 6 — Editor de redação

## Objetivo

Criar o fluxo de escrita e envio.

## Tarefas

- [x] Seleção/entrada do tema
- [x] Editor de texto
- [x] Contagem de palavras
- [x] Validação
- [x] Autosave
- [x] Estado de edição
- [x] Botão de envio
- [x] Confirmação antes do envio
- [x] Loading
- [x] Controle visual do limite mensal

O limite é de 5 correções por mês.

Se o usuário não possuir correções disponíveis:

- impedir o envio;
- explicar o motivo;
- informar quando o limite será renovado.

## Fora desta fase

Não implementar:

- Upload de foto
- OCR

Essas funcionalidades ficam para o pós-MVP.

## Critério de conclusão

O usuário consegue escrever uma redação e enviá-la para o fluxo de correção.

---

# FASE 7 — Motor de correção

## Objetivo

Integrar o Gemini ao Corrige-Me.

## Tarefas

- [x] Criar endpoint/server action
- [x] Configurar Gemini
- [x] Criar prompt principal
- [x] Criar schema da resposta
- [x] Validar resposta
- [x] Tratar erros
- [x] Implementar loading
- [x] Implementar controle das 5 correções mensais

A correção deve produzir:

- [x] Nota final
- [x] Nota das 5 competências
- [x] Feedback por competência
- [x] Pontos fortes
- [x] Pontos de melhoria
- [x] Explicação dos problemas
- [x] Exemplos de melhoria
- [x] Feedback geral

## Segurança

- [x] API key somente no servidor
- [x] Nenhum secret em `NEXT_PUBLIC_*`
- [x] Validar redação antes do envio
- [x] Validar resposta da IA

## Critério de conclusão

Uma redação enviada consegue chegar ao Gemini e retornar uma resposta estruturada e validada.

---

# FASE 8 — Resultado da correção

## Objetivo

Transformar o resultado da IA em uma experiência clara de aprendizado.

## Ordem visual

1. Nota final
2. Notas das competências
3. Feedback geral
4. Pontos fortes
5. Pontos de melhoria
6. Exemplos práticos

## Tarefas

- [x] Score principal
- [x] Cards das competências
- [x] Feedback por competência
- [x] Pontos fortes
- [x] Pontos de melhoria
- [x] Exemplos
- [x] Loading
- [x] Error states
- [x] Responsividade
- [x] Animações discretas

## Critério de conclusão

O usuário consegue entender sua nota, por que recebeu aquela avaliação e como pode melhorar.

---

# FASE 9 — Histórico

## Objetivo

Permitir que o usuário consulte correções anteriores.

## Tarefas

- [ ] Lista de redações
- [ ] Data
- [ ] Tema
- [ ] Nota final
- [ ] Notas por competência
- [ ] Acesso à correção completa
- [ ] Empty State
- [ ] Loading
- [ ] Error
- [ ] Responsividade

## Critério de conclusão

O usuário consegue encontrar uma redação anterior e rever sua correção completa.

---

# FASE 10 — Evolução

## Objetivo

Mostrar a evolução do estudante.

## Tarefas

- [ ] Gráfico de evolução da nota
- [ ] Média
- [ ] Melhor nota
- [ ] Evolução por competência
- [ ] Comparação entre correções
- [ ] Responsividade

Priorizar visualizações simples e fáceis de interpretar.

## Critério de conclusão

O usuário consegue visualizar claramente sua evolução.

---

# FASE 11 — Banco de dados e segurança

## Objetivo

Persistir os dados corretamente e proteger os recursos dos usuários.

## Tarefas

Criar/configurar:

- [ ] Profiles
- [ ] Essays
- [ ] Corrections
- [ ] Competencies
- [ ] Monthly Usage

Implementar:

- [ ] RLS
- [ ] Policies
- [ ] Ownership
- [ ] Validação server-side

## Critério de conclusão

Os dados persistem após refresh e um usuário nunca consegue acessar dados de outro usuário.

---

# FASE 12 — Configurações

## Objetivo

Permitir gerenciamento básico da conta.

## Tarefas

- [ ] Nome editável
- [ ] Email somente leitura
- [ ] Alteração de senha
- [ ] Logout

Não adicionar configurações desnecessárias ao MVP.

## Critério de conclusão

O usuário consegue gerenciar as informações essenciais da própria conta.

---

# FASE 13 — Refinamento UX/UI

## Objetivo

Polir todo o produto antes do deploy.

## UX

- [ ] Revisar fluxos
- [ ] Revisar feedback das ações
- [ ] Revisar loading states
- [ ] Revisar empty states
- [ ] Revisar error states
- [ ] Revisar confirmações
- [ ] Revisar hierarquia

## UI

- [ ] Revisar espaçamentos
- [ ] Revisar tipografia
- [ ] Revisar alinhamento
- [ ] Revisar consistência
- [ ] Revisar responsividade

## Motion

- [ ] Microinterações
- [ ] Transições
- [ ] Entrada de conteúdo
- [ ] Feedback de ações

## Acessibilidade

- [ ] Navegação por teclado
- [ ] Focus states
- [ ] Labels
- [ ] Contraste
- [ ] Semântica

## Critério de conclusão

Todas as páginas apresentam uma experiência consistente e sem estados quebrados.

---

# FASE 14 — Performance e segurança

## Tarefas

Revisar:

- [ ] Server Components
- [ ] Client Components
- [ ] Requests
- [ ] API
- [ ] Validação
- [ ] Autenticação
- [ ] RLS
- [ ] Secrets
- [ ] Rate limiting
- [ ] Bundle
- [ ] Imagens
- [ ] Loading

Corrigir problemas encontrados.

## Critério de conclusão

Não existem secrets expostos, rotas desprotegidas ou problemas óbvios de performance.

---

# FASE 15 — Deploy

## Tarefas

- [ ] Configurar Vercel
- [ ] Configurar variáveis de ambiente
- [ ] Configurar Supabase em produção
- [ ] Configurar Gemini
- [ ] Fazer deploy
- [ ] Testar autenticação
- [ ] Testar criação de redação
- [ ] Testar correção
- [ ] Testar histórico
- [ ] Testar limite mensal

## Critério de conclusão

O MVP funciona corretamente em produção.

---

# FASE 16 — Documentação

## Tarefas

Criar/atualizar:

- [ ] README
- [ ] Screenshots
- [ ] Tecnologias
- [ ] Arquitetura
- [ ] Como executar
- [ ] Variáveis de ambiente
- [ ] Decisões importantes
- [ ] Limitações conhecidas

## Critério de conclusão

Outra pessoa consegue clonar o projeto, configurar o ambiente e entender sua arquitetura.

---

# PÓS-MVP

Não implementar durante o MVP.

Possíveis funcionalidades futuras:

- [ ] Upload de foto
- [ ] OCR
- [ ] Gamificação
- [ ] Streak
- [ ] Badges
- [ ] Ranking
- [ ] Recomendações personalizadas
- [ ] Plano de estudos
- [ ] Relatórios avançados
- [ ] Planos pagos
- [ ] Aplicativo mobile
