/**
 * Abertura de apps do dock / desktop (Arquivista).
 */
(function () {
  "use strict";

  var SURFACE_LINK_DEFAULTS = {
    centro: "/centro/",
    landing: "/landing/",
    "arquivo-morto": "/arquivo-morto/",
  };

  var surfaceLinks = Object.assign({}, SURFACE_LINK_DEFAULTS);

  function applySurfaceLinks(overrides) {
    surfaceLinks = Object.assign(
      {},
      SURFACE_LINK_DEFAULTS,
      window.ARQUIVISTA_SURFACE_LINKS || {},
      overrides || {}
    );
    document.querySelectorAll("[data-surface-link]").forEach(function (el) {
      var key = el.getAttribute("data-surface-link");
      if (surfaceLinks[key]) el.setAttribute("href", surfaceLinks[key]);
    });
  }

  function getSurfaceLink(key) {
    return surfaceLinks[key] || SURFACE_LINK_DEFAULTS[key] || "/";
  }

  function initSurfaceLinks() {
    applySurfaceLinks();
    fetch("/config/surface-links.json", { cache: "no-store" })
      .then(function (res) {
        return res.ok ? res.json() : null;
      })
      .then(function (cfg) {
        if (cfg) applySurfaceLinks(cfg);
      })
      .catch(function () {});
  }

  function buildCentroUrlWithClues() {
    var centroUrl = getSurfaceLink("centro");
    try {
      var raw = localStorage.getItem("protocolo13_caderno_clues");
      if (raw) {
        var parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          centroUrl += "?clues=" + encodeURIComponent(parsed.join(","));
        }
      }
    } catch (_e) {
      // ignora
    }
    return centroUrl;
  }

  /**
   * @param {string} app
   * @param {{ windowManager: object, renderClues: Function, setupPhotosApp: Function, setupWordApp: Function, setupTerminal: Function }} ctx
   */
  function openApplication(app, ctx) {
    var windowManager = ctx.windowManager;
    console.log("[Arquivista] openApplication:", app);

    switch (app) {
      case "dossie":
      case "dossiê":
        windowManager.createWindow({
          id: "win-dossie",
          title: "📁  Explorador — C:\\PROTOCOLO_13ALMAS\\Dossiê_Oficial",
          width: "760px",
          height: "550px",
          content: document.getElementById("tpl-dossie").innerHTML,
        });
        if (typeof ctx.renderClues === "function") ctx.renderClues();
        break;

      case "fotos":
        windowManager.createWindow({
          id: "win-fotos",
          title: "Visualizador de Fotos",
          width: "540px",
          height: "420px",
          content: document.getElementById("tpl-fotos").innerHTML,
        });
        if (typeof ctx.setupPhotosApp === "function") ctx.setupPhotosApp();
        break;

      case "codinomes":
        windowManager.createWindow({
          id: "win-codinomes",
          title: "Codinomes.docx - Word",
          width: "500px",
          height: "550px",
          content: document.getElementById("tpl-codinomes").innerHTML,
        });
        if (typeof ctx.setupWordApp === "function") ctx.setupWordApp();
        break;

      case "geoscanner":
        window.location.href = buildCentroUrlWithClues();
        break;

      case "terminal":
      case "cmd":
        windowManager.createWindow({
          id: "win-terminal",
          title: "root@arquivista_sys:~# - Hacking Interface",
          width: "650px",
          height: "400px",
          content: document.getElementById("tpl-terminal").innerHTML,
        });
        if (typeof ctx.setupTerminal === "function") ctx.setupTerminal();
        break;

      case "arquivo":
        window.open(getSurfaceLink("arquivo-morto"), "_blank");
        break;

      default:
        console.warn("[Arquivista] App desconhecida:", app);
    }
  }

  window.openArquivistaApplication = openApplication;
  window.buildArquivistaCentroUrl = buildCentroUrlWithClues;
  window.getArquivistaSurfaceLink = getSurfaceLink;
  window.initArquivistaSurfaceLinks = initSurfaceLinks;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSurfaceLinks);
  } else {
    initSurfaceLinks();
  }
})();
