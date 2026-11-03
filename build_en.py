# -*- coding: utf-8 -*-
"""Build en.html from the current RU index.html: identical shell/CSS/hairline,
fully translated body. Idempotent: overwrites site-clone/en.html."""
import pathlib

BASE = pathlib.Path(r"C:\Users\Victor\Desktop\hermes_work\поиск работы\site-clone")
src = (BASE / "index.html").read_text(encoding="utf-8")

head, rest = src.split("<header>", 1)
body_old, tail = rest.split("<!--HAIRLINE:START-->", 1)
hair, after = tail.split("<!--HAIRLINE:END-->", 1)

# ---------- HEAD: en meta + lang-switcher CSS ----------
head_en = head.replace('<html lang="ru">', '<html lang="en">', 1)
head_en = head_en.replace(
    "<title>Виктор Зайцев — Head of Product · AI</title>",
    "<title>Viktor Zaitsev — Head of Product · AI</title>", 1)
head_en = head_en.replace(
    '<meta name="description" content="Трижды выстроил Discovery-процесс с нуля, запустил три продукта 0→1. Веду сервис внедрения ИИ-агентов в бизнес-процессы МСБ: 8 платных внедрений за четыре месяца.">',
    '<meta name="description" content="Built Discovery from zero three times; shipped three 0→1 products. Now running an AI-agent integration service for SMBs: 8 paid deployments in four months.">', 1)
head_en = head_en.replace(
    '<meta property="og:title" content="Виктор Зайцев — Head of Product · AI">',
    '<meta property="og:title" content="Viktor Zaitsev — Head of Product · AI">', 1)
head_en = head_en.replace(
    '<meta property="og:description" content="8 платных внедрений ИИ-агентов за 4 месяца с маржой повтора около 100%. Стратегия, продукт, цена, продажи, команда — на мне.">',
    '<meta property="og:description" content="8 paid AI-agent deployments in 4 months at ~100% repeat margin. Strategy, product, pricing, sales, team — all mine.">', 1)
head_en = head_en.replace("%D0%92%D0%97", "VZ", 1)  # favicon ВЗ → VZ
head_en = head_en.replace(
    '<meta property="og:description"',
    '<link rel="alternate" hreflang="ru" href="index.html">\n<link rel="alternate" hreflang="en" href="en.html">\n<meta property="og:locale" content="en_US">\n<meta property="og:description"', 1)
assert '<html lang="en">' in head_en and "VZ" in head_en

LANG_CSS = (".nav__right{display:flex;align-items:center;gap:8px 16px;flex-wrap:wrap}\n"
            ".nav .lang{font-size:13px;font-weight:500;color:var(--ink);border:1px solid var(--line);"
            "border-radius:8px;padding:5px 12px;letter-spacing:.06em;transition:border-color .25s var(--ease),color .25s var(--ease)}\n"
            ".nav .lang:hover{border-color:var(--accent-40);color:var(--accent)}\n")
anchor = ".nav .go:hover{color:var(--accent)}"
assert anchor in head_en
head_en = head_en.replace(anchor, anchor + "\n" + LANG_CSS.rstrip("\n"), 1)

# ---------- BODY: full senior-level EN translation ----------
BODY = """<header>
  <div class="nav">
    <a class="brand" href="#top">Viktor Zaitsev<i>.</i></a>
    <div class="nav__right">
      <a class="go" href="https://t.me/victorpinksight" target="_blank" rel="noopener">Telegram</a>
      <a class="lang" href="index.html" hreflang="ru" aria-label="Russian version">RU</a>
    </div>
  </div>
</header>

<main class="wrap" id="top">
  <div class="hero">
    <div class="hero__text">
      <div class="status">
        <span class="dot" aria-hidden="true"></span>
        <span><b>Open to work</b> · Head of Product &amp; Product Lead · Saint Petersburg, remote</span>
      </div>
      <h1>I take products in chaos<br>and ship them <em>to market</em></h1>
      <p class="lede">Built Discovery from zero three times; shipped three products <span class="ar">0&nbsp;→&nbsp;1</span> across B2B SaaS (HR-tech) and media. Now I run an AI-agent integration service for SMBs: <b>eight paid deployments in four months</b> at ~100% repeat margin — from market research to client sign-off.</p>
      <div class="actions">
        <a class="btn btn--p" href="https://t.me/victorpinksight" target="_blank" rel="noopener">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.9 4.3 18.9 19c-.2 1-.8 1.2-1.6.8l-4.5-3.3-2.2 2.1c-.2.2-.5.5-1 .5l.3-4.4 8.1-7.3c.3-.3 0-.5-.5-.2L7.5 13.3l-4.2-1.3c-.9-.3-.9-.9.2-1.3l16.4-6.3c.8-.3 1.4.2 1.1 1z"/></svg>
          Message me on Telegram
        </a>
        <a class="btn btn--g" href="#experience">Experience &amp; numbers</a>
      </div>
    </div>
    <figure class="hero__fig">
      <div class="figure" data-hairline role="img" aria-label="Four items on a desk: a monitor, a notebook, a stack of books, and a phone. Hover an item to highlight it, click to jump to its section."></div>
      <div class="hero__read" aria-live="polite">rest</div>
      <figcaption class="hero__cap">Hover an item — it lifts and lights up; click to jump to the section. The phone opens Telegram.</figcaption>
    </figure>
  </div>

  <section id="figures" aria-label="Key numbers">
    <div class="figures">
      <div class="f">
        <div class="n tnum">8</div>
        <div class="d">paid deployments — repeat sales cost close to zero, the product is built once</div>
      </div>
      <div class="f">
        <div class="n tnum"><em>×1.8</em></div>
        <div class="d">faster time-to-market after JTBD segmentation, <b>internal measurement</b></div>
      </div>
      <div class="f">
        <div class="n tnum"><em>+16%</em></div>
        <div class="d">added to a media brand's annual revenue: <b>format A/B tests</b></div>
      </div>
      <div class="f">
        <div class="n tnum">20 <span class="ar">→</span> 80%</div>
        <div class="d">AI-scoring accuracy, <b>blind test on 30 résumés</b></div>
      </div>
    </div>
  </section>

  <section id="research">
    <h2>I sized the lost-AI-account market</h2>
    <div class="estimate tnum" style="margin-top:24px">RUB 1–4.3B <span>a year</span></div>
    <div class="estimate-cap">estimate range · 86K paying users</div>
    <p>I built and published the first estimate of losses from AI-account bans: how many people lost access for good, how much burned in paid subscriptions. Four public studies in total, each with method and sources: 16 OSINT cases, 200,000 Monte Carlo runs, six model versions with self-audit. The estimate is reproducible — <a href="https://discovery-system.ru" target="_blank" rel="noopener">code and method are open</a>.</p>
    <div class="corridor">
      <div class="track" aria-hidden="true"><span class="band"></span></div>
      <div class="ends tnum"><span>RUB 1B</span><span>RUB 4.3B</span></div>
      <div class="cap">lower and upper bound of the range; the wide interval is the model's honest uncertainty</div>
    </div>
  </section>

  <section id="experience">
    <h2>Experience</h2>

    <article class="job" style="margin-top:30px">
      <div class="side">
        <h3>Head of Product / Founder</h3>
        <div class="dates">07/2026 — present</div>
        <div class="co">
          <b>Discovery System</b>
          AI-agent integration for SMB workflows. Strategy, product, pricing, sales, delivery, and team — all mine.
        </div>
      </div>
      <ul>
        <li><b>Strategy &amp; category.</b> Mapped ~100 competitor offers and took the gap between integrators (custom builds) and no-code builders (subscriptions with no outcome): the agent runs inside the client's own stack and ships with the data — clearing 152-FZ and account-ban risk. Segmented SMBs by cost of error.</li>
        <li><b>Business math.</b> Unit economics and TCO: I price by task scale and run the client's numbers before the sale. Repeat sales carry ~100% margin — the product is built once, payback starts in month one.</li>
        <li><b>Product analytics.</b> Funnel from lead to payment, CPL and CAC by channel, LTV and the CAC/LTV guardrail, parser runs costed in tokens. Channels live or die by the numbers — a dead channel is cut on day seven.</li>
        <li><b>Product — built it myself.</b> <b>Agent installer</b>: deploys the agent onto the client's machine and hands it over whole, with skills for the job. <b>Night inbound bot</b>: a Telegram Business bot that answers as the owner, separates business from personal, qualifies leads by task, segment, budget, and timeline, and pushes hot ones through. <b>Auto-delivery</b>: payment and handover run without me.</li>
        <li><b>Marketing &amp; demand.</b> SEO/GEO loop: landing page, geo pages, an open repo for AI search. A Telegram channel plus VC.ru investigations — one case repackaged into five formats. A cron-driven TG radar: 57 channels, ~20 fresh orders a day, plus tender-board and Avito parsers.</li>
        <li><b>Sales &amp; sign-off.</b> Eight paid deployments in four months from two channels with zero ad spend — Avito and Kwork; the first client came back for more. I lock acceptance criteria before work starts and test on the client's own tasks, with the client watching. In progress: cadastral and maps automation for a real-estate client.</li>
        <li><b>Team.</b> A commission-paid trainee runs installs to SOP; tasks, oversight, and sign-off are mine.</li>
      </ul>
    </article>

    <article class="job">
      <div class="side">
        <h3>Head of Product</h3>
        <div class="dates">04/2026 — 06/2026</div>
        <div class="co">
          <b>WorkWay</b>
          AI HR-tech startup, B2B SaaS, team of nine. Joined as the first PM on a zero product function — the CEO promoted me to head of the function within two weeks.
        </div>
      </div>
      <ul>
        <li><b>Strategy &amp; roadmap from zero.</b> PRD, OKRs, MVP scope, service blueprint, UX flow — defended in front of the founder and COO; engineering started building two months after concept.</li>
        <li><b>Candidate AI scoring.</b> Reworked the prompt logic: accuracy <b>from 20% to 80%</b> on a 30-profile pilot (blind test against manual labels); time-to-hire fell.</li>
        <li><b>Monetization before code.</b> Three tiers plus upsell features from the service blueprint — locked check growth and LTV before the first line of code. Talked the founder out of a pivot with a canvas teardown.</li>
        <li><b>Team from zero.</b> Hired a full-stack developer and a junior PM: profiles, interview scripts, onboarding, OKRs, 1-on-1s.</li>
      </ul>
    </article>

    <article class="job">
      <div class="side">
        <h3>Product &amp; Growth Consultant</h3>
        <div class="dates">09/2025 — 04/2026</div>
        <div class="co">
          <b>Vospriyatie</b>
          consulting for SMBs
        </div>
      </div>
      <ul>
        <li>Built three growth and cost-optimization strategies and advised four brands: wellness, mental health, media.</li>
        <li>Shipped audience segmentation, marketing mixes, and referral mechanics; a from-scratch Pinterest launch drove +14,000 impressions in month one with zero ad spend.</li>
      </ul>
    </article>

    <article class="job">
      <div class="side">
        <h3>Discovery Product Manager</h3>
        <div class="dates">07/2025 — 08/2025</div>
        <div class="co">
          <b>NewGen Vision · Chill Music Lab</b>
          media brand, ~4M MAU. Grew inside the company: CEO's business assistant → Product Owner → Product Researcher → Discovery PM — built the product function from scratch.
        </div>
      </div>
      <ul>
        <li><b>Context.</b> The company had no Discovery process: format calls were made without validation, while product, marketing, and design ran out of sync with the C-suite.</li>
        <li><b>Mechanism.</b> Turned 80+ in-depth JTBD interviews and eight research cycles into a system: JTBD briefs for production, content plans, and hypothesis testing — 2 MVPs validated before build.</li>
        <li><b>Number.</b> Time-to-market <b>×1.8</b>, revenue per content unit ×1.2.</li>
      </ul>
    </article>

    <article class="job">
      <div class="side">
        <h3>Product Researcher</h3>
        <div class="dates">07/2024 — 07/2025</div>
        <div class="co">
          <b>NewGen Vision · Chill Music Lab</b>
          media brand, ~4M MAU
        </div>
      </div>
      <ul>
        <li><b>Context.</b> The flagship channel had tipped into decline: views were falling, new formats launched with no read on the audience.</li>
        <li><b>Mechanism.</b> Defined the brand's strategic foundation: audience segmentation, brand platform, and its first coherent business model. Shepherded new-format launches, sharpening the business value and product logic of every release.</li>
        <li><b>Number.</b> The channel climbed back to <b>6.5M views a month</b>.</li>
      </ul>
    </article>

    <article class="job">
      <div class="side">
        <h3>Product Owner</h3>
        <div class="dates">02/2024 — 07/2024</div>
        <div class="co">
          <b>NewGen Vision · Chill Music Lab</b>
          media brand, ~4M MAU
        </div>
      </div>
      <ul>
        <li><b>Context.</b> Formats were tested “live” on the audience — expensive and slow. We needed a cheap way to validate hypotheses before production spend.</li>
        <li><b>Mechanism.</b> Shipped a game service for A/B testing, from discovery to release in three months with an eleven-person team.</li>
        <li><b>Number.</b> 2,581 completions, ~50% conversion, ~97% CSAT — the test results added <b>+16% to brand revenue</b>.</li>
      </ul>
    </article>
  </section>

  <section aria-label="Testimonials">
    <h2>What people I worked with say</h2>
    <div class="quotes" style="margin-top:28px">
      <div class="q"><i>“</i>You make level-headed decisions and keep your word as a partner — I trust your product judgment. You take initiative exactly where none is expected.<i>”</i>
        <span class="who"><b>Artur Prusakov</b> · Founder &amp; CEO, WorkWay</span>
      </div>
      <div class="q"><i>“</i>You go deep into the product and come back with unexpected insights. You ramp into anything new fast and pick it all up on the fly.<i>”</i>
        <span class="who"><b>Kirill Povetiev</b> · Head of Product, Chill Music Lab</span>
      </div>
      <div class="q"><i>“</i>You defined the audience and rewrote the site copy — before, everything was vague; now it lands. It was exactly what was missing.<i>”</i>
        <span class="who"><b>Albina Kartashova</b> · Product Manager, Palitra Zdorovya</span>
      </div>
    </div>
  </section>

  <section id="skills">
    <h2>Skills</h2>
    <div class="skills" style="margin-top:26px">
      <p><b>Strategy &amp; decisions.</b> <span>product vision, business modeling, unit economics &amp; TCO, OKRs, ICP &amp; ABCDX segmentation, UVP, risk management (RAT), marketing mix, service blueprint</span></p>
      <p><b>Discovery &amp; research.</b> <span>market &amp; competitor analysis, CustDev, AJTBD &amp; JTBD interviews, CJM, UX tests, corridor estimates, surveys, hypothesis testing, 130+ in-depth interviews, dozens of research cycles</span></p>
      <p><b>Analytics &amp; growth.</b> <span>NSM &amp; metric trees (AARRR), AVD, CTR, watch time, retention, churn, A/B tests, ICE/RICE prioritization, CPL, CAC, LTV, token-cost measurement</span></p>
      <p><b>Launch &amp; delivery.</b> <span>MVP 0→1, PRD, roadmap, user flows, backlog, sprints, ScrumBan, zero-budget go-to-market, DoR/DoD acceptance, SOPs</span></p>
      <p><b>AI &amp; agents.</b> <span>AI-agent integration, LLMs &amp; prompt engineering (accuracy 20% → 80%), business-process automation, Python, FastAPI, local models</span></p>
      <p><b>Team.</b> <span>hiring from zero (profiles, scripts, test tasks, offers), onboarding, OKRs, 1-on-1s, performance syncs, teams of up to 11</span></p>
      <p><b>Tools.</b> <span>Claude Code, Codex, GitHub, Figma, Miro, Notion, Jira, Confluence, Tilda, Framer, Unisender, Yandex Wordstat, Excel, Amplitude</span></p>
    </div>
  </section>

  <section id="education" aria-label="Education">
    <h2>Education</h2>
    <div class="rows" style="margin-top:24px">
      <div class="row"><span>Claude Academy · AI for Small Business</span><span class="v tnum">2026</span></div>
      <div class="row"><span>Claude Academy · AI Limitations and Possibilities</span><span class="v tnum">2026</span></div>
      <div class="row"><span>Vibe-coding with Claude · Alexey Krol</span><span class="v tnum">2026</span></div>
      <div class="row"><span>Customer experience design · Skillbox</span><span class="v tnum">2025</span></div>
      <div class="row"><span>Product Manager, case championship · VK × HSE</span><span class="v tnum">2024</span></div>
      <div class="row"><span>Master's, product &amp; project management · SPbPU</span><span class="v tnum">2023–2025</span></div>
      <div class="row"><span>Linguistics, theory and methods of teaching foreign languages · SPbPU</span><span class="v tnum">2019–2023</span></div>
      <div class="row"><span>Project lead, internship · VTB × SPbPU</span><span class="v tnum">2021–2022</span></div>
    </div>
  </section>

  <section id="hire">
    <h2>Looking for</h2>
    <table class="seek" style="margin-top:22px">
      <tbody>
        <tr><th scope="row">Role</th><td>Product Lead or Head of Product. I own the product end to end: research, strategy, lineup, pricing, metrics, hiring, and sign-off — no daylight between decision and outcome</td></tr>
        <tr><th scope="row">Product</th><td>B2B SaaS, AI agents &amp; process automation, media &amp; subscriptions. Any stage: 0→1, chaos turnarounds, scale after product-market fit</td></tr>
        <tr><th scope="row">Format</th><td>remote or hybrid, Saint Petersburg; full-time; open to business trips. Teams of three and up — I know how to build them; the largest I ran was eleven</td></tr>
        <tr><th scope="row">Start</th><td>two weeks; sooner if the project is burning</td></tr>
        <tr><th scope="row">Pay</th><td>RUB 320,000–550,000 + % of net revenue</td></tr>
        <tr><th scope="row">References</th><td>three, contacts on request: Founder &amp; CEO of WorkWay, Head of Product at Chill Music Lab, PM at Palitra Zdorovya</td></tr>
        <tr><th scope="row">Languages</th><td>Russian native, English C1 — working, German A1, French A2</td></tr>
      </tbody>
    </table>
  </section>

  <section aria-label="Contact">
    <div class="contact">
      <h2>Let's talk product?</h2>
      <p>I reply within a day. Résumé and install portfolio on request.</p>
      <div class="actions">
        <a class="btn btn--g" href="mailto:viktor.garnett@yandex.ru">viktor.garnett@yandex.ru</a>
      </div>
      <div class="links">
        <a href="https://www.linkedin.com/in/victor-zaitsev-product/" target="_blank" rel="noopener">linkedin.com/in/victor-zaitsev-product</a>
        <a href="https://discovery-system.ru" target="_blank" rel="noopener">discovery-system.ru</a>
      </div>
    </div>
  </section>

  <footer>© 2026 Viktor Zaitsev</footer>
</main>

<script>
(function(){
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var els = ['#research','#experience','section[aria-label="Contact"]']
    .map(function(s){ return document.querySelector(s); }).filter(Boolean);
  els.forEach(function(el){ el.classList.add('reveal'); });
  var show = function(el){ el.classList.add('on'); };
  var near = function(el){ return el.getBoundingClientRect().top < innerHeight; };
  document.documentElement.classList.add('anim');
  if (!('IntersectionObserver' in window)){ els.forEach(show); return; }
  var io = new IntersectionObserver(function(l){
    l.forEach(function(e){ if (e.isIntersecting){ show(e.target); io.unobserve(e.target); } });
  }, {rootMargin:'0px 0px -6% 0px', threshold:.04});
  els.forEach(function(el){ near(el) ? show(el) : io.observe(el); });
  addEventListener('scroll', function(){
    els.forEach(function(el){ if (near(el)) { show(el); io.unobserve(el); } });
  }, {passive:true, once:true});
  setTimeout(function(){ els.forEach(show); }, 2400);
})();
</script>
"""

# ---------- HAIRLINE: translate figure readout names ----------
hair_en = hair
for ru, en in [('"связь"', '"contact"'), ('"кейсы"', '"cases"'),
               ('"навыки"', '"skills"'), ('"учёба"', '"study"')]:
    n = hair_en.count("name: " + ru)
    assert n == 1, (ru, n)
    hair_en = hair_en.replace("name: " + ru, "name: " + en)

out = head_en + BODY + "<!--HAIRLINE:START-->" + hair_en + "<!--HAIRLINE:END-->" + after
(BASE / "en.html").write_text(out, encoding="utf-8")
print("en.html bytes:", len(out.encode("utf-8")))

import re
cyr = re.findall(r"[А-Яа-яЁё]", out)
print("cyrillic chars left in en.html:", len(cyr))
for must in ["victorpinksight", "viktor.garnett@yandex.ru", "discovery-system.ru",
             "linkedin.com/in/victor-zaitsev-product", 'href="index.html"',
             "07/2026", "2,581", "200,000", "14,000", "6.5M", "~4M MAU",
             "20 <span", "152-FZ", "×1.8", "+16%", "À".replace("À", ""), "C1", "A1", "A2", "aarrr__stage"]:
    assert must in out, must
print("all fact anchors present")
