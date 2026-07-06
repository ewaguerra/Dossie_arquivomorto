# Catálogo de pistas — Arquivo Morto

**Implementado:** 8 pistas em `arquivo-morto/data/pistas.json`, botões em `arquivo-morto/index.html` (Registro 001).

## Regra de ouro

> Uma pista possui três nomes:  
> o ID que o código usa,  
> a palavra que o jogador clica,  
> e o título que o Caderno revela.  
> **Nunca use o ID técnico como instrução para o jogador.**

| Audiência | Usar |
|-----------|------|
| Jogador / smoke manual / tutorial | **texto clicável** |
| Código / testes / `localStorage` | `data-clue-id` |
| Caderno (ledger) | **título** em `pistas.json` |

## Eco redundante

Vários `data-clue-id` aparecem em **mais de um** botão no mesmo artigo. **Implementado** — um clique basta; todos os nós com o mesmo ID marcam `is-collected`. Não é duplicação acidental.

---

## `peso-fundacao`

| Campo | Valor |
|-------|--------|
| **data-clue-id** | `peso-fundacao` |
| **Texto(s) clicável(is)** | pesa · fundação · fundações |
| **Título no Caderno** | Fundações de Agonia |
| **Categoria** | mecanica |
| **REQUIRED_CLUE** | Sim (1 de 4 para conclusão do Registro 001) |
| **Desbloqueia camada** | Sim — `03_eixo_existente__polygon`, `03a_eixo_previsto__polygon` |
| **Observação** | ID fala em “peso”; botões usam pesa/fundação. Visão subterrânea no Centro também exige esta pista (conjunto de 3). |

---

## `aresta-fria`

| Campo | Valor |
|-------|--------|
| **data-clue-id** | `aresta-fria` |
| **Texto(s) clicável(is)** | Aresta Fria |
| **Título no Caderno** | Rua São Bento — Aresta Fria |
| **Categoria** | local |
| **REQUIRED_CLUE** | Sim |
| **Desbloqueia camada** | Não em `layer-unlocks.json` |
| **Observação** | Parágrafo nomeia “Rua São Bento” em destaque; botão é “Aresta Fria”. Conclusão do post manda abrir o mapa e procurar a rua. |

---

## `aurora-maloca`

| Campo | Valor |
|-------|--------|
| **data-clue-id** | `aurora-maloca` |
| **Texto(s) clicável(is)** | Rua Aurora · Foi engolida |
| **Título no Caderno** | O Soterramento da Aurora |
| **Categoria** | evento |
| **REQUIRED_CLUE** | Sim |
| **Desbloqueia camada** | Não em `layer-unlocks.json` |
| **Observação** | Dois ecos narrativos no mesmo arco (rua → soterramento). |

---

## `agua-calada`

| Campo | Valor |
|-------|--------|
| **data-clue-id** | `agua-calada` |
| **Texto(s) clicável(is)** | águas · subsolo · água · água que tentaram calar |
| **Título no Caderno** | Hidrografia Silenciada |
| **Categoria** | entidade |
| **REQUIRED_CLUE** | Sim |
| **Desbloqueia camada** | Sim — `05_hidrografia_rios__line`, `17_alagamentos_contexto_hidrografico__point`, `centro_rios_geosampa__line`, `centro_area_inundavel__polygon` |
| **Observação** | Quatro entradas visuais; smoke técnico costuma usar `?clues=agua-calada` para hidrografia. |

---

## `nao-olhe-alto`

| Campo | Valor |
|-------|--------|
| **data-clue-id** | `nao-olhe-alto` |
| **Texto(s) clicável(is)** | alto |
| **Título no Caderno** | Distração Vertical |
| **Categoria** | mecanica |
| **REQUIRED_CLUE** | Não |
| **Desbloqueia camada** | Não em `layer-unlocks.json` |
| **Observação** | Frase: “Mas o **alto** é só distração.” Não diga ao jogador “não olhe alto” — esse texto não é botão. Título do post (“Não olhe para o céu”) é tema, não clue. |

---

## `sob-solas`

| Campo | Valor |
|-------|--------|
| **data-clue-id** | `sob-solas` |
| **Texto(s) clicável(is)** | sob nossas solas · calçada |
| **Título no Caderno** | Sob Nossas Solas |
| **Categoria** | mecanica |
| **REQUIRED_CLUE** | Não |
| **Desbloqueia camada** | Não em `layer-unlocks.json` |
| **Observação** | Eco intencional: chão sob os pés vs calçada inocente. |

---

## `comercio-velho`

| Campo | Valor |
|-------|--------|
| **data-clue-id** | `comercio-velho` |
| **Texto(s) clicável(is)** | centro geométrico |
| **Título no Caderno** | Centro Geométrico do Comércio Velho |
| **Categoria** | local |
| **REQUIRED_CLUE** | Não |
| **Desbloqueia camada** | Não em `layer-unlocks.json` |
| **Observação** | “comércio velho” aparece na frase, mas **não** é clicável — só **centro geométrico**. |

---

## `guardiao-tampa`

| Campo | Valor |
|-------|--------|
| **data-clue-id** | `guardiao-tampa` |
| **Texto(s) clicável(is)** | guardião da tampa |
| **Título no Caderno** | Guardião da Tampa |
| **Categoria** | local |
| **REQUIRED_CLUE** | Não |
| **Desbloqueia camada** | Sim — `centro_arquivo_superficial__point` (também exige **fase 6** — ver [arg-model.md](./arg-model.md)) |
| **Observação** | Caso raro em que ID, texto clicável e título do ledger estão alinhados. Parágrafo: “Procure o guardião da tampa.” |

---

## Resumo para instruções humanas

```text
Clicar no Arquivo Morto (texto visível):

pesa | fundação | fundações
Aresta Fria
Rua Aurora | Foi engolida
águas | subsolo | água | água que tentaram calar
alto
sob nossas solas | calçada
centro geométrico
guardião da tampa
```

Confirmar no Caderno pelo **título** da tabela acima, não pelo ID.

## A11Y (roadmap)

**Implementado hoje:** botões sem `aria-label` nem `title`; `data-secret-locked` para mensagem de bloqueio/hover interno.

**Roadmap:** gate `ARG-A11Y-CLUES-A` — `aria-label` / `title` descritivos sem mudar comportamento. Ver [open-decisions.md](./open-decisions.md).
