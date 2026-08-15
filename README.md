# Corrige-Me

Plataforma de correção de redações do ENEM com inteligência artificial.

O Corrige-Me ajuda o estudante a receber uma estimativa de nota, entender seu desempenho nas 5 competências do ENEM, identificar pontos fortes e de melhoria, receber exemplos práticos e acompanhar sua evolução.

## Funcionalidades

- Correção de redações com análise das 5 competências (C1 a C5);
- Nota estimada de 0 a 1000 com destaque visual;
- Feedback geral, pontos fortes, pontos de melhoria e exemplos práticos;
- Dashboard com evolução da nota, média e melhor resultado;
- Histórico de correções;
- Limite de 5 correções por mês por usuário, validado no servidor;
- Autenticação por email e senha (Supabase Auth);
- Página de configurações de perfil e senha.

## Screenshots

Adicionar capturas de tela das principais páginas em `screenshots/` e referenciá-las aqui:

- Landing page;
- Dashboard;
- Editor de redação;
- Resultado da correção;
- Histórico;
- Configurações.

## Tecnologias

- **Next.js 16** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS 4** + **shadcn/ui** (Radix UI)
- **Framer Motion** (animações)
- **Supabase** (Auth, PostgreSQL, RLS)
- **Gemini API** (correção com IA)
- **Sonner** (notificações)

## Arquitetura

- **Server Components por padrão**; Client Components somente quando necessário (interatividade);
- **Server Actions** para toda mutação (envio de redação, atualização de perfil e senha), com validação no servidor;
- **Gemini acessado exclusivamente no servidor**; a resposta da IA é validada antes de ser persistida;
- **Banco de dados com Row Level Security (RLS)** em todas as tabelas;
- Separação entre UI (`components/`) e lógica (`lib/`, `features/`);
- Design System com tokens semânticos (cores, tipografia, espaçamento) definidos no Tailwind.

### Estrutura

```text
app/                  # Páginas e layouts (rotas)
components/
├── ui/               # Componentes base (shadcn/ui)
├── common/           # Componentes genéricos reutilizáveis
├── layout/           # Navbar, footer, etc.
└── landing/          # Seções da landing page

features/             # Componentes específicos por funcionalidade
├── essays/           # Editor de redação
├── corrections/      # Resultado da correção
├── dashboard/        # Dashboard
├── settings/         # Configurações
└── history/          # Histórico

lib/
├── auth/             # Server actions de autenticação
├── gemini/           # Integração e validação da correção
├── essays/           # Validação da redação
├── corrections/      # Persistência de correções
├── usage/            # Limite mensal
├── dashboard/        # Agregações do dashboard
└── supabase/         # Clientes e middleware

supabase/schema.sql   # Esquema do banco (aplicar no Supabase)
ROADMAP.md            # Fases do projeto
AGENTS.md             # Regras de desenvolvimento
```

### Rotas

| Rota | Descrição | Acesso |
| --- | --- | --- |
| `/` | Landing page | Público |
| `/entrar`, `/cadastro` | Autenticação | Público (redireciona se logado) |
| `/recuperar-senha`, `/redefinir-senha` | Recuperação de senha | Público |
| `/dashboard` | Dashboard | Autenticado |
| `/redacao/nova` | Editor de redação | Autenticado |
| `/historico` | Histórico de correções | Autenticado |
| `/correcao/[id]` | Detalhe da correção | Autenticado (dono) |
| `/configuracoes` | Perfil e senha | Autenticado |

## Como executar

### Pré-requisitos

- Node.js 20+ e npm;
- Projeto no [Supabase](https://supabase.com) (Auth e banco PostgreSQL);
- Chave da [Gemini API](https://ai.google.dev).

### Passos

1. Clone o repositório:

   ```bash
   git clone <url-do-repositorio>
   cd corrige-me
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:

   ```bash
   cp .env.example .env.local
   ```

   Preencha os valores conforme a tabela abaixo.

4. Aplique o esquema do banco no SQL Editor do Supabase Dashboard (`supabase/schema.sql`).

5. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

6. Abra [http://localhost:3000](http://localhost:3000).

### Scripts

```bash
npm run dev       # Servidor de desenvolvimento
npm run build     # Build de produção
npm run start     # Servidor de produção
npm run lint      # ESLint
```

## Variáveis de ambiente

| Variável | Descrição | Obrigatória |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase | Sim |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave anônima (pública) do Supabase | Sim |
| `NEXT_PUBLIC_APP_URL` | URL pública do app (links enviados por email) | Sim |
| `GEMINI_API_KEY` | Chave da Gemini (somente servidor) | Sim |
| `GEMINI_MODEL` | Modelo usado na correção (opcional) | Não |

**Importante:** a `GEMINI_API_KEY` deve ser usada somente no servidor e nunca com o prefixo `NEXT_PUBLIC_`.

## Banco de dados

Tabelas:

- `profiles` — perfil do usuário (nome de exibição);
- `essays` — redações enviadas;
- `corrections` — resultado da correção (nota, feedback geral, forças e melhorias);
- `competencies` — nota e feedback por competência (c1 a c5);
- `monthly_usage` — correções utilizadas no mês.

Todas as tabelas possuem RLS habilitado com políticas que restringem o acesso ao dono do registro. O perfil é criado automaticamente no cadastro via trigger em `auth.users`.

## Decisões importantes

1. **Server Actions no lugar de API routes** para mutações: validação no servidor, menos camadas e estados de erro claros no formulário.
2. **Gemini somente no servidor**: a chave nunca chega ao browser; a resposta estruturada é validada (faixas de nota, campos obrigatórios) antes de ser salva.
3. **Limite de correções validado no servidor** (`monthly_usage`): nunca confiar no contador enviado pelo client.
4. **Resiliência da IA**: retry com backoff exponencial em erros temporários (429/5xx) e mensagens amigáveis ao usuário.
5. **RLS em todas as tabelas**: o cliente Supabase nunca acessa dados de outros usuários, mesmo que a chave anônima seja exposta.
6. **Server Components por padrão**: reduz JavaScript enviado ao browser; `use client` apenas em componentes interativos.
7. **Design System via tokens semânticos**: cores e estilos consistente sem valores arbitrários nos componentes.
8. **Nota em faixas claras**: total de 0 a 1000 e cada competência de 0 a 200, exibidas com indicador visual e texto complementar (não apenas cor).

## Saiba mais

- `ROADMAP.md` — fases do projeto;
- `AGENTS.md` — regras e padrões de desenvolvimento;
- `supabase/schema.sql` — esquema do banco.
