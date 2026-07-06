import { describe, it } from 'node:test';
import assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

describe('dossie_arquivista — contrato estático', () => {
  it('linux-login.js deve ter senha narrativa ARGAMASSA', () => {
    const js = readFileSync(join(ROOT, 'arquivista/js/linux-login.js'), 'utf8');
    assert.ok(js.includes("correctPassword = 'ARGAMASSA'"), 'senha ARGAMASSA deve existir');
  });

  it('index.html deve ter hint marco zero e tela de login', () => {
    const html = readFileSync(join(ROOT, 'arquivista/index.html'), 'utf8');
    assert.ok(html.includes('marco zero'), 'hint marco zero deve existir');
    assert.ok(html.includes('login-screen'), 'tela de login deve existir');
    assert.ok(html.includes('data-app="geoscanner"'), 'GeoScanner no dock deve existir');
    assert.ok(html.includes('data-app="cmd"'), 'terminal CMD no dock deve existir');
  });

  it('operation-13almas.js deve ter summon e invoke', () => {
    const js = readFileSync(join(ROOT, 'arquivista/js/operation-13almas.js'), 'utf8');
    assert.ok(js.includes('summonAll'), 'summon all deve existir');
    assert.ok(js.includes('invoke'), 'invoke deve existir');
    assert.ok(js.includes('theThirteenAlmas'), '13 almas devem estar definidas');
  });

  it('open-application.js deve preservar link para Centro com clues', () => {
    const js = readFileSync(join(ROOT, 'arquivista/js/open-application.js'), 'utf8');
    assert.ok(js.includes('buildArquivistaCentroUrl'), 'export buildArquivistaCentroUrl');
    assert.ok(js.includes('protocolo13_caderno_clues'), 'deve ler caderno do localStorage');
    assert.ok(js.includes('?clues='), 'deve anexar clues na URL');
    assert.ok(js.includes('getSurfaceLink'), 'centro deve ser configurável');
  });

  it('nav e open-application devem usar data-surface-link ou config', () => {
    const html = readFileSync(join(ROOT, 'arquivista/index.html'), 'utf8');
    const js = readFileSync(join(ROOT, 'arquivista/js/open-application.js'), 'utf8');
    assert.ok(html.includes('data-surface-link="centro"'), 'nav deve ter link centro');
    assert.ok(html.includes('data-surface-link="arquivo-morto"'), 'nav deve ter link arquivo-morto');
    assert.ok(js.includes('initSurfaceLinks'), 'JS deve inicializar surface links');
    assert.ok(js.includes('ARQUIVISTA_SURFACE_LINKS'), 'override runtime deve existir');
  });

  it('script.js deve ter terminal e image viewer', () => {
    const js = readFileSync(join(ROOT, 'arquivista/js/script.js'), 'utf8');
    assert.ok(js.includes('setupTerminal'), 'terminal deve existir');
    assert.ok(js.includes('openImageViewer'), 'image viewer deve existir');
    assert.ok(js.includes("'summon'"), 'comando summon no terminal');
  });
});
