# SparkPath — Roadmap

What's built, what's next, and the ideas we want to explore. As of 2026-10-31. New to the project? Start with the README's **For collaborators** section, then read this.

Details live in `docs/`: [PLAN](docs/PLAN.md) · [ARCHITECTURE](docs/ARCHITECTURE.md) · [DESIGN](docs/DESIGN.md) · [DECISIONS](docs/DECISIONS.md) · [UI_UX](docs/UI_UX.md) · [RESEARCH](docs/RESEARCH.md) · [DEPLOY](docs/DEPLOY.md).

---

## 1. Built today

| Area | What works |
| --- | --- |
| Parent demo | One-click private copy of Arjun (9, Minecraft + cricket) with 3 weeks of history |
| Weekly plan | Interest-themed missions, a warm-up (movement break), a choice of two versions, rewards from Qloo, reading list, focus playlist, weekend activity |
| Logging | One tap (Done / Partly / Skipped / Hard moment), minutes chips, notes, reward picker |
| Insights | Engagement chart, fading detection v2 with confidence and plain-language evidence, Rest → retry, break weeks, "what works", notes from memory, next interests from Qloo |
| School card | Daily school–home targets, shared by parent and teacher, home reward |
| Teacher view | Class of five, one lesson → a hook per child, Daily cards tab, print |
| AI | Claude planner agent with tools + grounding (every pick must be a real Qloo entity), offline planner fallback, AI-alone comparison |
| Qloo | Live API with kid lens (`filter.tags`), smart interest resolution, caching |
| Safety | Adult-only, no medical wording (lint on output and UI), age-fit filter, consent + delete |
| Quality | 44 tests, evaluation harness (`npm run eval`), simulator for fading detection |

---

## 2. Next up (priority order)

| # | Feature | Why | Size |
| --- | --- | --- | --- |
| 1 | **Claude key on + real agent runs** | Agent-written plans, the age-fit check for games, the judged AI-alone comparison | S |
| 2 | **Topic interests as Qloo tags** ("football", "space", "dinosaurs") | Generic words resolve to odd entities today; `signal.interests.tags` fixes it (D-10) | M |
| 3 | **Hindsight memory live** | Real recall + reflect instead of the local fallback | S |
| 4 | **Add / pause interests** with Qloo type-ahead | Interests page is read-only today | M |
| 5 | **Real accounts** (email magic link) and onboarding with consent | Needed beyond the demo | M |
| 6 | **Printable mission cards + fridge/TV board** with a QR back to logging; bionic-reading and dyslexia-font toggles | Child sees missions without a screen app (RESEARCH Tier 2) | M |
| 7 | **Visual timer** with estimated vs actual minutes | Time blindness support; table stakes in other apps | S |
| 8 | **Weekly digest** (email) with parent-chosen cadence, no streak nags | CalmReminder findings; AADC std 13 | M |
| 9 | **Privacy page, retention policy, export** | COPPA 2025 rule, DPDP, parent trust | S |
| 10 | **Teacher → parent share** of the week's lesson hooks | Closes the home–school loop | M |

---

## 3. Gamified experience (planned)

Kids with ADHD respond to immediate, frequent rewards, and every reward system goes stale within weeks. SparkPath already detects that staleness, so the game layer can **rotate with the child's interests** instead of wearing out. It is designed for adults to run with the child, and it follows our safety rules (§4).

### 3.1 Interest Seasons
- Each fading/new interest cycle becomes a **Season** (3–4 weeks, matching how long novelty lasts). Season 1: *Cricket Cup*. Season 2: *Building Worlds* (from Qloo's next-interest picks).
- A season has a theme, a small **story arc** across the week's missions ("the stadium needs scoreboards, then seating, then a pitch map"), and a finale mission.
- When the scorer flags fading, the parent can **start the next season** in one tap; that's the existing Rest → retry + Try next flow with a story wrapper.

### 3.2 Collections, not streaks
- **Badges per interest and per skill** ("Run-rate Reckoner", "Fort Architect", "Kind Hands ×5"), earned by doing, never lost.
- A **sticker book** page per season, printable for the fridge.
- **Weekly progress rings** (missions, reading, school card) that reset gently each week. No streak counters, no "you broke your streak".

### 3.3 Rewards that come from the taste graph
- The reward menu already comes from Qloo (an episode, a chapter, a dance break). Next: **unlockable reward tiers**: small ones after any mission, a bigger one after a season finale (a film night picked from the child's Qloo results).
- **Child picks the reward** from 2–4 options (already built); later, the child can add their own ideas for the parent to approve.

### 3.4 Avatar / companion (adult-controlled, offline-friendly)
- A simple **character that wears the current season's theme** (a cricket kit, a block-built helmet), shown on the printable card and the TV board.
- It changes with the season, so it stays new without endless unlockables.

### 3.5 Co-op, never competition
- **Family quests**: parent and child do side-by-side missions ("do it together" timer, body doubling).
- **Class team goals** for teachers: the whole class fills one jar together (school cards met). No leaderboards between children.

### 3.6 Guardrails for the game layer
| Do | Don't |
| --- | --- |
| Immediate small rewards, child choice | Loot boxes, random paid rewards |
| Badges that are never taken away | Point deductions, losing progress |
| Weekly rings that reset kindly | Streak counters, guilt notifications |
| Seasons that change with interests | Endless grind to keep a child on screen |
| Cooperative goals | Leaderboards comparing children |
| Adult approves what the child sees | The child chatting with an AI |

These follow the UK Age Appropriate Design Code (std 13, no nudges that extend use), EU AI Act Art. 5(1)(b) (no exploiting age-related vulnerability), and the research in [docs/RESEARCH.md](docs/RESEARCH.md) (response cost lowers motivation; immediate reward works).

---

## 4. Later / exploring

- **Mood tag** on a log (optional emoji) and a calm "hard moment" card with three steps.
- **Child self-check** ("Did I finish? 👍/👎") next to the parent's rating.
- **Praise prompts** for parents ("name one thing that went well today").
- **Novelty slot**: one diverse discovery pick per week (MMR on taste tags), with adoption tracked.
- **Explainability card**: "Recommended because fans of Minecraft and cricket also love it; shared tags: building, team".
- **Multi-language** (Hindi first), **multiple children** per parent, **co-parent** accounts.
- **Content ratings feed** (Common Sense / BBFC) behind the age-fit filter.
- **Red-team evaluation** of the planner with a child-safety prompt set (MinorBench / SproutBench subsets).
- **Pricing**: free for teachers; parent plan ~$6–10/month; school pilots per student.

## 5. Will not build

Child-facing AI chat · webcam or eye tracking · wearables · diagnosis, screening or symptom scores · medical claims · selling or sharing children's data · ads.

---

## 6. How to pick something up

1. Pick an item above and open a GitHub issue ("I'm on #4: add/pause interests").
2. Branch from `main`: `feat/<short-name>`.
3. Read the matching doc section; record any real choice in `docs/DECISIONS.md` with the template at the bottom.
4. `npm test` and `npm run typecheck` before you push; open a pull request.
