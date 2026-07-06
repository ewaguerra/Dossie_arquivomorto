# Smoke manual — linguagem humana

Checklist para operadores e escritores. Complementa [../testing/smoke-centro.md](../testing/smoke-centro.md) (foco técnico no mapa).

## Pré-requisitos

```bash
npm run ci
python3 server.py
```

Abrir **http://127.0.0.1:8080/** (ou host usado no ambiente).

---

## Arquivo Morto — `/arquivo-morto/`

### Regra

Clicar nos **textos visíveis** dos botões `clue-word`, **não** nos IDs técnicos. Confirmar no **ledger** pelo título narrativo.

### Checklist de pistas (Registro 001)

| Clicar (texto visível) | Confirmar no Caderno |
|------------------------|----------------------|
| pesa, fundação ou fundações | Fundações de Agonia |
| Aresta Fria | Rua São Bento — Aresta Fria |
| Rua Aurora ou Foi engolida | O Soterramento da Aurora |
| águas, subsolo, água ou água que tentaram calar | Hidrografia Silenciada |
| alto | Distração Vertical |
| sob nossas solas ou calçada | Sob Nossas Solas |
| centro geométrico | Centro Geométrico do Comércio Velho |
| guardião da tampa | Guardião da Tampa |

### Conclusão narrativa

| # | Verificação | OK |
|---|-------------|-----|
| 1 | Após 4 pistas obrigatórias (Fundações, Aresta, Aurora, Hidrografia), bloco de conclusão aparece | ☐ |
| 2 | Link “Abrir MapLibre” leva a `/centro/` | ☐ |
| 3 | Recarregar página mantém pistas coletadas (`protocolo13_caderno_clues`) | ☐ |

Referência completa: [clues.md](./clues.md).

---

## Centro — `/centro/`

| # | Verificação | OK |
|---|-------------|-----|
| 1 | Console sem erros vermelhos de JS | ☐ |
| 2 | Sidebar lista grupos após load do mapa | ☐ |
| 3 | Badge de fase visível (`#centro-phase-badge`) | ☐ |
| 4 | Camada hidro bloqueada sem pista; após coletar água no blog (ou `?clues=agua-calada`), desbloqueia | ☐ |
| 5 | `centro_arquivo_superficial__point`: exige **guardião da tampa** + **fase 6** | ☐ |
| 6 | OP:* (TRIÂNGULO, SÉ, …) fazem flyTo | ☐ |
| 7 | POIs patrimoniais e popup ao clique | ☐ |
| 8 | Pistas Rua São Bento no mapa (layer symbol) | ☐ |
| 9 | **Matriz de Endereçamento** — camada context em `context-layers.json`; carregar sob demanda na sidebar (OSM endereços) | ☐ |
| 10 | `#sidebar-toggle` / tecla `S` | ☐ |

Detalhe técnico: [../testing/smoke-centro.md](../testing/smoke-centro.md).

### Atalhos QA (não são instrução de jogador)

```text
/centro/?clues=agua-calada,guardiao-tampa
/centro/?phase=6
/centro/?debug=1
```

---

## Arquivista — `/arquivista/`

| # | Verificação | OK |
|---|-------------|-----|
| 1 | Boot com senha marco zero | ☐ |
| 2 | GeoScanner abre Centro; se houver caderno, URL inclui `?clues=` | ☐ |

---

## Console — o que bloqueia vs aviso

### Erros críticos (bloqueiam smoke)

- Excepções não tratadas (vermelho) no load do Centro ou Arquivo Morto.
- Fetch **4xx/5xx** para assets do próprio servidor: `centro-runtime.js`, GeoJSON em `centro/data/`, `pistas.json`, catálogo JSON.
- Mapa sem init por falha de script (sidebar vazia, mapa preto **com** rede OK).

### Avisos conhecidos (geralmente não bloqueantes)

- `[CENTRO] Camada building-3d indisponível no estilo atual` — se estilo não expõe extrusão.
- Avisos de tile/basemap **sem rede** — OpenFreeMap online; app local continua servido ([../offline-scope.md](../offline-scope.md)).
- `[CENTRO] Debug inspector ativo` — só com `?debug=1`.
- `[ARQUIVO-MORTO] clue inválido` — só se HTML tiver `data-clue-id` órfão (contrato ARG-CLUE-CONTRACT-A deve impedir).

### Basemap

Com internet: tiles `tiles.openfreemap.org` devem carregar. Sem internet: smoke de **conteúdo local** ainda válido; basemap vazio não é regressão de clue/ledger.

---

## Após alteração só em docs

Se **apenas** `docs/game/**` mudou, `npm run ci` basta para validar que o repo continua íntegro (testes não leem estes ficheiros).
