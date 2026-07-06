# Fluxo do jogador

Jornada típica pelas quatro superfícies. Baseado no comportamento **implementado** em maio/2026.

---

## Visão geral

```text
1. Landing (opcional: senha apoio)
2. Arquivo Morto — ler Registro 001, clicar clue-words
3. Caderno preenche; localStorage protocolo13_caderno_clues
4. Conclusão (4 REQUIRED) → link para Centro
5. Centro — camadas/POIs; bloqueios por pista e/ou fase
6. Arquivista — paralelo; GeoScanner leva ao Centro com pistas já no URL
```

---

## Passo a passo

### 1. Entrada

- **Implementado:** `/` → `/landing/`.
- Jogador pode ir direto a `/arquivo-morto/` ou `/centro/` sem passar pela landing.

### 2. Arquivo Morto — descoberta

- Lê `REGISTRO 001 — Não olhe para o céu.`
- Palavras com classe `clue-word` / `secret-hover` são clicáveis (estilo de “trecho secreto”).
- Cada clique válido adiciona o `data-clue-id` ao Set interno e persiste `protocolo13_caderno_clues`.

### 3. Caderno e conclusão

- Ledger mostra **título** de `pistas.json` + categoria + descrição.
- **REQUIRED_CLUES** (4): quando todas coletadas, `[data-clue-conclusion]` exibe lista de instruções e `<a href="/centro/">`.
- **Interpretação narrativa:** mensagem intermediária com 3 de 4 pistas obrigatórias.

### 4. Centro — consumo das pistas

Ao abrir `/centro/`:

1. `layer-unlocks.js` lê caderno (e opcionalmente `?clues=`).
2. `protocolo-phase.js` lê fase (e opcionalmente `?phase=`), pode subir fase por contagem de pistas.
3. Sidebar monta camadas; linhas bloqueadas se falta clue ou fase.

Jogador:

- Activa camadas desbloqueadas.
- Vê toast ao tentar camada bloqueada por **pista**.
- Vê estado bloqueado por **fase** (`layer-row--phase-locked`) independentemente das pistas.

### 5. Arquivista (paralelo)

- Boot com `marco zero`.
- Dock **GeoScanner Urbano** → `/centro/` ou `/centro/?clues=…` se já existir caderno.
- Não grava pistas novas — só reutiliza as do Arquivo Morto.

---

## Fluxo específico: guardião da tampa

| Passo | O que acontece |
|-------|----------------|
| 1 | Jogador rola o Registro 001 até o bloco final (“Procure o centro geométrico…”). |
| 2 | Clica em **guardião da tampa** (texto visível). |
| 3 | Caderno lista **Guardião da Tampa**; `protocolo13_caderno_clues` inclui `guardiao-tampa`. |
| 4 | No Centro, `centro_arquivo_superficial__point` deixa de estar bloqueada **por pista**. |
| 5 | Se `protocolo13_phase` &lt; 6, a camada pode continuar bloqueada **por fase** — **comportamento esperado**. |
| 6 | QA pode usar `/centro/?clues=guardiao-tampa&phase=6` para validar ambos os gates. |

**Não confundir:** coletar a pista não equivale a “completar fase 6” no arco completo — fase 6 no roadmap ainda depende de mais pistas (11/14) para avanço automático.

---

## O que o jogador com devtools vê

**Implementado por design (AGENT.md §3):**

- IDs em `data-clue-id` e em `localStorage`.
- Senhas narrativas em JS (`apoio`, `marco zero`).
- `?clues=` e `?phase=` como atalhos.

Isso faz parte do ARG; documentação interna deve mesmo expor IDs para dev/teste.

---

## Estados vazios

**Implementado:** se `localStorage` vazio ou inválido, Arquivo Morto e Centro não crasham — conjuntos vazios, fase default 1.

Apagar `protocolo13_caderno_clues` reverte desbloqueios de clue no mapa (camadas voltam a exigir coleta).
