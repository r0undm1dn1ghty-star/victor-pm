# -*- coding: utf-8 -*-
"""Показывает чипы, data-read и aria-подписи в hero-map-ru.html."""
import re, pathlib

p = pathlib.Path(r"C:\Users\Victor\Desktop\hermes_work\поиск работы\site-clone\map-table-v2\hero-map-ru.html")
s = p.read_text(encoding="utf-8")

print("===CHIPS===")
for m in re.finditer(r'<button[^>]*data-chip="([^"]*)"[^>]*>(.*?)</button>', s, re.S):
    body = re.sub(r'<[^>]+>', ' | ', m.group(2))
    print(m.group(1), "→", " ".join(body.split())[:150])

print("===DATA-READ===")
for m in re.finditer(r'data-read="([^"]*)"', s):
    print("-", m.group(1)[:130])

print("===ARIA===")
for m in re.finditer(r'aria-label="([^"]{20,260})"', s):
    print("-", m.group(1)[:200])

print("===LEGEND STEPS===")
for m in re.finditer(r'data-step="([^"]*)"[^>]*>(.*?)</', s, re.S):
    body = re.sub(r'<[^>]+>', '', m.group(2))
    print(m.group(1), "→", " ".join(body.split())[:80])