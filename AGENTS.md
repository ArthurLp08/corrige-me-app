# AGENTS.md — Corrige-Me

## 1. Contexto

O Corrige-Me é uma plataforma de correção de redações do ENEM utilizando inteligência artificial.

O objetivo é ajudar o estudante a:
- receber uma estimativa de nota;
- entender seu desempenho nas 5 competências;
- identificar pontos fortes;
- identificar pontos de melhoria;
- receber exemplos práticos;
- acompanhar sua evolução.

O produto deve priorizar clareza, aprendizado, UX, acessibilidade, consistência visual e qualidade do feedback.

## 2. Regra principal

O `ROADMAP.md` define o que deve ser implementado.
Este arquivo define como o trabalho deve ser realizado.

Antes de implementar qualquer fase:
1. Leia este arquivo.
2. Leia a fase correspondente no `ROADMAP.md`.
3. Analise o código existente.
4. Identifique componentes reutilizáveis.
5. Implemente somente o escopo da fase atual.

Não implemente funcionalidades de fases futuras.
Não invente requisitos.

## 3. Processo de desenvolvimento

Antes de implementar:
- analisar a estrutura existente;
- identificar componentes reutilizáveis;
- verificar dependências existentes;
- definir uma abordagem simples;
- evitar alterações desnecessárias.

Durante:
- manter o código organizado;
- reutilizar componentes;
- seguir o Design System;
- manter tipagem forte;
- preservar funcionalidades existentes.

Depois:
- revisar o código;
- verificar TypeScript;
- verificar responsividade;
- verificar acessibilidade;
- verificar loading, empty e error states;
- verificar consistência visual.

## 4. Stack

Utilizar:
- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Supabase
- Gemini API

Não adicionar bibliotecas sem necessidade.

## 5. Arquitetura

Preferir:
- Server Components por padrão;
- Client Components somente quando necessários;
- componentes pequenos e reutilizáveis;
- separação entre UI e lógica;
- tipagem forte;
- validação no servidor.

Evitar:
- componentes ou arquivos gigantes;
- lógica de negócio espalhada pela UI;
- duplicação;
- abstrações prematuras;
- `any` sem justificativa.

## 6. Organização

```text
components/
├── ui/
├── common/
└── layout/

features/
├── essays/
├── corrections/
├── dashboard/
└── history/
```

Componentes genéricos ficam em `components`.
Componentes específicos ficam próximos da funcionalidade que utilizam.

## 7. Design System

### Direção visual

O Corrige-Me deve transmitir confiança, clareza, aprendizado, progresso e modernidade.

Estética:
- limpa;
- minimalista;
- profissional;
- amigável;
- consistente;
- com bastante espaço;
- com hierarquia visual clara.

Evitar:
- excesso de gradientes;
- excesso de sombras;
- excesso de bordas;
- cores muito saturadas;
- efeitos sem função;
- interfaces carregadas.

### Cores

Utilizar tokens semânticos:
- `primary`
- `primary-foreground`
- `background`
- `foreground`
- `card`
- `card-foreground`
- `muted`
- `muted-foreground`
- `border`
- `input`
- `ring`
- `success`
- `warning`
- `destructive`
- `info`

A cor primária deve transmitir aprendizado + progresso + confiança.

Preferir:
```tsx
bg-primary
text-primary
bg-muted
text-muted-foreground
border-border
text-destructive
```

Não utilizar cores arbitrárias diretamente nos componentes.

### Tipografia

Priorizar legibilidade.

Hierarquia:
```text
Display
H1
H2
H3
H4
Body
Small
Caption
```

### Espaçamento

Utilizar a escala do Tailwind.
Priorizar consistência, respiro, agrupamento e alinhamento.

### Border Radius

```text
Cards      → rounded-xl
Inputs     → rounded-lg
Buttons    → rounded-lg
Badges     → rounded-full
Dialogs    → rounded-xl
```

### Sombras

Discretas. Utilizar principalmente em elementos elevados, dialogs e dropdowns.

## 8. Componentes

Antes de criar um componente:
1. Verifique se ele já existe.
2. Verifique se existe no shadcn/ui.
3. Reutilize quando possível.
4. Crie um novo somente quando necessário.

### Cards

Tipos principais:
- Metric Card;
- Essay Card;
- Score Card;
- Competency Card;
- Feedback Card;
- Progress Card.

### Buttons

Variantes:
- Primary;
- Secondary;
- Outline;
- Ghost;
- Destructive.

Estados:
- default;
- hover;
- focus;
- active;
- disabled;
- loading.

A ação principal deve utilizar Primary.

### Inputs

Todo input deve possuir label, foco, erro e estado disabled quando aplicável.
Nunca depender apenas de placeholder.

### Editor de redação

Deve possuir:
- área confortável;
- tipografia legível;
- espaçamento generoso;
- contagem de palavras;
- estado de foco;
- estado de salvamento;
- feedback de validação.

## 9. Nota da redação

A nota final deve ser um dos elementos de maior destaque.

```text
760

/ 1000

Boa evolução
```

A nota não deve depender exclusivamente de cores.

## 10. Competências

Cada competência deve apresentar identificação, nota, indicador visual e feedback.

```text
Competência 1

160 / 200

████████████████░░
```

O indicador deve possuir informação textual complementar.

## 11. Feedback

Hierarquia:
- Feedback geral;
- Pontos fortes;
- Pontos de melhoria;
- Como melhorar;
- Exemplo.

Evitar blocos gigantes de texto sem hierarquia.

## 12. Estados

Páginas importantes devem possuir:
- Loading;
- Empty;
- Error;
- Success.

Para operações demoradas, utilizar mensagens claras:
```text
Enviando redação...
Analisando sua redação...
Preparando seu feedback...
```

Empty States devem explicar o estado e indicar o próximo passo.

Error States devem explicar o problema de forma simples e oferecer uma ação quando possível.

## 13. Responsividade

Toda interface deve funcionar em mobile, tablet e desktop.

Mobile:
- uma coluna quando apropriado;
- navegação simplificada;
- botões acessíveis;
- editor confortável;
- sem overflow horizontal.

Tablet:
- aproveitar espaço horizontal;
- duas colunas quando fizer sentido.

Desktop:
- conteúdo centralizado;
- múltiplas colunas quando melhorarem a organização.

## 14. Framer Motion

Utilizar somente quando melhorar a UX.

Priorizar:
- fade;
- slide;
- scale sutil;
- layout transitions;
- feedback de ações;
- entrada de resultados;
- progressão de conteúdo.

Evitar animações constantes, exageradas ou que atrasem a interação.
Respeitar `prefers-reduced-motion`.

## 15. Acessibilidade

Todo componente interativo deve possuir:
- foco visível;
- navegação por teclado;
- nome acessível;
- labels apropriados;
- semântica adequada.

Não utilizar apenas cor para comunicar estados.
Garantir contraste adequado.

## 16. UX

Priorizar:
- clareza;
- poucos passos;
- feedback imediato;
- hierarquia visual;
- estados previsíveis.

Toda ação importante deve fornecer feedback visual.

## 17. IA e Gemini

O Gemini deve ser acessado exclusivamente no servidor.

Nunca:
- expor API keys;
- utilizar secrets em `NEXT_PUBLIC_*`;
- chamar o Gemini diretamente do browser;
- confiar cegamente na resposta da IA.

A resposta da IA deve ser validada antes de ser utilizada.

### Correção

A IA deve analisar:
- Competência 1;
- Competência 2;
- Competência 3;
- Competência 4;
- Competência 5.

A resposta deve ser estruturada:

```ts
{
  totalScore: number,
  competencies: {
    c1: { score: number, feedback: string },
    c2: { score: number, feedback: string },
    c3: { score: number, feedback: string },
    c4: { score: number, feedback: string },
    c5: { score: number, feedback: string }
  },
  strengths: string[],
  improvements: {
    problem: string,
    explanation: string,
    example: string
  }[],
  generalFeedback: string
}
```

O Front-end deve trabalhar com dados estruturados.

### Prompt de correção

Deve:
- possuir critérios claros;
- orientar a avaliação das competências;
- exigir resposta estruturada;
- produzir feedback específico;
- destacar pontos fortes;
- destacar problemas;
- fornecer exemplos;
- manter consistência.

## 18. Segurança

Nunca expor API keys, tokens, credenciais ou secrets.

Utilizar:
- variáveis de ambiente;
- autenticação;
- autorização;
- RLS;
- validação server-side.

Nunca confiar em dados enviados pelo cliente.

## 19. Limite de correções

Cada usuário possui 5 correções por mês.

O limite deve ser validado no servidor.
Nunca confiar no contador enviado pelo Front-end.

O usuário deve visualizar:
- correções utilizadas;
- correções restantes;
- quando o limite será renovado.

## 20. Banco de dados

Estrutura esperada:
```text
profiles
essays
corrections
competencies
monthly_usage
```

Utilizar RLS para impedir acesso aos dados de outros usuários.

## 21. Código

Preferir código simples, legível, tipado, reutilizável e previsível.

Evitar:
- `any`;
- funções gigantes;
- arquivos gigantes;
- código duplicado;
- comentários desnecessários;
- abstrações sem necessidade.

Não reescrever código funcional sem motivo.

## 22. Alterações

Antes de alterar código existente:
1. Entender sua função.
2. Verificar dependências.
3. Verificar onde é utilizado.
4. Alterar somente o necessário.

## 23. Decisões

Quando uma decisão técnica ou de produto importante não estiver definida:
1. Identifique o problema.
2. Explique as opções.
3. Recomende a melhor opção.
4. Aguarde confirmação se a decisão alterar significativamente o produto.

Não inventar requisitos.

## 24. Critério de conclusão

Uma implementação só está concluída quando:
- funciona;
- está tipada;
- está organizada;
- é responsiva;
- possui estados necessários;
- possui acessibilidade básica;
- segue o Design System;
- não quebra funcionalidades existentes;
- não implementa funcionalidades futuras sem solicitação.

Após concluir uma fase:
1. Revise a implementação.
2. Corrija problemas encontrados.
3. Informe o que foi concluído.
4. Indique a próxima fase.

Nunca marque uma tarefa como concluída apenas porque o código foi escrito.
