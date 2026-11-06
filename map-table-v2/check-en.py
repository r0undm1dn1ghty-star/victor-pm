import re, sys, os
p = os.path.join(os.path.dirname(os.path.abspath(__file__)), "hero-map-en.html")
s = open(p, encoding="utf-8").read()
cyr = re.findall(r"[А-Яа-яЁё]", s)
print("bytes:", os.path.getsize(p))
print("cyrillic chars:", len(cyr), "lines:", len(set(l for l in s.splitlines() if re.search(r"[А-Яа-яЁё]", l))))
m = re.search(r'<script type="module">(.*?)</script>', s, re.S)
print("module chars:", len(m.group(1)) if m else 0, "bytes:", len(m.group(1).encode()) if m else 0)
jumps = re.findall(r'data-jump="([^"]+)"', s)
print("data-jump total:", len(jumps), "distinct:", sorted(set(jumps)))
for k in ["#cases", "#skills", "#experience", "#hire"]:
    print("  ", k, jumps.count(k))
comm = re.findall(r"(?i)\b(paid|deployments|margin|deal|deals|repeat sale|repeat sales|client came back|zero ad budget|price list|revenue share|payback|TCO|RUB)\b", s)
print("commerce hits:", len(comm), sorted(set(c.lower() for c in comm)))
# font sizes declared
print("font-size decls:", sorted(set(re.findall(r"font-size:\s*([0-9.]+)px", s))))
print("has data-mapfig:", s.count("data-mapfig"))
print("regions:", len(re.findall(r'data-region="', s)), "keys:", len(re.findall(r'data-key="', s)))
