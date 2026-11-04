# -*- coding: utf-8 -*-
"""Синхронизирует en.html с новой структурой index.html: кейсы, 4 статьи опыта, аватары, навыки, бейджи, hire."""
import pathlib, re

p = pathlib.Path(r"C:\Users\Victor\Desktop\hermes_work\поиск работы\site-clone\en.html")
s = p.read_text(encoding="utf-8")

def swap(pattern, repl, label, flags=re.S):
    global s
    m = re.search(pattern, s, flags)
    assert m, "not found: " + label
    s = s[:m.start()] + repl + s[m.end():]
    print("ok:", label)

# 1) research -> cases
swap(r'  <section id="research">.*?</section>\n\n  <section id="experience">', '''  <section id="cases" aria-label="Cases">
    <div class="aarrr__eyebrow">Cases</div>
    <h2>Four hard results</h2>
    <div class="cases">
      <article class="case">
        <small>Head of Product · WorkWay · June 2026</small>
        <h3>AI-scoring accuracy up 60 p.p.</h3>
        <p>Joined an AI-HR-tech startup as the first PM on a zero product function. Rebuilt the scoring prompt logic and defended strategy to the founder: PRD, OKR, MVP scope — development started two months from concept, Time-to-Hire shrank.</p>
        <div class="res tnum">20% → 80% · blind test, n=30</div>
      </article>
      <article class="case">
        <small>Discovery Product Manager · NewGen Vision · June 2025</small>
        <h3>Discovery system from JTBD — Time-to-Market ×1.8</h3>
        <p>The company had no Discovery process. Turned 80+ deep JTBD interviews into a system: JTBD briefs for production, content plans, a hypothesis-testing pipeline — 2 MVPs validated before any code.</p>
        <div class="res tnum">TTM ×1.8 · revenue per content unit ×1.2</div>
      </article>
      <article class="case">
        <small>Product Researcher · NewGen Vision · May 2025</small>
        <h3>Media brand strategy through a decline</h3>
        <p>The flagship channel (~4M MAU base) was losing views; formats shipped without audience grounding. Set the strategic foundation: audience segmentation, brand platform, first coherent business model.</p>
        <div class="res tnum">6.5M views/month — recovered</div>
      </article>
      <article class="case">
        <small>Product Owner · NewGen Vision · May 2024</small>
        <h3>New product in 3 months — +16% brand revenue</h3>
        <p>Shipped a game-based A/B-testing service from Discovery to release in three months with a team of eleven. Test results fed the product lineup.</p>
        <div class="res tnum">2,581 sessions · CSAT ~97% · +16% revenue</div>
      </article>
    </div>
  </section>

  <section id="experience">''', "research->cases")

# 2) Experience целиком: 4 статьи
swap(r'<h2>Experience</h2>.*?</section>\n\n  <section aria-label="Testimonials">', '''<h2>Experience · 3 years in product</h2>

    <article class="job" style="margin-top:30px">
      <div class="side">
        <h3>Head of Product / Founder</h3>
        <div class="dates">07/2026 — present · 4 mo</div>
        <div class="co">
          <b>Discovery System</b>
          AI-agent integration service for SMBs. Strategy, product, pricing, sales, delivery and team — all mine.
        </div>
        <div class="scale" style="margin-top:12px;font-size:13px;line-height:1.7;color:var(--meta)">Scale: <b style="color:var(--body)">8</b> paid deployments · <b style="color:var(--body)">57</b> channels in the radar · ~<b style="color:var(--body)">20</b> leads/day · <b style="color:var(--body)">13</b>-item lineup · <b style="color:var(--body)">4</b> open studies</div>
      </div>
      <ul>
        <li><b>Strategy and category.</b> Took the slot between integrators (from RUB 49,000, built from scratch) and constructors (subscription without results): the agent runs in the client's environment and comes with their data — removes 152-FZ exposure and account-ban risk.</li>
        <li><b>Economics.</b> Price scales with task size; I compute the client's TCO before the sale. A repeat sale is ~100% margin; payback from month one.</li>
        <li><b>Built the product myself.</b> Agent installer, night inbound bot (qualifies leads by task, budget, deadline), automated payment and delivery — none of it needs me.</li>
        <li><b>Sales.</b> 8 paid deployments in 4 months from two zero-budget channels; the first client came back for more products.</li>
        <li><b>Team.</b> An intern on a revenue share runs installs by SOP; tasks, review and sign-off stay with me.</li>
      </ul>
      <p style="margin-top:14px;font-size:14px;color:var(--meta)">Research: <a href="https://discovery-system.ru" target="_blank" rel="noopener" style="color:var(--accent);border-bottom:1px solid var(--accent-40)">code and method are open — discovery-system.ru</a></p>
    </article>

    <article class="job">
      <div class="side">
        <h3>Head of Product</h3>
        <div class="dates">04/2026 — 06/2026 · 3 mo</div>
        <div class="co">
          <b>WorkWay</b>
          AI-HR-tech startup, B2B SaaS, team of 9. Joined as the first PM on a zero product function — two weeks in, the CEO promoted me to head of the direction.
        </div>
      </div>
      <ul>
        <li><b>Strategy from zero.</b> PRD, OKR, MVP scope, Service Blueprint — defended to the founder and COO; development started two months from concept.</li>
        <li><b>AI scoring.</b> Accuracy from 20% to 80% on a 30-résumé sample (blind test against manual labels); Time-to-Hire shrank.</li>
        <li><b>Monetization before code.</b> 3 tiers + upsells from the Service Blueprint; talked the founder out of a pivot with a canvas analysis.</li>
        <li><b>Team.</b> Hired a fullstack developer and a junior PM: profiles, interview scripts, onboarding, OKRs and 1-on-1s.</li>
      </ul>
      <p style="margin-top:14px;font-size:14px;color:var(--meta)">Research: <a href="https://discovery-system.ru" target="_blank" rel="noopener" style="color:var(--accent);border-bottom:1px solid var(--accent-40)">code and method are open — discovery-system.ru</a></p>
    </article>

    <article class="job">
      <div class="side">
        <h3>Product &amp; Growth Consultant</h3>
        <div class="dates">09/2025 — 04/2026 · 8 mo</div>
        <div class="co">
          <b>Vospriyatie</b>
          consulting for SMBs
        </div>
      </div>
      <ul>
        <li><b>Growth strategies.</b> Three business-optimization strategies across four brands: Wellness, Mental Health, Media.</li>
        <li><b>Implementation.</b> Audience segmentation, marketing mixes, referral mechanics; Pinterest from zero — +14,000 impressions in the first month, no ad budget.</li>
      </ul>
      <p style="margin-top:14px;font-size:14px;color:var(--meta)">Research: <a href="https://discovery-system.ru" target="_blank" rel="noopener" style="color:var(--accent);border-bottom:1px solid var(--accent-40)">code and method are open — discovery-system.ru</a></p>
    </article>

    <article class="job">
      <div class="side">
        <h3>NewGen Vision · Chill Music Lab</h3>
        <div class="dates">01/2024 — 08/2025 · 1 yr 8 mo</div>
        <div class="co">
          <b>Grew inside the company</b>
          media brand, ~4M MAU. Path: CEO business assistant → Product Owner → Product Researcher → Discovery PM. Built the company's product function from zero; synced C-level, product, marketing and design.
        </div>
      </div>
      <ul>
        <li><b>Discovery PM</b> <span style="color:var(--meta)">07–08/2025 · 2 mo</span>. 80+ JTBD interviews → JTBD briefs for production and content plans: TTM ×1.8, revenue per content unit ×1.2, 2 MVPs validated before development.</li>
        <li><b>Product Researcher</b> <span style="color:var(--meta)">07/2024–07/2025 · 13 mo</span>. Strategic foundation through a channel decline: segmentation, brand platform, business model — the channel recovered to 6.5M views/month.</li>
        <li><b>Product Owner</b> <span style="color:var(--meta)">02–07/2024 · 6 mo</span>. Game-based A/B service in 3 months, team of 11: 2,581 sessions, CR ~50%, CSAT ~97%, +16% brand revenue.</li>
        <li><b>CEO business assistant</b> <span style="color:var(--meta)">01/2024–06/2025 · 1 yr 6 mo</span>. Strategic and product decisions: research, presentations, risk management. Hired the company's first two PMs with my own hiring system.</li>
      </ul>
      <p style="margin-top:14px;font-size:14px;color:var(--meta)">Research: <a href="https://discovery-system.ru" target="_blank" rel="noopener" style="color:var(--accent);border-bottom:1px solid var(--accent-40)">code and method are open — discovery-system.ru</a></p>
    </article>
  </section>

  <section aria-label="Testimonials">''', "experience")

# 3) Quotes с аватарами
swap(r'<div class="quotes" style="margin-top:28px">.*?</section>', '''<div class="quotes" style="margin-top:28px">
      <div class="quote-card">
        <span class="avatar" aria-hidden="true">AP</span>
        <div class="q"><i>“</i>You make decisions with judgment and keep your word like a partner — I trust your product logic. You take initiative where nobody expects it.<i>”</i>
          <span class="who"><b>Artur Prusakov</b> · Founder &amp; CEO, WorkWay</span>
        </div>
      </div>
      <div class="quote-card">
        <span class="avatar" aria-hidden="true">KP</span>
        <div class="q"><i>“</i>You go deep into the product and come back with unexpected insights. You ramp up fast and pick everything up on the fly.<i>”</i>
          <span class="who"><b>Kirill Povetiev</b> · Head of Product, Chill Music Lab</span>
        </div>
      </div>
      <div class="quote-card">
        <span class="avatar" aria-hidden="true">AK</span>
        <div class="q"><i>“</i>She mapped the audience, rewrote the website copy — everything used to be smeared, now it lands. That was exactly what was missing.<i>”</i>
          <span class="who"><b>Albina Kartashova</b> · Product Manager, Palitra Zdorovya</span>
        </div>
      </div>
    </div>
  </section>''', "quotes")

# 4) Skills компакт
swap(r'<section id="skills">.*?</section>\n\n  <section id="education"', '''<section id="skills">
    <h2>Skills</h2>
    <div class="skills" style="margin-top:26px">
      <p><b>Strategy.</b> <span>product vision, business modeling, unit economics and TCO, OKR, ICP and ABCDX segmentation, value prop, RAT, Service Blueprint</span></p>
      <p><b>Discovery.</b> <span>CustDev, AJTBD/JTBD interviews, CJM, UX tests, hypothesis testing — 130+ interviews, dozens of research cycles</span></p>
      <p><b>Delivery.</b> <span>MVP 0→1, PRD, roadmap, backlog, sprints, ScrumBan, zero-budget go-to-market, DoR/DoD sign-off, SOPs</span></p>
      <p><b>AI and agents.</b> <span>AI-agent rollout, prompt engineering, process automation, Python, FastAPI, local models</span></p>
      <p><b>Team.</b> <span>hiring from zero, onboarding, OKR, 1-on-1s, performance reviews, teams up to 11</span></p>
      <p><b>Stack.</b> <span>Claude Code, Codex, GitHub, Figma, Miro, Notion, Jira, Confluence, Tilda, Framer, Unisender, SQL, Amplitude</span></p>
    </div>
    <p style="margin-top:18px;font-size:14px;color:var(--meta)">The metrics I run on are in the AARRR funnel above — one per stage.</p>
  </section>

  <section id="education"''', "skills")

# 5) Education с бейджами
swap(r'<section id="education".*?</section>\n\n  <section id="hire">', '''<section id="education" aria-label="Education">
    <h2>Education and projects</h2>
    <div class="rows" style="margin-top:24px">
      <div class="row"><span class="badge" aria-hidden="true">CA</span><span class="row-txt">Claude Academy · AI for Small Business</span><span class="v tnum">2026</span></div>
      <div class="row"><span class="badge" aria-hidden="true">CA</span><span class="row-txt">Claude Academy · AI Limitations and Possibilities</span><span class="v tnum">2026</span></div>
      <div class="row"><span class="badge" aria-hidden="true">CC</span><span class="row-txt">Vibe-coding with Claude · Alexey Krol</span><span class="v tnum">2026</span></div>
      <div class="row"><span class="badge" aria-hidden="true">CX</span><span class="row-txt">Customer experience design · Skillbox</span><span class="v tnum">2025</span></div>
      <div class="row"><span class="badge" aria-hidden="true">VK</span><span class="row-txt">Product Manager, case championship · VK × HSE</span><span class="v tnum">2024</span></div>
      <div class="row"><span class="badge" aria-hidden="true">PU</span><span class="row-txt">Master's, product &amp; project management · SPbPU</span><span class="v tnum">2023–2025</span></div>
      <div class="row"><span class="badge" aria-hidden="true">PU</span><span class="row-txt">Linguistics, theory and methods of teaching foreign languages · SPbPU</span><span class="v tnum">2019–2023</span></div>
      <div class="row"><span class="badge" aria-hidden="true">VTB</span><span class="row-txt">Project lead, internship · VTB × SPbPU</span><span class="v tnum">2021–2022</span></div>
    </div>
  </section>

  <section id="hire">''', "education")

# 6) Hire: exit + references
swap(r'<tr><th scope="row">Start</th><td>.*?</td></tr>', '<tr><th scope="row">Start</th><td>1–3 business days</td></tr>', "start")
swap(r'<tr><th scope="row">References</th><td>.*?</td></tr>', '<tr><th scope="row">References</th><td>five, contacts on request: Founder &amp; CEO WorkWay, Head of Product Chill Music Lab, PM Palitra Zdorovya, CEO NewGen Vision, HRBP NewGen Vision</td></tr>', "references")

# 7) Reveal list
s = s.replace("'#research','#experience'", "'#aarrr','#cases','#experience'")

p.write_text(s, encoding="utf-8")
print("done,", len(s), "chars")
