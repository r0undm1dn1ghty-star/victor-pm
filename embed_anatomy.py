# -*- coding: utf-8 -*-
"""Вшивает anatomy-стенд (agent-fig/hero-snippet.html) в hero вместо hairline-фигуры."""
import pathlib, re

BASE = pathlib.Path(r"C:\Users\Victor\Desktop\hermes_work\поиск работы\site-clone")
snip = (BASE / "agent-fig" / "hero-snippet.html").read_text(encoding="utf-8")
idx = (BASE / "index.html").read_text(encoding="utf-8")

# Извлечь style и тело из snippet (без <!DOCTYPE>/html/head/body-обёрток, если есть)
style_m = re.search(r'<style>.*?</style>', snip, re.S)
body_m = re.search(r'(<div class="agentfig.*?</div>\s*(?=<script|</))', snip, re.S)
mod_m = re.search(r'<script type="module">.*?</script>', snip, re.S)
assert style_m and body_m and mod_m, (bool(style_m), bool(body_m), bool(mod_m))
piece = style_m.group(0) + "\n" + body_m.group(1) + "\n" + mod_m.group(0)
print("snippet piece:", len(piece), "chars")

# Заменить hairline-фигуру в hero
fig_pat = re.compile(r'<div class="figure" data-hairline[^>]*></div>')
assert fig_pat.search(idx), "hairline figure not found"
idx = fig_pat.sub(lambda m: piece, idx, count=1)

p = BASE / "index.html"
p.write_text(idx, encoding="utf-8")
print("embedded, index:", len(idx), "chars")
