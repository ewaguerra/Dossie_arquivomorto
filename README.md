# dossie_arquivista

**Anhangabaú: O Arquivo dos Soterrados — Protocolo 13 Almas**
Superfície: **Arquivista** (desktop simulado)

---

## O que é este projeto

A estação forense do ARG. Simulador de desktop Linux/GNOME com boot CRT,
tela de login, dock de apps e terminal CLI in-character. O jogador faz boot
com a senha narrativa, explora apps investigativos e usa o GeoScanner
Urbano para ir ao mapa do Centro.

Entrada narrativa: o jogador chega da Landing ou do Arquivo Morto.

---

## Como rodar localmente

```bash
# Iniciar servidor de desenvolvimento na porta 8080
python3 server.py

# Acessar
open http://127.0.0.1:8080/arquivista/
```

Não há `npm install` obrigatório — o Arquivista não usa bundler,
MapLibre nem Three. A única dependência de runtime é `vendor/app/` (design
system, já copiado aqui).

---

## Como testar

```bash
npm test
```

Testes HTTP (porta 9880) e contratos estáticos (login, terminal, GeoScanner,
surface links). Requer Node.js ≥ 18.

---

## Estrutura principal

```
dossie_arquivista/
├── arquivista/
│   ├── index.html             ← boot screen / desktop simulado
│   ├── css/
│   └── js/
│       ├── script.js          ← runtime principal (IIFE)
│       ├── linux-login.js     ← boot + login
│       ├── desktop-manager.js ← dock, apps, estado
│       ├── window-manager.js  ← sistema de janelas
│       ├── open-application.js ← apps, GeoScanner, surface links
│       └── operation-13almas.js ← Operação 13 Almas no terminal
├── vendor/app/                ← design system (tokens.css, a11y.css, components.css)
├── config/
│   └── surface-links.json     ← URLs das outras superfícies (override deploy)
├── index.html                 ← redirect para /arquivista/
├── server.py                  ← servidor isolado (porta 8080)
└── docs/game/                 ← contratos ARG (pistas, fases, superfícies)
```

---

## Rotas disponíveis (servidor isolado)

| Rota | Status | Descrição |
|------|--------|-----------|
| `/` | 200 | Redirect meta para `/arquivista/` |
| `/arquivista/` | 200 | Desktop simulado |
| `/arquivista/js/*`, `/arquivista/css/*` | 200 | Assets do Arquivista |
| `/app/styles/tokens.css` | 200 | Design system |
| `/config/surface-links.json` | 200 | Links externos configuráveis |
| `/docs/` | 200 | Contratos ARG |
| `/centro/` | 404 | Superfície externa |
| `/landing/` | 404 | Superfície externa |
| `/arquivo-morto/` | 404 | Superfície externa |

---

## Configurar links externos

Defaults (monodomínio):

```json
{
  "centro": "/centro/",
  "landing": "/landing/",
  "arquivo-morto": "/arquivo-morto/"
}
```

Override em deploy multi-domínio:

1. Editar `config/surface-links.json`
2. Ou definir antes dos scripts: `window.ARQUIVISTA_SURFACE_LINKS = { centro: 'https://...' }`

Elementos com `data-surface-link="centro|landing|arquivo-morto"` recebem o href
atualizado. O GeoScanner (`buildArquivistaCentroUrl`) usa o mesmo config e
preserva `?clues=` quando há pistas no caderno.

---

## Contratos localStorage

### Consumido

| Chave | Origem | Uso |
|-------|--------|-----|
| `protocolo13_caderno_clues` | Arquivo Morto | Montar URL `/centro/?clues=...` ao abrir GeoScanner |

### Produzido

| Chave | Destino | Uso |
|-------|---------|-----|
| `arquivista_attempts` | Local | Tentativas de login (não cruza superfícies) |
| `arquivista_lockTime` | Local | Timestamp de bloqueio (não cruza superfícies) |

**Aviso:** `localStorage` não atravessa domínios diferentes. Se Centro,
Arquivo Morto ou Landing estiverem em outro domínio, o caderno de pistas não
será lido automaticamente — usar fallback por query string ou export/import
(futuro `ARG-CONTRACTS-B`).

---

## Senha narrativa (gate teatral)

A tela de login exibe a dica **"marco zero"** — red herring intencional.
A senha real aceita pelo sistema é `ARGAMASSA` (comparação em uppercase).
O jogador pode encontrar via F12 — isso é intencional.

---

## Smoke manual

1. `python3 server.py` → abrir `/arquivista/`
2. Boot screen aparece; após animação, campo de senha visível
3. Digitar `ARGAMASSA` → desktop GNOME aparece
4. Dock: Dossiê, Fotos, Codinomes, GeoScanner, CMD
5. CMD → terminal abre; `help`, `run 13`, `summon all` funcionam
6. GeoScanner → redireciona para `/centro/` (404 neste servidor isolado)
7. Nav: PROTOCOLO, MAPA, ARQUIVO MORTO → links configuráveis (404 aqui)

---

## Próximos gates

- `ARG-CONTRACTS-B` — contrato cross-domain (localStorage / query / export)
- `REPO-INIT-C` — `git init` quando todas as superfícies estiverem autônomas
