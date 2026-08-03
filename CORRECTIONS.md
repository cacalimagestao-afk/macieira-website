# CORRECTIONS.md — Auditoria Macieira Consultoria

Auditoria completa de todos os 21 arquivos `.ts` / `.tsx` em `src/`.
Todos os erros abaixo foram **verificados empiricamente** (`npx tsc --noEmit`, `npx tailwindcss`), não apenas por leitura.

## Resumo

| Severidade | Qtd | Efeito |
|---|---|---|
| **P0 — Bloqueia compilação** | 10 | `npm run dev` quebra |
| **P1 — Erro de tipo latente** | 1 | Aparece só após corrigir os P0 |
| **P2 — Bug funcional / visual** | 8 | Compila, mas errado |

**Estado atual: 43 erros de sintaxe TypeScript + 1 falha fatal de build CSS + 1 módulo inexistente.**

### Causa raiz dominante
Dois padrões explicam 9 dos 10 P0:
1. **6 arquivos foram truncados na gravação** — terminam no meio de uma linha, sem tags de fechamento.
2. **3 tags `<a` perderam o token de abertura** — sobrou só a lista de atributos solta.

### Arquivos SEM erros (7)
`src/app/page.tsx`, `src/app/layout.tsx`, `src/components/common/Logo.tsx`, `src/components/common/ServiceCard.tsx`, `src/components/common/TestimonialCard.tsx`, `src/components/sections/ServicesGrid.tsx`, `src/components/sections/Testimonials.tsx`, `src/lib/types.ts`, `src/lib/config.ts`, `src/lib/validation.ts`, `src/lib/api-client.ts`

---

# P0 — ERROS QUE BLOQUEIAM A COMPILAÇÃO

## P0-1 — `src/lib/rate-limit.ts` NÃO EXISTE

**Arquivos afetados:** `src/app/api/contact/route.ts` linha 3, `src/app/api/newsletter/route.ts` linha 3

```
error TS2307: Cannot find module '@/lib/rate-limit' or its corresponding type declarations.
```

> **Nota importante:** este erro **não aparece** quando você roda `npx tsc --noEmit` no projeto inteiro hoje, porque os erros de sintaxe JSX abortam a fase semântica. Ele só surge depois de corrigir os P0 de JSX. Não se engane achando que sumiu.

As duas rotas chamam `checkRateLimit(ip, 'contactForm')` e esperam `{ allowed: boolean }`. `RATE_LIMITS` já existe em `config.ts` com as chaves `contactForm` e `newsletter`.

**Correção — criar `src/lib/rate-limit.ts`:**

```ts
import { RATE_LIMITS } from '@/lib/config';

type RateLimitKey = keyof typeof RATE_LIMITS;

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

/**
 * Rate limit em memória, por processo.
 * ATENÇÃO: não sobrevive a restart nem funciona em serverless multi-instância.
 * Para produção, trocar por Redis/Upstash ou tabela no Supabase.
 */
const store = new Map<string, RateLimitEntry>();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export function checkRateLimit(ip: string, key: RateLimitKey): RateLimitResult {
  const { maxRequests, windowMs } = RATE_LIMITS[key];
  const now = Date.now();
  const storeKey = `${key}:${ip}`;
  const entry = store.get(storeKey);

  if (!entry || now >= entry.resetAt) {
    const resetAt = now + windowMs;
    store.set(storeKey, { count: 1, resetAt });
    return { allowed: true, remaining: maxRequests - 1, resetAt };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count += 1;
  store.set(storeKey, entry);
  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    resetAt: entry.resetAt,
  };
}
```

---

## P0-2 — `globals.css` quebra o build do Tailwind (FALHA FATAL)

**Arquivo:** `src/app/globals.css` linha 43

Verificado com `npx tailwindcss -i src/app/globals.css -o /tmp/out.css`:

```
CssSyntaxError: tailwindcss: src/app/globals.css:43:5:
The `bg-brand-gray-light` class does not exist.
```

Linha 43 atual:
```css
@apply bg-brand-gray-light backdrop-blur-xs border border-brand-gray-light rounded-xl p-6 transition-all duration-300 hover:shadow-gold;
```

**Dois defeitos na mesma linha:**
1. `bg-brand-gray-light` não existe — ver P0-3 (config usa `gray_light` com underscore).
2. `backdrop-blur-xs` não existe no **Tailwind v3** (o projeto usa `tailwindcss ^3.4.1`). O valor `xs` só foi introduzido no v4. No v3 o menor é `backdrop-blur-sm`.

**Correção (linha 43)** — aplicar **junto** com P0-3, senão continua falhando:
```css
    @apply bg-brand-gray-light backdrop-blur-sm border border-brand-gold/10 rounded-xl p-6 transition-all duration-300 hover:shadow-gold;
```

> Troquei também a borda de `border-brand-gray-light` para `border-brand-gold/10`: a borda tinha exatamente a mesma cor do fundo do card, ou seja, era invisível.

---

## P0-3 — `tailwind.config.ts`: chaves com `_` em vez de `-`

**Arquivo:** `tailwind.config.ts` linhas 13–21

O Tailwind gera o nome da classe concatenando as chaves aninhadas com `-`. A chave `gold_light` gera a classe `brand-gold_light`, **não** `brand-gold-light`.

Todos os componentes usam a forma com hífen. Resultado: **toda classe `-light`, `-dark` e `-muted` do projeto não gera CSS nenhum.**

Ocorrências quebradas hoje (contagem por classe):
- `text-brand-text-muted` — usada em 9 arquivos (todo o texto de corpo do site fica sem cor)
- `bg-brand-gray-light` — `globals.css`, `ContactForm`, `NewsletterForm`
- `hover:text-brand-gold-light` — `Header`, `ServiceCard`
- `brand-green-light`, `brand-gold-dark` — definidas e nunca utilizáveis

**Correção — substituir o bloco `brand` (linhas 10–23) por:**

```ts
        brand: {
          black: '#0a0a0a',
          white: '#ffffff',
          gold: '#c9a961',
          'gold-light': '#e8d5b5',
          'gold-dark': '#9d8555',
          green: '#1a3d3a',
          'green-light': '#2d5a52',
          red: '#8b4545',
          gray: '#1a1a1a',
          'gray-light': '#2d2d2d',
          text: '#e8e8e8',
          'text-muted': '#a0a0a0',
        },
```

---

## P0-4 — `Header.tsx`: tag `<a` sem abertura

**Arquivo:** `src/components/Header.tsx` linha 30

```
(33,13): error TS1382: Unexpected token. Did you mean `{'>'}` or `&gt;`?
(35,15): error TS17002: Expected corresponding JSX closing tag for 'div'.
```

Linhas 30–35 atuais — o `<a` sumiu, sobraram os atributos soltos:
```jsx
            
              href="#contato"
              className="btn-gold text-sm"
            >
              Contato
            </a>
```

**Correção — substituir as linhas 30–35 por:**
```jsx
            <a
              href="#contato"
              className="btn-gold text-sm"
            >
              Contato
            </a>
```

---

## P0-5 — `Hero.tsx`: DUAS tags `<a` sem abertura

**Arquivo:** `src/components/sections/Hero.tsx` linhas 35 e 45

```
(8,5):   error TS2657: JSX expressions must have one parent element.
(40,11): error TS1382: Unexpected token. Did you mean `{'>'}` or `&gt;`?
(48,11): error TS1382: Unexpected token. Did you mean `{'>'}` or `&gt;`?
```

**Correção A — linhas 35–40**, atual:
```jsx
          
            href={SITE_CONFIG.calendlyUrl}
```
para:
```jsx
          <a
            href={SITE_CONFIG.calendlyUrl}
```

**Correção B — linhas 45–48**, atual:
```jsx
          
            href="#contato"
```
para:
```jsx
          <a
            href="#contato"
```

**Correção C — linha 3:** `import Link from 'next/link'` não é usado neste arquivo. Remover.

---

## P0-6 — `Footer.tsx` TRUNCADO (termina no meio da linha 28)

**Arquivo:** `src/components/Footer.tsx`

```
(5,6):  error TS17008: JSX element 'footer' has no corresponding closing tag.
(29,1): error TS1002: Unterminated string literal.
```

O arquivo acaba literalmente em `<h3 className="text-lg font-bold` — string aberta, 3 `<div>` e `<footer>` sem fechar.

**Correção — substituir a linha 28 (última linha do arquivo) por:**

```jsx
            <h3 className="text-lg font-bold text-brand-white mb-4">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-brand-text-muted hover:text-brand-gold transition"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone.replace(/\D/g, '')}`}
                  className="text-brand-text-muted hover:text-brand-gold transition"
                >
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-gold hover:text-brand-gold-light transition"
                >
                  Agendar consulta
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-gold/10 pt-8 text-center">
          <p className="text-brand-text-muted text-xs">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
```

---

## P0-7 — `DmaitStep.tsx` TRUNCADO (falta fechamento)

**Arquivo:** `src/components/common/DmaitStep.tsx`

```
(18,6): error TS17008: JSX element 'div' has no corresponding closing tag.
(36,1): error TS1005: '</' expected.
```

O arquivo termina em `</p>` (linha 35). Faltam o `</div>`, o `)` e o `}`.

**Correção — acrescentar ao final do arquivo, após a linha 35:**
```jsx
    </div>
  )
}
```

---

## P0-8 — `ContactForm.tsx` TRUNCADO + campos obrigatórios ausentes

**Arquivo:** `src/components/forms/ContactForm.tsx`

```
(35,6): error TS17008: JSX element 'form' has no corresponding closing tag.
(90,1): error TS1005: '/' expected.
```

O arquivo termina em `<label` (linha 89), sem fechar nada.

> **Além do erro de sintaxe, há um bug funcional grave:** o `contactFormSchema` exige `subject` (min 3) e `message` (min 20), mas o formulário **não tem esses campos**. Mesmo consertando as tags, o formulário nunca passaria na validação — o usuário clicaria em "Enviar" e nada aconteceria, sem mensagem de erro visível.

**Correção — substituir as linhas 88–89 (o `<div>` incompleto do fim) por:**

```jsx
      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-brand-white mb-2">
          Assunto *
        </label>
        <input
          {...register('subject')}
          type="text"
          id="subject"
          placeholder="Sobre o que deseja falar?"
          className="w-full px-4 py-3 bg-brand-gray-light border border-brand-gold/20 rounded-lg text-brand-white placeholder-brand-text-muted focus:outline-none focus:border-brand-gold transition-colors"
        />
        {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-brand-white mb-2">
          Mensagem *
        </label>
        <textarea
          {...register('message')}
          id="message"
          rows={5}
          placeholder="Conte um pouco sobre o desafio da sua empresa (mínimo 20 caracteres)"
          className="w-full px-4 py-3 bg-brand-gray-light border border-brand-gold/20 rounded-lg text-brand-white placeholder-brand-text-muted focus:outline-none focus:border-brand-gold transition-colors resize-y"
        />
        {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
      </div>

      <div className="flex items-start gap-3">
        <input
          {...register('scheduleConsultation')}
          type="checkbox"
          id="scheduleConsultation"
          className="mt-1 h-4 w-4 rounded border-brand-gold/40 bg-brand-gray-light accent-brand-gold"
        />
        <label htmlFor="scheduleConsultation" className="text-sm text-brand-text-muted">
          Quero agendar uma consulta inicial gratuita
        </label>
      </div>

      <button type="submit" disabled={isLoading} className="btn-gold w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
        {isLoading ? 'Enviando...' : 'Enviar Mensagem'}
      </button>
    </form>
  )
}
```

> Aproveitei para adicionar os `id` que faltavam nos campos — os `htmlFor` dos labels já existentes (`name`, `email`, `company`, `phone`) não apontavam para nada, quebrando acessibilidade. Adicione `id="name"`, `id="email"`, `id="company"`, `id="phone"` nos respectivos `<input>` das linhas 40, 53, 66 e 79.

---

## P0-9 — `NewsletterForm.tsx` TRUNCADO

**Arquivo:** `src/components/forms/NewsletterForm.tsx`

```
(38,6): error TS17008: JSX element 'form' has no corresponding closing tag.
(50,1): error TS1005: '</' expected.
```

Termina na linha 49, sem fechar o `<div>` nem o `<form>`, e sem o botão de submit.

**Correção — acrescentar ao final do arquivo, após a linha 49:**

```jsx
      </div>

      <div className="flex items-start gap-3">
        <input
          {...register('sendGuide')}
          type="checkbox"
          id="sendGuide"
          className="mt-1 h-4 w-4 rounded border-brand-gold/40 bg-brand-gray-light accent-brand-gold"
        />
        <label htmlFor="sendGuide" className="text-sm text-brand-text-muted">
          Quero receber o guia gratuito por e-mail
        </label>
      </div>

      <button type="submit" disabled={isLoading} className="btn-gold w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
        {isLoading ? 'Enviando...' : 'Quero Receber'}
      </button>
    </form>
  )
}
```

> Adicionar também `id="email"` no `<input>` da linha 43.

---

## P0-10 — `ContactSection.tsx` TRUNCADO com comentário JSX ABERTO

**Arquivo:** `src/components/sections/ContactSection.tsx` linha 34

```
(34,12): error TS1109: Expression expected.
(35,1):  error TS1005: '</' expected.
(35,1):  error TS1010: '*/' expected.
```

Este é o **comentário JSX malformado** do projeto: a linha 34 abre `{/*` e o arquivo acaba ali. Sem `*/}`, o parser consome o resto do arquivo como comentário e nunca acha o fim.

**Correção — substituir a linha 34 (última do arquivo) por:**

```jsx
          {/* Newsletter */}
          <div className="card border-brand-gold/20">
            <h3 className="text-xl font-bold text-brand-white mb-2">Guia Gratuito</h3>
            <p className="text-brand-text-muted text-sm mb-6">
              Receba nosso guia de diagnóstico financeiro direto no seu e-mail.
            </p>
            <NewsletterForm />
          </div>

          {/* Contato direto */}
          <div className="card border-brand-gold/20">
            <h3 className="text-xl font-bold text-brand-white mb-6">Fale Direto</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <span className="block text-brand-text-muted mb-1">E-mail</span>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-brand-gold hover:text-brand-gold-light transition break-all"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <span className="block text-brand-text-muted mb-1">Telefone</span>
                <a
                  href={`tel:${SITE_CONFIG.phone.replace(/\D/g, '')}`}
                  className="text-brand-gold hover:text-brand-gold-light transition"
                >
                  {SITE_CONFIG.phone}
                </a>
              </li>
            </ul>
            <a
              href={SITE_CONFIG.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline w-full justify-center mt-8"
            >
              Agendar Consulta
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

## P0-11 — `DmaitMethod.tsx` TRUNCADO

**Arquivo:** `src/components/sections/DmaitMethod.tsx`

```
(6,6):  error TS17008: JSX element 'section' has no corresponding closing tag.
(59,1): error TS1005: '</' expected.
```

A linha 58 abre a `<div>` da tagline e o arquivo termina.

**Correção — acrescentar ao final do arquivo, após a linha 58:**

```jsx
          <p className="text-lg text-brand-white font-semibold mb-2">
            Do diagnóstico ao resultado sustentado.
          </p>
          <p className="text-brand-text-muted text-sm">
            Cada etapa com entregáveis claros, responsáveis definidos e indicadores acompanhados.
          </p>
        </div>
      </div>
    </section>
  )
}
```

---

# P1 — ERRO DE TIPO QUE SÓ APARECE DEPOIS DOS P0

## P1-1 — Incompatibilidade zod v4 + `@hookform/resolvers` v5 em campos com `.default()`

**Arquivos:** `src/components/forms/ContactForm.tsx` linha 17-19, `src/components/forms/NewsletterForm.tsx` linha 17-22

Reproduzido em arquivo isolado:
```
error TS2322: Type 'Resolver<{ ...; scheduleConsultation?: boolean | undefined; }, any, ...>'
is not assignable to type 'Resolver<{ ...; scheduleConsultation: boolean; }, any, ...>'.
  Type 'boolean | undefined' is not assignable to type 'boolean'.
```

**Causa:** no zod v4, `.default(false)` faz o tipo de **entrada** ser `boolean | undefined` e o de **saída** `boolean`. `ContactFormInput = z.infer<...>` resolve para o tipo de **saída**, mas o `useForm<T>` precisa do tipo de **entrada**. Mesmo problema em `sendGuide` no `NewsletterForm`.

**Correção (recomendada) — em `src/lib/validation.ts`, linhas 60–61:**

```ts
export type ContactFormInput = z.input<typeof contactFormSchema>;
export type NewsletterFormInput = z.input<typeof newsletterFormSchema>;

/** Tipos já validados/normalizados — usar nas rotas de API. */
export type ContactFormOutput = z.output<typeof contactFormSchema>;
export type NewsletterFormOutput = z.output<typeof newsletterFormSchema>;
```

`z.input` é o tipo correto para o formulário; `z.output` é o que as rotas de API recebem depois do `.parse()`.

---

# P2 — BUGS FUNCIONAIS E VISUAIS (compilam, mas estão errados)

## P2-1 — Ícones do DMAIC nunca aparecem
**`src/components/common/DmaitStep.tsx` linhas 9–15 vs `src/lib/config.ts` linhas 54–90**

`DMAIC_STEPS` fornece **caminhos de SVG** (`'/images/dmaic-icons/definir.svg'`), mas `DmaitStep` usa o valor como chave de um `Record` de emojis (`target`, `ruler`, ...). Nenhuma chave bate → **as 5 etapas mostram o fallback `✨`**.

**Correção** — decidir por uma das duas. Usando os SVGs que o config já referencia, substituir as linhas 9–15 e o bloco do ícone (linhas 24–27) por:

```jsx
      {/* Icon */}
      <div className="mb-4 group-hover:scale-125 transition-transform duration-300">
        <img src={icon} alt="" aria-hidden="true" className="w-12 h-12" />
      </div>
```
(e remover o `Record iconEmoji` das linhas 9–15, que fica sem uso)

> Confirme que os 5 arquivos existem em `public/images/dmaic-icons/`. Se não existirem, mude os `icon` do `config.ts` para as chaves de emoji (`'target'`, `'ruler'`, `'magnifying-glass'`, `'trending-up'`, `'shield-check'`) e mantenha o `Record`.

## P2-2 — Ícones dos serviços nunca aparecem
**`src/components/common/ServiceCard.tsx` linhas 9–13 vs `src/lib/config.ts`**

`SERVICES` usa `'search'`, `'coins'`, `'target'`. O `Record` do `ServiceCard` só conhece `'magnifying-glass'`, `'chart-line'`, `'shield-check'`. **Os 3 cards mostram `✨`.**

**Correção — substituir as linhas 9–13 por:**
```ts
  const iconEmoji: Record<string, string> = {
    search: '🔍',
    coins: '🪙',
    target: '🎯',
  }
```

## P2-3 — `bg-gradient-dark` não existe
**`src/components/sections/Hero.tsx` linha 10**

A classe não está no `tailwind.config.ts` (que define só `gradient-gold`, `gradient-hero`, `gradient-accent`) nem no `globals.css`. O fundo do Hero fica sem gradiente.

**Correção** — usar a que existe:
```jsx
      <div className="absolute inset-0 bg-gradient-hero"></div>
```
ou adicionar em `tailwind.config.ts` → `backgroundImage`:
```ts
        'gradient-dark': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
```

## P2-4 — Logo invisível
**`src/components/common/Logo.tsx` linha 5**

`text-brand-black` (#0a0a0a) sobre o header `bg-brand-black/80` — texto preto em fundo preto.

**Correção:** trocar `text-brand-black` por `text-brand-white`.

## P2-5 — Tratamento de erro de validação nunca dispara
**`src/app/api/contact/route.ts` linha 31, `src/app/api/newsletter/route.ts` linha 31**

```ts
if (error instanceof Error && error.message.includes('Validation error'))
```
`ZodError` nunca tem essa string na mensagem. Toda falha de validação retorna **500** em vez de **400**.

**Correção — nos dois arquivos:**
```ts
import { ZodError } from 'zod'
// ...
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: 'Dados inválidos', errors: error.issues },
        { status: 400 }
      )
    }
```

## P2-6 — `validatedData` declarado e nunca usado
**`src/app/api/contact/route.ts` linha 21, `src/app/api/newsletter/route.ts` linha 21**

Sinaliza o TODO pendente (persistir no Supabase / enviar via SendGrid). Sem `noUnusedLocals` não quebra o build, mas é código morto — deixar o TODO explícito ou consumir a variável.

## P2-7 — `api-client.ts` sem tipagem
**`src/lib/api-client.ts` linhas 1 e 18**

`data: any` anula a validação de tipo entre formulário e API.

**Correção:**
```ts
import type { ContactFormInput, NewsletterFormInput } from '@/lib/validation'
import type { ApiResponse } from '@/lib/types'

export const submitContactForm = async (data: ContactFormInput): Promise<ApiResponse> => { ... }
export const submitNewsletterForm = async (data: NewsletterFormInput): Promise<ApiResponse> => { ... }
```

## P2-8 — Avisos do `next lint`
- **`TestimonialCard.tsx` linha 24:** `"{quote}"` viola `react/no-unescaped-entities` (regra de **erro** no `eslint-config-next`). Trocar por `&ldquo;{quote}&rdquo;`.
- **`Logo.tsx` l.4, `TestimonialCard.tsx` l.35:** `<img>` em vez de `next/image` → aviso `@next/next/no-img-element`.
- **Imports não utilizados:** `SITE_CONFIG` em `Footer.tsx` l.1 (passa a ser usado com a correção P0-6), `Link` em `Hero.tsx` l.3 (remover), `SITE_CONFIG` em `Header.tsx` l.5 (remover — o Header não o usa).

---

# Ordem de execução recomendada

1. **P0-3** (`tailwind.config.ts`) e **P0-2** (`globals.css`) — juntos, senão o CSS continua falhando.
2. **P0-1** — criar `src/lib/rate-limit.ts`.
3. **P0-4, P0-5** — restaurar as 3 tags `<a`.
4. **P0-6 … P0-11** — completar os 6 arquivos truncados.
5. **P1-1** — trocar `z.infer` por `z.input` em `validation.ts`.
6. **P2-*** — bugs funcionais.

# Verificação final

```bash
npx tsc --noEmit          # deve sair sem nenhuma linha
npx tailwindcss -i src/app/globals.css -o /tmp/out.css   # deve compilar sem CssSyntaxError
npm run lint
npm run dev
```

> `npx tsc --noEmit` **precisa** ser rodado de novo após cada etapa: enquanto houver erro de sintaxe, o TypeScript não executa a checagem semântica e erros como o P0-1 e o P1-1 ficam escondidos.

# Limpeza opcional (raiz do projeto)
Artefatos que não deveriam estar versionados: `ztest`, `ztest2` (vazios), `next.config.mjs.bak`, `tsconfig.tsbuildinfo`, `.git-broken/`.
