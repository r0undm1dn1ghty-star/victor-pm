# -*- coding: utf-8 -*-
"""Вшивает anatomy-стенд в en.html hero (как в index.html)."""
import pathlib, re

BASE = pathlib.Path(r"C:\Users\Victor\Desktop\hermes_work\поиск работы\site-clone")
idx = (BASE / "index.html").read_text(encoding="utf-8")
en = (BASE / "en.html").read_text(encoding="utf-8")

# Из index.html взять уже вшитый кусок: <style> агента + div.agentfig + module script
start = idx.find('<style>\n.iso{')
end_marker = '</script>'
end = idx.find(end_marker, idx.find('<script type="module">'))
assert start != -1 and end != -1
piece = idx[start:end + len(end_marker)]
print("piece:", len(piece), "chars")

fig_pat = re.compile(r'<div class="figure" data-hairline[^>]*></div>')
assert fig_pat.search(en), "hairline figure not found in en.html"
en = fig_pat.sub(lambda m: piece, en, count=1)
(BASE / "en.html").write_text(en, encoding="utf-8")
print("embedded, en:", len(en), "chars")
