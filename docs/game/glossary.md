# Glossário — jogo e ARG

Termos usados na documentação `docs/game/` e no projeto. Onde aplicável, alinhado a `AGENT.md` §13.

---

## clue (pista)

Evidência narrativa que o jogador descobre. No Arquivo Morto: botão `clue-word` com `data-clue-id`. No Centro: também pistas cartográficas (Rua São Bento) — mecânica separada.

---

## data-clue-id

Identificador técnico estável (`peso-fundacao`, `guardiao-tampa`, …). Usado em HTML, testes, `protocolo13_caderno_clues`, `layer-unlocks.json`. **Não** é instrução para o jogador na UI.

---

## texto clicável

Palavra ou frase **dentro** do `<button class="clue-word">` que o jogador vê e clica no artigo. Pode diferir do `data-clue-id` e do título do Caderno.

---

## ledger

Lista de pistas consolidadas no painel do Caderno do Arquivista (`[data-clue-list]`). Mostra **título** e descrição de `pistas.json`.

---

## Caderno (do Arquivista)

UI lateral no Arquivo Morto + estado persistido. Chave canónica para o Centro: `protocolo13_caderno_clues`. Entradas `caderno_arquivista_*` podem guardar fragmentos adicionais.

---

## REQUIRED_CLUES

Subconjunto de pistas que desbloqueia a **conclusão** do Registro 001 no Arquivo Morto. **Implementado:** `peso-fundacao`, `aresta-fria`, `aurora-maloca`, `agua-calada` (4 IDs). Distinto de `REQUIRED_CLUES` da visão subterrânea no Centro (3 IDs).

---

## phase-gates

Ficheiro `centro/data/catalog/phase-gates.json`: títulos das 13 fases, `layerMinPhase`, `clueCountAdvance`. Consumido por `protocolo-phase.js`.

---

## layer-unlocks

Ficheiro `centro/data/catalog/layer-unlocks.json`: mapa de camada → lista de `clueId` obrigatórios. Consumido por `layer-unlocks.js` + runtime da sidebar.

---

## superfície

Uma das quatro páginas principais do ARG: Landing, Arquivo Morto, Arquivista, Centro.

---

## fase

Número 1–13 do **Protocolo 13 Almas**. Persistido em `protocolo13_phase`. Controla bloqueio por fase na sidebar; pode avançar por contagem de pistas (`clueCountAdvance`) ou `?phase=` (debug).

---

## deep-link

Query string que altera estado local sem passar pelo fluxo normal — ex.: `?clues=`, `?phase=`, `?debug=1`.

---

## roadmap

Funcionalidade ou conteúdo planeado mas não entregue (ou só parcialmente). Gates técnicos podem existir antes do conteúdo narrativo.

---

## smoke manual

Verificação humana no browser com linguagem de jogador (texto clicável, títulos no ledger). Complementa testes automatizados que usam IDs.

---

## Protocolo 13 Almas

Codinome do projeto inteiro. Estrutura de 13 fases narrativas de longo prazo.

---

## Comissão de Alinhamento

Antagonista narrativo fictício. Não é entidade real do sistema.

---

## Arquivista (personagem)

Voz dos textos do Arquivo Morto; operador não identificado do dossiê.

---

## clue-word

Classe CSS do botão de pista no blog. Comportamento: click → registro, não navegação.

---

## eco redundante

Vários botões no HTML com o mesmo `data-clue-id` (variações de palavra na narrativa). Um registro no Caderno.

---

## Matriz de Endereçamento

Camada de contexto OSM (endereços) no catálogo do Centro — `context-layers.json`. Carregamento sob demanda na sidebar.
