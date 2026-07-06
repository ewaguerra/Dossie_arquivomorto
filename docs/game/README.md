# Documentação do jogo — Anhangabaú: O Arquivo dos Soterrados

Documentação narrativa, técnica e operacional do ARG **PROTOCOLO 13 ALMAS**. Descreve o que está implementado hoje — não substitui `AGENT.md` (convenções de código) nem análises CAPRI externas.

## O que é o projeto

**Anhangabaú: O Arquivo dos Soterrados** é uma experiência transmídia web-only (sem backend, sem login): ficção interativa, cartografia forense e horror urbano sobre o centro soterrado de São Paulo. O jogador investiga em quatro superfícies que compartilham estado via `localStorage`.

## Superfícies do ARG

| Ordem | Superfície | Rota | Função resumida |
|------|------------|------|-----------------|
| 0 | Landing | `/landing/` | Portal, pitch, gate teatral de acesso |
| 1 | Arquivo Morto | `/arquivo-morto/` | Blog forense; pistas clicáveis → Caderno |
| 2 | Arquivista | `/arquivista/` | Desktop simulado; ponte para o mapa |
| 3 | Centro | `/centro/` | Mapa MapLibre; camadas, fases, POIs |

A raiz `/` redireciona para `/landing/`. Posts avulsos: `arquivo-morto/posts/*.html`.

## Como o ARG se distribui

```text
Landing (entrada)
    ↓
Arquivo Morto (coleta pistas → protocolo13_caderno_clues)
    ↓                    ↘
Centro (mapa, fases, camadas) ← Arquivista (GeoScanner → /centro/?clues=…)
```

- **Narrativa longa** vive no Arquivo Morto (texto, `clue-word`, anexos).
- **Evidência cartográfica** vive no Centro (GeoJSON, sidebar, POIs, pistas Rua São Bento).
- **Arquivista** é superfície paralela/investigativa (CLI, janelas); não substitui o Caderno do blog.

## Três vocabulários por pista

Cada pista do Arquivo Morto pode ter três nomes distintos (decisão intencional):

| Camada | Quem usa | Exemplo |
|--------|----------|---------|
| `data-clue-id` | código, testes, `localStorage` | `comercio-velho` |
| Texto clicável | jogador no artigo | centro geométrico |
| Título no Caderno | ledger / UI do Caderno | Centro Geométrico do Comércio Velho |

Regra: **documentação para jogador usa texto clicável**; nunca instrua o jogador a procurar um `data-clue-id` na tela. Detalhes em [clues.md](./clues.md).

## Ordem sugerida de leitura

1. [surfaces.md](./surfaces.md) — papel de cada superfície
2. [arg-model.md](./arg-model.md) — pistas, fases, desbloqueios, deep-links
3. [clues.md](./clues.md) — catálogo das 8 pistas (referência canónica)
4. [player-flow.md](./player-flow.md) — jornada do jogador ponta a ponta
5. [manual-smoke.md](./manual-smoke.md) — verificação humana pós-alteração
6. [glossary.md](./glossary.md) — termos
7. [open-decisions.md](./open-decisions.md) — roadmap e gates futuros

## Relação com outros docs do repo

| Documento | Conteúdo |
|-----------|----------|
| [../README.md](../README.md) | Índice geral da documentação técnica |
| [../../AGENT.md](../../AGENT.md) | Convenções de implementação e DoD |
| [../testing/smoke-centro.md](../testing/smoke-centro.md) | Smoke focado no mapa (complementar) |
| [../architecture/map-init-flow.md](../architecture/map-init-flow.md) | Ordem de boot do Centro |

## Legenda usada nesta pasta

- **Implementado** — comportamento presente no código/dados versionados.
- **Interpretação narrativa** — leitura do texto do jogo, não regra de engine.
- **Roadmap** — planejado; gates técnicos podem existir sem conteúdo completo.
