import re, os
p = os.path.join(os.path.dirname(os.path.abspath(__file__)), "hero-map-en.html")
s = open(p, encoding="utf-8").read()
for m in re.finditer(r"</script", s, re.I):
    a = max(0, m.start() - 220)
    print("---- at", m.start(), "----")
    print(repr(s[a:m.start() + 20]))
print("total </script:", len(re.findall(r"</script", s, re.I)))
