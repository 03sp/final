#!/usr/bin/env python3
"""Concatenate shell + data + screens into dist/index.html (single self-contained file)."""
import base64, glob, os, sys
ONLY = sys.argv[sys.argv.index('--only')+1] if '--only' in sys.argv else None
R = os.path.dirname(os.path.abspath(__file__))
rd = lambda p: open(os.path.join(R, p), encoding='utf-8').read()
logo = 'data:image/png;base64,' + base64.b64encode(open(os.path.join(R, 'assets/logo.png'), 'rb').read()).decode()
order = ['intro', 'login', 'search', 'overview', 'timeline', 'config']
screens = ''
for n in order:
    if ONLY and n != ONLY: continue
    p = os.path.join(R, 'screens', n + '.js')
    if os.path.exists(p):
        screens += '\n/* ===== screen: %s ===== */\n(function(){\n%s\n})();\n' % (n, open(p, encoding='utf-8').read())
js = rd('data.js').replace('__LOGO_DATA_URI__', logo) + '\n' + rd('shell.js') + '\n' + screens + '\nShell.start();\n'
html = '''<!DOCTYPE html>
<html lang="en" data-skin="pop"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>DMS Collections — Customer Communications Audit</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Figtree:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>%s</style></head><body><div id="app"></div><script>%s</script></body></html>''' % (rd('shell.css'), js.replace('</script', '<\\/script'))
os.makedirs(os.path.join(R, 'dist'), exist_ok=True)
outf = 'dist/only-%s.html' % ONLY if ONLY else 'dist/index.html'
open(os.path.join(R, outf), 'w', encoding='utf-8').write(html)
print(outf, 'built', len(html) // 1024, 'KB')
