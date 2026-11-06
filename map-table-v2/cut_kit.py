# -*- coding: utf-8 -*-
"""Вырезает мёртвый kit-блок из hero-map-en.html: строки с 'xmlns:' куска (604) до конца pageHtml (629)."""
import pathlib

p = pathlib.Path(r"C:\Users\Victor\Desktop\hermes_work\поиск работы\site-clone\map-table-v2\hero-map-en.html")
lines = p.read_text(encoding="utf-8").splitlines(keepends=True)
print("before:", len(lines), "lines")

# Найти начало мусора: строка с '/* ---' после __KIT_OK__, и конец: строка '}' закрывающая pageHtml + 2 пустые
start = next(i for i, l in enumerate(lines) if l.strip() == "/* ---")
# конец pageHtml: первая строка '}' после start, за которой идут пустые и '/* ---...Chart table'
end = next(i for i, l in enumerate(lines) if i > start and l.strip() == "}" and "Chart table" in "".join(lines[i:i+4]))
print("cutting lines", start + 1, "-", end + 1)
cut = "".join(lines[start:end + 1])
assert "figureSvg" not in cut and "pageHtml" in cut, "wrong block"
assert "</script>" not in cut, "LIVE script would be cut!"

new = lines[:start] + ["/* (kit build helpers removed — live module below) */\n"] + lines[end + 1:]
s = "".join(new)
p.write_text(s, encoding="utf-8")
print("after:", len(new), "lines | pageHtml left:", s.count("pageHtml"), "| </script> in file:", s.count("</script>"), "| live-model:", s.count("const MODEL"))
