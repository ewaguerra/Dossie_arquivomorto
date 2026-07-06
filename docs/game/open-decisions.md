# Decisões abertas e roadmap

Itens **não** implementados ou incompletos. Não alterar comportamento do jogo sem gate explícito.

---

## Fases e pistas

| Item | Estado | Notas |
|------|--------|-------|
| Fases 5–6 (Geotecnia, Arquivo superficial) | **Roadmap** narrativo | `layerMinPhase` e títulos existem; `clueCountAdvance` pede 11 e 14 pistas — só há **8** no catálogo |
| 11 / 14 pistas no `clueCountAdvance` | **Roadmap** | Avanço automático para fases 5–6 por coleta ainda inalcançável |
| Conteúdo narrativo fases 2–13 | **Roadmap** | Gates técnicos em `phase-gates.json`; copy e puzzles por fase incompletos (AGENT.md §12.1) |
| Mais registros no Arquivo Morto | **Roadmap** | Além do Registro 001 |

---

## Acessibilidade

| Gate | Objetivo |
|------|----------|
| **A11Y-TABS-A** | Tabs e foco em componentes compartilhados (futuro) |
| **ARG-A11Y-CLUES-A** | `aria-label` / `title` nos `clue-word` usando título do ledger; sem mudar click/registro |

---

## Dados e mapa

| Item | Estado | Notas |
|------|--------|-------|
| POI G5 / pipeline | Em **stash** ou gate pendente — não documentar como entregue |
| PMTiles offline Brasil | **Roadmap** / fora de scope — `docs/offline-scope.md` |
| `04a_zeis2__polygon` cidade inteira | Só clip viewport (5 polígonos) — ver AGENT.md §12.1 |
| `map-icons.js` só via manifest (E-02) | **DEFER** — sync manual hoje |

---

## Engenharia

| Item | Estado | Notas |
|------|--------|-------|
| Split `tests/sanity.test.js` | **Roadmap** — ficheiro grande (~2k linhas) |
| `centro-runtime.js` / `arquivista/js/script.js` | Dívida tolerada — extrações parciais feitas |
| Playwright E2E browser | Opcional — smoke HTTP + manual cobrem regressões críticas |

---

## Documentação

| Item | Estado |
|------|--------|
| **GAME-DOCS-A** (esta pasta) | Entregue neste gate |
| Sincronizar copy da landing com fase actual | Revisão futura quando fases 5–6 tiverem conteúdo |

---

## O que não reabrir sem gate

- Senhas narrativas (`apoio`, `marco zero`) — design intencional.
- Três nomes por pista (ID / clicável / ledger) — ver [clues.md](./clues.md).
- IDs públicos em `protocolo13_caderno_clues` — decisão CAPRI já tomada (AGENT.md §5.3).
