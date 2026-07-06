# Superfícies do ARG

Quatro superfícies formam um único ARG. Cada uma tem papel narrativo e técnico distinto.

---

## Landing — `/landing/`

| Aspecto | Descrição |
|---------|-----------|
| **Papel narrativo** | Portal público do **ARQUIVO//SP**. Apresenta o projeto, jornada, mídias paralelas, cotas de patrocínio. |
| **Papel técnico** | HTML estático + `landing/landing.js`. Gate de acesso com senha narrativa (`apoio`) — **teatro**, não segurança (const em JS). |
| **O que o jogador faz** | Lê o pitch; opcionalmente desbloqueia o portal; navega para Arquivo Morto, Centro ou Arquivista. |
| **localStorage** | Não é o hub principal de progresso ARG. Badge de fase pode espelhar `protocolo13_phase` se o elemento `#protocolo-phase-badge` existir na página. |
| **Fases (13)** | Exibe estado de fase como espelho narrativo; avanço real é calculado no Centro / Arquivo Morto. |

---

## Arquivo Morto — `/arquivo-morto/`

| Aspecto | Descrição |
|---------|-----------|
| **Papel narrativo** | Blog forense do Arquivista. Registro 001 e posts em `posts/`. Voz dos dossiês, Comissão de Alinhamento, instruções para descer ao mapa. |
| **Papel técnico** | `clue-word` com `data-clue-id`; catálogo `data/pistas.json`; UI do **Caderno do Arquivista** (`arquivo-morto.js`). |
| **O que o jogador faz** | Lê o artigo; clica em palavras secretas; vê pistas no ledger lateral; ao reunir as 4 pistas obrigatórias, vê conclusão com link para o mapa. |
| **localStorage produz** | `protocolo13_caderno_clues` — array JSON de IDs de pistas (chave canónica lida pelo Centro). Entradas `caderno_arquivista_*` podem existir para texto/timestamp individual (AGENT.md §3.4). |
| **Fases (13)** | Não aplica gates de camada diretamente. Contribui contagem de pistas para `clueCountAdvance` no Centro (via mesma chave de caderno). |

**Implementado:** 8 pistas em Registro 001 (`index.html`). **Roadmap:** mais registros/posts e pistas até completar arco de 13 almas (ver [open-decisions.md](./open-decisions.md)).

---

## Arquivista — `/arquivista/`

| Aspecto | Descrição |
|---------|-----------|
| **Papel narrativo** | Estação forense: desktop Linux/GNOME simulado, boot CRT, terminal CLI, janelas. Personagem-operador no “laboratório”. |
| **Papel técnico** | Simulação UI (CSS+JS). Senha de boot narrativa: `marco zero` (hint visível). **GeoScanner Urbano** no dock redireciona para `/centro/` — não embeda mapa. |
| **O que o jogador faz** | Boot/login; explora apps/CLI; abre GeoScanner → vai ao Centro com `?clues=` se já houver pistas no caderno. |
| **localStorage** | `arquivista_attempts`, `arquivista_lockTime` (tentativas de login). Lê `protocolo13_caderno_clues` ao montar URL do Centro (`open-application.js`). |
| **Fases (13)** | Não governa fases do mapa; é ponte e ambientação. |

---

## Centro — `/centro/`

| Aspecto | Descrição |
|---------|-----------|
| **Papel narrativo** | Mapa forense do centro de SP: hidrografia soterrada, eixos, património, risco, “arquivo superficial”. OP:* (`TRIÂNGULO`, `SÉ`, etc.) como cortes de cena. |
| **Papel técnico** | MapLibre GL JS; catálogo `centro/data/catalog/`; runtime `centro-runtime.js` + módulos em `centro/features/`. |
| **O que o jogador faz** | Navega mapa; liga camadas na sidebar; clica POIs e pistas RSB; vê badge de fase; pode usar inspector com `?debug=1`. |
| **localStorage consome** | `protocolo13_caderno_clues` (desbloqueio de camadas); `protocolo13_phase` (fase 1–13); `centroBuildings3D`, `centroPoiThemeFilter`, `centroDebug`. |
| **Fases (13)** | **Implementado:** `phase-gates.json` + `protocolo-phase.js` — `layerMinPhase`, `clueCountAdvance`, badge `#centro-phase-badge`. **Roadmap:** conteúdo narrativo completo das fases 2–13 (AGENT.md §12.1). |

---

## Relação com as 13 fases

As 13 fases são a **estrutura narrativa de longo prazo** (títulos em `phase-gates.json`). Hoje:

- Gates técnicos (sidebar `layer-row--phase-locked`, `layerMinPhase`) estão **implementados**.
- Avanço automático por contagem de pistas (`clueCountAdvance`) referencia **11 e 14 pistas** para fases 5 e 6 — **roadmap**: só existem 8 pistas no catálogo (ver [arg-model.md](./arg-model.md)).
- Fases 5 (Geotecnia) e 6 (Arquivo superficial) têm títulos e `layerMinPhase`, mas o arco de pistas para atingi-las só por coleta ainda não está completo.

Ver [arg-model.md](./arg-model.md) para a diferença entre progressão real, deep-link de debug e roadmap.
