# -*- coding: utf-8 -*-
"""Удаляет старые 6 статей опыта (дубликат после вставки унифицированного блока)."""
import pathlib, re

p = pathlib.Path(r"C:\Users\Victor\Desktop\hermes_work\поиск работы\site-clone\index.html")
s = p.read_text(encoding="utf-8")

# Старый блок: первый старый article (даты без "· 4 мес") до </section> перед Рекомендации
pat = re.compile(
    r'\n\s*<article class="job" style="margin-top:30px">\s*\n\s*<div class="side">\s*\n\s*<h3>Head of Product / Founder</h3>\s*\n\s*<div class="dates">07/2026 — сейчас</div>.*?</section>\s*\n\s*<section aria-label="Рекомендации">',
    re.S)
m = pat.search(s)
assert m, "старый блок не найден"
s = s[:m.start()] + '\n\n  <section aria-label="Рекомендации">' + s[m.end():]

# дубль "Исследование" строк не должно остаться больше 5
print("article count:", s.count('<article class="job"'))
print("research links:", s.count("код и метод открыты"))
p.write_text(s, encoding="utf-8")
print("ok,", len(s), "chars")
