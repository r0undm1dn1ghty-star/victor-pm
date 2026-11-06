# -*- coding: utf-8 -*-
"""Чинит hero-map-en.html: вырезает строки 603-632 (обрубок kit-функций)."""
import pathlib

p = pathlib.Path(r"C:\Users\Victor\Desktop\hermes_work\поиск работы\site-clone\map-table-v2\hero-map-en.html")
lines = p.read_text(encoding="utf-8").splitlines(keepends=True)
print("before:", len(lines))
# строки 603..632 (1-based) = индексы 602..631
cut = lines[602:632]
assert any("xmlns" in l for l in cut), "wrong block start"
assert any("function pageHtml" in l for l in cut), "wrong block end"
assert not any("const MODEL" in l for l in cut), "live code would be cut!"
new = lines[:602] + ["/* (kit build helpers removed — live module below) */\n"] + lines[632:]
s = "".join(new)
p.write_text(s, encoding="utf-8")
print("after:", len(new), "| pageHtml:", s.count("pageHtml"), "| MODEL:", s.count("const MODEL"), "| </script> in file:", s.count("</script>"), "| ISO_CSS refs:", s.count("ISO_CSS"))
