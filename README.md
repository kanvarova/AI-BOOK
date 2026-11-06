# AI Campus: Eight Challenges, One Festival

An English AI Fundamentals field guide for **weeks 1–8**, with Aliya and AIRI, a navy/cyan design, eight laboratories, and a ten-question final challenge.

## Start

Requires **Node.js 22+**. No package installation, API key, or account is needed. All runtime assets, including StPageFlip, are bundled locally.

```sh
node scripts/serve.mjs
```

Open **http://127.0.0.1:4173**. In Windows, double-click **Start Book.cmd** to start the server and browser. Keep its window open. Use HTTP: file:// may block ES modules.

If npm is available, `npm start`, `npm test`, and `npm run build` are equivalent shortcuts. Direct Node commands work when npm is missing from PATH.

## Features

- 42 English pages: covers, mission, contents, eight chapters, method map, glossary, answers, sources, and final challenge.
- Local StPageFlip 2.0.7: front/back surfaces, geometric fold, moving shadows, corner drag, short-drag cancellation, hard covers.
- Desktop spreads and portrait pages. Height is measured from actual content at the current width; tall pages scroll with the document.
- Book / Reading modes, keyboard navigation, bookmarks, last page, motion preference, visited chapters, local quiz progress.
- Controls and text selection do not initiate page turns. Reduced motion preserves instant keyboard/button navigation.
- Challenge explanations, retry, and review links. Scores are practice feedback, not an official grade.
- Print / PDF styling, expanded answers, static challenge answer sheet.

## Course coverage

1. Agents, observations, actions, objectives, environments.
2. DFS, BFS, UCS, A*: weighted graph, frontier, route, cost.
3. CSP, backtracking, hill climbing, local maxima.
4. Minimax, alpha-beta bounds and pruning, expectimax.
5. MDP, value iteration, Q-learning, exploration, rewards.
6. Bayes' rule, Bayesian networks, impossible evidence.
7. HMM previous belief, prediction, weighting, normalization.
8. Naive Bayes, linear models, metrics, expected-loss decisions.

Week 8 includes classical ML as specified in the syllabus. Later-week topics are excluded.

## Checks and build

```sh
node tests/algorithms.test.mjs
node --check src/app.js
node --check src/labs.js
node scripts/build.mjs
```

The build copies the website into **dist/** for static hosting, including GitHub Pages. Automatic publication is not configured. The book works locally without internet; external bibliography links need a connection.

Independent verification and limitations are in **QA_REPORT.md**. Checks not performed must be marked NOT VERIFIED.

## Project files

- index.html: landing and reader shell.
- styles.css: design, responsive layout, printing.
- src/content.js: chapters, glossary, quiz, bibliography.
- src/algorithms.js: pure computations.
- src/labs.js: lab interfaces.
- src/app.js: pages, navigation, storage, quiz.
- src/vendor/: page-flip 2.0.7, MIT license, local-change notice.
- assets/: character images, campus map, icon.
- scripts/: server and build.
- tests/: independent mathematical and content checks.
- QA_REPORT.md: independent review.
- IMAGE_PROMPTS.md: generated-image provenance and prompts.

## Model assumptions

Search uses a finite graph with positive costs, alphabetical neighbors, and h=Euclidean distance/100. Edge weights dominate this distance; improved states can reopen.

CSP uses four events, two rooms (60/25 seats), two times, and two instructors. The game tree has four leaves and left-first order.

MDP: 4×4, γ=0.9, terminal rewards +10/−10, transitions 0.8/0.1/0.1. Q-learning: α=0.25, at most 150 steps per episode; finite training does not guarantee convergence.

HMM has three zones and binary observations. Classification data are synthetic. Review loss is 1; expected skip loss is P(urgent)×miss cost. Undefined metrics are shown honestly.

Sources: Poole & Mackworth (2023) and UC Berkeley CS 188. The narrative does not imply program consciousness.

## Assets and dependency

StPageFlip 2.0.7 by Oleg Nodlik is included under MIT; see src/vendor/page-flip.LICENSE. A local change cancels its animation-frame loop on destruction for safe responsive reinitialization. See src/vendor/NOTICE.md.

Character art uses built-in image generation; diagrams are original SVG. See IMAGE_PROMPTS.md for final paths and prompts.

## GitHub handoff

Work is on **feature/english-airi-book** in the original AI-BOOK checkout. The earlier edition remains in Git history. Push requires authenticated write access.

After signing in through Git Credential Manager or GitHub CLI:

```sh
git push -u origin main
git push -u origin feature/english-airi-book
```

Open a pull request into main. Do not merge before review.
