# -*- coding: utf-8 -*-
"""Лаконизирует AARRR-секцию: тело между <section class="aarrr" и </section> меняется на компактное."""
import pathlib, re

BASE = pathlib.Path(r"C:\Users\Victor\Desktop\hermes_work\поиск работы\site-clone")

RU = """  <section class="aarrr reveal" id="aarrr" aria-label="Воронка AARRR">
    <div class="aarrr__eyebrow">NSM · AARRR</div>
    <h2>Продукт веду по воронке — от трафика до денег</h2>
    <p class="aarrr__sub">Каждая ступень — с цифрой и базой замера, без выдуманных коэффициентов.</p>

    <ol class="aarrr__track">
      <li class="aarrr__stage">
        <small>Acquisition</small>
        <div class="aarrr__num tnum"><em>6,5 млн</em>/мес</div>
        <div class="aarrr__base">просмотры флагманского канала · база <b>~4 млн MAU</b></div>
      </li>
      <li class="aarrr__stage">
        <small>Activation</small>
        <div class="aarrr__num tnum">20 <em>→</em> 80%</div>
        <div class="aarrr__base">точность AI-скоринга · <b>blind-тест, n=30</b></div>
      </li>
      <li class="aarrr__stage">
        <small>Retention</small>
        <div class="aarrr__num tnum"><em>~97%</em> CSAT</div>
        <div class="aarrr__base">удовлетворённость · <b>n=2 581</b>, игровой A/B-сервис</div>
      </li>
      <li class="aarrr__stage">
        <small>Referral</small>
        <div class="aarrr__num tnum"><em>3</em> референса</div>
        <div class="aarrr__base">CEO WorkWay · HoP Chill · PM Палитры</div>
      </li>
      <li class="aarrr__stage">
        <small>Revenue</small>
        <div class="aarrr__num tnum"><em>+16%</em> · <em>8</em></div>
        <div class="aarrr__base">к выручке бренда · 8 платных внедрений за 4 мес</div>
      </li>
    </ol>

    <p class="aarrr__watch"><b>Смотрю</b>воронка лид→оплата · правило 7 дней · CPL · CAC · LTV · TCO · цена прогонов в токенах · A/B · ICE/RICE</p>
  </section>
"""

EN = """  <section class="aarrr reveal" id="aarrr" aria-label="AARRR funnel">
    <div class="aarrr__eyebrow">NSM · AARRR</div>
    <h2>I run products on a funnel — from traffic to money</h2>
    <p class="aarrr__sub">Every stage carries a number and its measurement base — no invented coefficients.</p>

    <ol class="aarrr__track">
      <li class="aarrr__stage">
        <small>Acquisition</small>
        <div class="aarrr__num tnum"><em>6.5M</em>/mo</div>
        <div class="aarrr__base">views on the flagship channel · <b>~4M MAU</b> media brand</div>
      </li>
      <li class="aarrr__stage">
        <small>Activation</small>
        <div class="aarrr__num tnum">20 <em>→</em> 80%</div>
        <div class="aarrr__base">AI-scoring accuracy · <b>blind test, n=30</b></div>
      </li>
      <li class="aarrr__stage">
        <small>Retention</small>
        <div class="aarrr__num tnum"><em>~97%</em> CSAT</div>
        <div class="aarrr__base">satisfaction · <b>n=2,581</b>, game-based A/B service</div>
      </li>
      <li class="aarrr__stage">
        <small>Referral</small>
        <div class="aarrr__num tnum"><em>3</em> references</div>
        <div class="aarrr__base">WorkWay CEO · Chill HoP · Palitra PM</div>
      </li>
      <li class="aarrr__stage">
        <small>Revenue</small>
        <div class="aarrr__num tnum"><em>+16%</em> · <em>8</em></div>
        <div class="aarrr__base">to brand revenue · 8 paid deployments in 4 months</div>
      </li>
    </ol>

    <p class="aarrr__watch"><b>Tracked</b>lead→payment funnel · 7-day rule · CPL · CAC · LTV · TCO · token cost per run · A/B · ICE/RICE</p>
  </section>
"""

def swap(path, new):
    s = path.read_text(encoding="utf-8")
    m = re.search(r'  <section class="aarrr reveal".*?</section>\n', s, re.S)
    assert m, "aarrr section not found in " + path.name
    s = s[:m.start()] + new + s[m.end():]
    path.write_text(s, encoding="utf-8")
    print(path.name, "ok,", len(new), "chars")

swap(BASE / "index.html", RU)
swap(BASE / "en.html", EN)
