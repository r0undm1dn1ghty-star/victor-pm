# -*- coding: utf-8 -*-
"""Клип для EN-сниппета (viewBox 600x372) + правка 'territory' в aria."""
import pathlib

BASE = pathlib.Path(r"C:\Users\Victor\Desktop\hermes_work\поиск работы\site-clone\map-table-v2")

for name in ("hero-map-en.html", "test-en.html"):
    p = BASE / name
    s = p.read_text(encoding="utf-8")
    s = s.replace("Arrow keys pick a territory, Enter opens its section.",
                  "Arrow keys pick a section, Enter opens it.")
    if 'data-map-clip' in s:
        print(name, "clip already"); continue
    marker = '<svg xmlns="http://www.w3.org/2000/svg" class="iso-svg" viewBox="0 0 600 372"'
    i = s.find(marker)
    if i < 0:
        print(name, "NO SVG"); continue
    j = s.find(">", i) + 1
    s = s[:j] + ('<defs><clipPath id="map-clip" data-map-clip="1"><rect x="6" y="6" width="588" height="360" rx="10"/></clipPath></defs>'
                 '<g clip-path="url(#map-clip)">') + s[j:]
    k = s.rfind("</svg>")
    s = s[:k] + "</g>" + s[k:]
    p.write_text(s, encoding="utf-8")
    print(name, "clip added")
