# -*- coding: utf-8 -*-
"""Продуктовые подписи вместо сказки + спокойная анимация + клип по границам. RU+EN, сниппеты и тест-страницы."""
import pathlib

BASE = pathlib.Path(r"C:\Users\Victor\Desktop\hermes_work\поиск работы\site-clone\map-table-v2")

RU_MAP = [
    ('Бухта кейсов', 'Кейсы'),
    ('Хребет навыков', 'Навыки'),
    ('Плато опыта', 'Опыт'),
    ('Маяк найма', 'Найм'),
    ('Карта экспедиции: стрелки выбирают территорию, Enter открывает раздел',
     'Карта разделов: стрелки выбирают раздел, Enter открывает'),
    ('Картографический стол Discovery: четыре территории-рельефа — кейсы, навыки, опыт, найм, — маршрут экспедиции с пятью флажками от ассистента до Head of Product, два маяка «менял бизнес-модель здесь», компас, шлюпка-маркер и будка Telegram.',
     'Картографический стол: четыре раздела — кейсы, навыки, опыт, найм; маршрут ролей от ассистента до Head of Product; две отметки, где менялась бизнес-модель.'),
    ('Картографический стол Discovery', 'Картографический стол'),
    ('маршрут экспедиции', 'маршрут ролей'),
    ('два маяка', 'две отметки'),
    ('маяка', 'отметки'),
    ('маяк', 'отметка'),
]
EN_MAP = [
    ('Cases Bay', 'Cases'), ('Skills Ridge', 'Skills'),
    ('Track Plateau', 'Track'), ('Hire Beacon', 'Hire'),
    ('Chart table of a product career: four territories — cases, skills, track, hire — with an expedition route of five flags from assistant to Head of Product, two beacons where the business model changed, a compass, a survey boat and a phone booth to Telegram.',
     'Chart table: four sections — cases, skills, track, hire; a role route from assistant to Head of Product; two marks where the business model changed.'),
    ('Chart table of a product career: four territories', 'Chart table: four sections'),
    ('expedition route', 'role route'),
    ('two beacons', 'two marks'),
    ('survey boat', 'marker'),
]

ANIM = [
    # тур реже и медленнее
    ('TOUR_STEP = 2.6', 'TOUR_STEP = 4.2'),
    ('Math.floor(clock/2.6)', 'Math.floor(clock/4.2)'),
    ('clock/2.6', 'clock/4.2'),
    ('IDLE_RESUME = 5000', 'IDLE_RESUME = 9000'),
    ('setTimeout(() => { touring = !still.matches; clock = 0; run(); }, 5000)',
     'setTimeout(() => { touring = !still.matches; clock = 0; run(); }, 9000)'),
    ('setTimeout(() => { touring = !still.matches; clock = 0; run(); }, 3600)',
     'setTimeout(() => { touring = !still.matches; clock = 0; run(); }, 9000)'),
    # вымпелы не дёргаются: амплитуда в ноль
    ('const s = 1 + 0.05 * Math.sin(t * 2.2 + i * 1.3);',
     'const s = 1 + 0.012 * Math.sin(t * 1.6 + i * 1.3);'),
    # корабль плавнее
    ('1 - Math.exp(-dt/0.5)', '1 - Math.exp(-dt/0.85)'),
    # маяки спокойнее
    ('const op = 0.35 + 0.65 * Math.pow(Math.max(0, Math.sin(t * 2.4 + i * Math.PI)), 2);',
     'const op = 0.66 + 0.2 * Math.pow(Math.max(0, Math.sin(t * 1.5 + i * Math.PI)), 2);'),
]

files = ["hero-map-ru.html", "test-ru.html", "hero-map-en.html", "test-en.html"]
for name in files:
    p = BASE / name
    s = p.read_text(encoding="utf-8")
    n = 0
    for old, new in (RU_MAP if "ru" in name else EN_MAP) + ANIM:
        if old in s:
            c = s.count(old)
            s = s.replace(old, new)
            n += c
    p.write_text(s, encoding="utf-8")
    print(name, "замен:", n)

# клип по границам стола: добавим clipPath в корневой svg сниппета
for name in files:
    p = BASE / name
    s = p.read_text(encoding="utf-8")
    if 'data-map-clip' in s:
        print(name, "clip уже есть"); continue
    old = '<svg xmlns="http://www.w3.org/2000/svg" class="iso-svg" viewBox="0 0 600 39'
    i = s.find(old)
    if i < 0:
        print(name, "svg не найден"); continue
    j = s.find(">", i) + 1
    clip = ('<defs><clipPath id="map-clip" data-map-clip="1"><rect x="6" y="6" width="588" height="378" rx="10"/></clipPath></defs>'
            '<g clip-path="url(#map-clip)">')
    s = s[:j] + clip + s[j:]
    # закрыть группу перед </svg>
    k = s.rfind("</svg>")
    s = s[:k] + "</g>" + s[k:]
    p.write_text(s, encoding="utf-8")
    print(name, "clip добавлен")
