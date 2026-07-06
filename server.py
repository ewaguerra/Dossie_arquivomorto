#!/usr/bin/env python3
"""Servidor dev para dossie_arquivista — Arquivista isolado."""
import http.server
import os
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
ROOT = os.path.dirname(os.path.abspath(__file__))

# Superfícies externas — não fazem parte deste repo isolado.
ABSENT_SURFACE_PREFIXES = ('/centro/', '/landing/', '/arquivo-morto/')


class ArquivistaHandler(http.server.SimpleHTTPRequestHandler):
    IMMUTABLE_PREFIXES = ('/vendor/', '/app/vendor/')

    def send_response(self, code, message=None):
        self._response_code = code
        super().send_response(code, message)

    def end_headers(self):
        request_path = (self.path or '').split('?', 1)[0]
        status = getattr(self, '_response_code', 200)
        is_vendor = request_path.startswith(self.IMMUTABLE_PREFIXES)
        is_success = 200 <= status < 300

        if is_vendor and is_success:
            self.send_header('Cache-Control', 'public, max-age=31536000, immutable')
        else:
            self.send_header('Cache-Control', 'no-cache, must-revalidate')

        self.send_header('X-Content-Type-Options', 'nosniff')
        super().end_headers()

    def translate_path(self, path):
        if path.startswith('/app/vendor/'):
            rel = path[len('/app/vendor/'):]
            translated = os.path.join(ROOT, 'vendor', 'app', 'vendor', rel)
            if os.path.exists(translated):
                return translated

        if path.startswith('/app/'):
            rel = path[len('/app/'):]
            translated = os.path.join(ROOT, 'vendor', 'app', rel)
            if os.path.exists(translated):
                return translated

        return super().translate_path(path)

    def do_GET(self):
        path = (self.path or '').split('?', 1)[0]
        if any(path.startswith(prefix) for prefix in ABSENT_SURFACE_PREFIXES):
            self.send_error(404, 'Superficie nao disponivel neste servidor isolado')
            return
        super().do_GET()

    def log_message(self, format, *args):
        status = args[1] if len(args) > 1 else '?'
        if not str(status).startswith('2'):
            print(f"  [{status}] {args[0]}", flush=True)


if __name__ == '__main__':
    os.chdir(ROOT)
    server = http.server.HTTPServer(('127.0.0.1', PORT), ArquivistaHandler)
    print(f"Servidor Arquivista em http://127.0.0.1:{PORT}")
    print(f"   Projeto: {ROOT}")
    print(f"   /  e  /arquivista/  estacao forense (desktop simulado)")
    print(f"   /app/  design system (vendor/app)")
    print(f"   /config/  links externos configuraveis")
    print(f"   /docs/  contratos ARG")
    print(f"   /centro/, /landing/, /arquivo-morto/ -> 404 (superficies externas)")
    print(f"   Ctrl+C para parar.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor encerrado.")
        server.server_close()
