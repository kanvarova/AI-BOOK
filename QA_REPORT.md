# Independent QA Report

Reviewed: 6 November 2026. Reviewer: independent QA Reviewer subagent.

Scope: the supplied AI-BOOK request, eight English chapters for weeks 1–8, interactive algorithms, physical page turning, accessible reading and independent review. Working tree: `feature/english-airi-book`. Browser interactions, screenshot inspection, automated tests and targeted source checks are complete within the limitations below.

## Automated tests and source review

| Requirement | Method | Expected result | Observed result | Status | Evidence |
|---|---|---|---|---|---|
| Algorithm and content regression tests | `node tests/algorithms.test.mjs` | All meaningful checks pass | 13 tests passed, 0 failed | PASS | tests/algorithms.test.mjs; Node v24.22.1 |
| Static production build | `node scripts/build.mjs` | Complete build | Built dist successfully | PASS | Exit code 0 |
| Eight English chapters | Import content, inspect fields and lab IDs | Eight complete chapters, distinct in-scope labs | All eight present; substantial chapter fields and four concepts each | PASS | Content test |
| Excluded course material | Test chapter/glossary/challenge text and inspect algorithm exports | No weeks 9–10 teaching material | No neural/perceptron/LLM sections remain in inspected content | PASS | Scope test; src/algorithms.js |
| English application source | Unicode scan of index and app/labs/algorithm/content source | No Cyrillic visible strings | No Cyrillic found | PASS | Source-language test |
| Search routes and costs | All node pairs, four methods; compare A* with UCS | Valid routes; optimal weighted costs agree | BFS example 12, UCS/A* 8; all-pair paths valid | PASS | Search test |
| Heuristic conditions | Every edge in both directions for every goal | Consistency inequality holds | 42 edge/goal cases passed | PASS | Heuristic test |
| CSP and hill climbing | Capacity, room, teacher conflicts; full backtracking; local optima | Correct detection and feasible solution | Checks passed; local maximum 6 distinct from global 9 | PASS | CSP test |
| Minimax, alpha-beta and expectimax | 2,401 leaf combinations compared with direct formulas; five probability settings | Exact formula agreement | All passed | PASS | Exhaustive game-tree test |
| Game intermediate frames | Bounds, pruning, snapshots and chosen branch assertions; inspect UI | Trace available for teaching | Bound alpha=3/beta=2 and pruned leaf recorded; choice left | PASS | Frame test; game builder |
| Bayes and impossible evidence | Hand posterior and endpoints | 9/13 posterior; null at impossible signal | Correct | PASS | Bayes test |
| HMM arithmetic | Light and dark hand calculations, 100 sequential steps | Correct prediction, evidence probability and normalized posterior | Correct; all beliefs finite and normalized | PASS | HMM test |
| HMM teaching stages | Inspect lab implementation | Previous, prediction, weights, Z, posterior | All explicitly rendered in code | PASS | src/labs.js hmm builder; browser rendering pending |
| MDP and value iteration | Walls, probability mass, first Bellman update and fixed point | Valid transitions and values | Q(2,right)=7.96 on first iteration; residual below 1e-9 | PASS | MDP test |
| Q-learning terminal handling | Seeded 500 episodes plus forced path with terminal Q=999 | No terminal bootstrap | Final Q update exactly 2.5; finite values and step cap | PASS | Q-learning test |
| Classification metrics | All-negative and empty-count examples | Accuracy .95, recall 0, precision undefined | Correct null values | PASS | Metrics test |
| Naive Bayes | All feature combinations and hand posterior | Correct normalization | P(urgent|both)=.875 | PASS | Metrics/NB test |
| Challenge structure | Inspect 10 questions, valid answer indices, explanations and chapters | 8–12 questions covering all eight chapters | Ten questions, all eight covered | PASS | Challenge test |
| npm availability in this environment | Run npm commands | Available if documented as required | npm not on PATH; direct Node scripts work | NOT VERIFIED | npm commands could not run; direct commands passed |

## Reference checks

Opened the following authoritative pages through the web tool. They resolve and support the corresponding core explanations:

- [Poole and Mackworth, Artificial Intelligence, 3rd ed.](https://artint.info/3e/html/ArtInt3e.html): authors, edition, publisher and 2023 date verified.
- [Berkeley informed search](https://inst.eecs.berkeley.edu/~cs188/textbook/search/informed.html): heuristic-guided search and A*.
- [Berkeley CSP](https://inst.eecs.berkeley.edu/~cs188/textbook/csp/csps.html): variables, domains and constraints.
- [Berkeley minimax](https://inst.eecs.berkeley.edu/~cs188/textbook/games/minimax.html): adversarial value propagation.
- [Berkeley value iteration](https://inst.eecs.berkeley.edu/~cs188/textbook/mdp/value-iteration.html): Bellman value updates.
- [Berkeley Bayesian networks](https://inst.eecs.berkeley.edu/~cs188/textbook/bayes-nets/representation.html): probabilistic representation.
- [Berkeley HMMs](https://inst.eecs.berkeley.edu/~cs188/textbook/hmms/hmm.html): prediction, likelihood update and normalization.
- [Berkeley Naive Bayes](https://inst.eecs.berkeley.edu/~cs188/textbook/ml/naive-bayes.html): conditional feature independence and product of likelihoods.

This is a targeted source check, not a claim that every sentence has an individually audited citation. Numerical examples were independently checked by tests.

## Remediation history

Baseline issues reported independently: ten Russian chapters; excluded neural/LLM code; incomplete agent cycle, game trace and HMM stages. Main agent revised implementation. Source and test rechecks confirm eight English chapters, five-stage agent cycle, game bound frames and complete HMM calculation fields. Their visible presentation was subsequently checked in the browser as recorded below.

The first revised test run found two test-harness false positives: a substring scope pattern matched “Bellman”, and an arbitrary prose-length threshold rejected a complete arithmetic explanation. The reviewer corrected the scope pattern to whole words and accepted concise nonempty explanations. No application behavior was changed to satisfy these false positives.

The browser results and remaining NOT VERIFIED checks are recorded below.

## Independent browser review

Browser: Codex in-app Chromium preview at `http://127.0.0.1:4173`. Tested viewports: default 1280×720, desktop 1440×960, mobile 390×844. The website currently contains 42 pages, including separate challenge briefing and ending pages; counts shown in navigation match the rendered book.

| Requirement | Method | Expected result | Observed result | Status | Evidence |
|---|---|---|---|---|---|
| Landing appearance and imagery | Visual screenshot inspection | Dark/cyan lab design, original robot, legible text | Matches intended design language; images load | PASS | Browser screenshot and DOM image complete/naturalWidth check |
| Eight working labs | UI selections/buttons in Reading mode | Inputs update correct visible calculations | All eight exercised; values below | PASS | Independent interaction notes below |
| Bayes zero-evidence case and reset | Set sensitivity and false-positive sliders to zero, then Reset | Undefined posterior explained; initial state restored | Correct message; reset gives 69.2% | PASS | Visible laboratory result |
| Game-tree pruning | Select alpha-beta and Calculate all | Root3, left choice, fourth leaf pruned | Root3;6 visited; leaf4 pruned | PASS | Visible result |
| HMM stages | Click Observe | Previous, prediction, weights, Z and normalized posterior | Posterior53.3/33.3/13.3%; Z=.5; sum1 | PASS | Visible result |
| MDP/Q-learning | Step value iteration, select cell2; switch to Q-learning and episode | Counts/values update | Iteration1; action scores displayed; episode1 reward8.6 and Q2,right2.5 | PASS | Visible result; stochastic episode value is one observed sample |
| Naive Bayes and confusion matrix | Check both feature boxes | Posterior87.5%, review recommendation; initial metrics | Correct values; accuracy95%, precision undefined, recall0% | PASS | Visible result |
| CSP conflicts and backtracking | Assign Robotics to small room, reset, step until complete | Capacity conflict then feasible full schedule | Correct conflict and feasible schedule | PASS | Visible result |
| Agent model and search | Select stochastic transitions, step; choose BFS and advance | Stochastic explanation; BFS cost12 | Both correct | PASS | Visible result |
| Complete challenge | Answer all10, show results, retry | Explanations,10/10 and restart | Correct feedback and retry to question1 | PASS | Visible quiz result |
| Contents and bookmark navigation | Open HMM from contents, save bookmark, navigate and restore | Correct chapter/spread | Bookmark returns to28–29 | PASS | Visible labels/toast |
| Resume and motion preference | Save place34 and Motion off, reload, Resume | Restore page34 and preference | Both restored | PASS | Visible labels |
| Keyboard navigation | Focus Next and press ArrowRight | Advance one mobile page |33→34 | PASS | Visible page label |
| Physical page turning | Next/Previous screenshots during motion | Deformed sheet, reverse side, shadow and reveal | Visible deforming sheet and reverse-side content | PASS | artifacts/qa-page-turn.jpg |
| Corner cancellation and completion | Short drag bottom-right1250,820→1225,800; full drag→220,800 | Short returns; full advances |8–9 retained; full advances10–11 | PASS | Visible page labels after gestures |
| Controls do not turn pages | Click Search Step in Book mode | Same spread and computed update | Spread10–11 retained; currentS/expanded1 | PASS | Visible result |
| Lab state persists during turns | Step search, Next, Previous | Same currentS/expanded1 | State retained | PASS | Visible result |
| Mobile horizontal fit | DOM dimensions at390×844; all Reading-mode pages | No horizontal overflow/clipped width | document width375≤390; no overflowing page contents | PASS | Read-only DOM measurement |
| Fixed page height fit | Compare content scrollHeight/clientHeight in Book mode | No internally clipped content | No content overflow found in inspected DOM | PASS | DOM measurement; pages require ordinary browser vertical scrolling |
| Console and images | Captured error/warn logs, image load inspection | No warnings/errors or missing assets | Empty logs; no incomplete/zero-width images | PASS | Browser dev logs and DOM |
| Reading→Book position | Go HMM while reading, allow scroll to settle, pointer-click sticky Book mode | Preserve HMM | After fixes, retains HMM pages28–29 | PASS | Direct pointer recheck below |
| Automatic OS reduced-motion detection | Actual preference emulation | Reduced transition | Manual Motion off tested; OS preference not emulated | NOT VERIFIED | Manual toggle passed |
| Full WCAG contrast and focus audit | All states audit | Accessible contrast/focus | Text visually readable; complete audit not performed | NOT VERIFIED | No blanket accessibility claim |
| Print/PDF | Print output inspection | Complete content | No output inspected | NOT VERIFIED | Not performed |
| Real touch and screen reader | Hardware/assistive technology | Working gestures and reading | Not available/used | NOT VERIFIED | No physical-device or screen-reader claim |

### Resolved issue: reading-mode location

**Medium — Reading mode loses location when returning to Book mode.**

1. Open book and Reading mode.
2. Open Contents and select chapter7/HMM (page28).
3. Confirm the chapter label says HMM and the document is scrolled to that chapter.
4. Click Book mode.

Expected: preserve the chapter/spread. Observed: opens cover page1. Independent read-only DOM inspection shows `.reader-tools` is `position: static` and far above the viewport. Locating/clicking its Book mode button scrolls back to the toolbar; the reading-scroll handler overwrites the selected current page before mode switching. The first attempted fix (capturing requested page during PageFlip initialization) did not resolve this separate toolbar-scroll effect. Main agent notified with reproduction and measurements.

### Evidence limits

The short/full corner tests use mouse dragging, not real touch hardware. The book contains tall fixed sheets and uses ordinary browser scrolling to access lower content; no internal truncation was found. Passing arithmetic and sampled UI checks do not prove exhaustive behavior for all possible inputs.

### Browser recheck: mode preservation

The main agent made the reader toolbar sticky and preserved the requested page across PageFlip initialization. After the HMM Reading-mode scroll settled, an actual pointer click on the visible sticky Book mode button retained HMM at pages28–29: **PASS**. The locator-based click helper sometimes scrolls the original layout position of sticky controls and can change the tracked page; this automation behavior was distinguished from the successful direct pointer interaction. The former Reading→Book release issue is resolved for the verified real pointer path.

### Mobile landing issue

**Medium — orbit decorations create horizontal overflow at390px.** On the landing screen, `document.documentElement.scrollWidth` and body scrollWidth are404px while innerWidth is390px. The two rotated orbit elements extend to x402.9 and x404.1 (and left of the viewport). A horizontal scrollbar is visible in `artifacts/qa-mobile.jpg`. Resolved by clipping decorative orbit overflow. Recheck after reload at390×844: innerWidth390, document/body scrollWidth375. No horizontal overflow remains. The replacement qa-mobile.jpg shows the final state.

Additional screenshots saved: `artifacts/qa-landing.jpg`, `artifacts/qa-open-book.jpg`, `artifacts/qa-mobile.jpg`.

## Final outcome

All 13 automated tests pass. Static build passes. All eight lab interfaces were exercised, the ten-question challenge completed and retried, physical page deformation and mouse corner completion/cancellation observed, and navigation/persistence sampled successfully. The reported reading-mode position issue and mobile orbit overflow were fixed and rechecked.

Final mobile overflow recheck: **PASS**, innerWidth390; document/body scrollWidth375. Screenshot `artifacts/qa-mobile.jpg` was replaced after the fix.

No known critical blocker was observed in the tested paths. This statement does not certify every possible input or platform. Remaining **NOT VERIFIED**: real touch hardware, screen-reader behavior, printed/PDF output, automatic OS reduced-motion preference, complete WCAG contrast/focus audit, and npm commands unavailable in this environment. Direct Node launch/build/test scripts are the verified path.

The temporary viewport override was reset after review. The independent reviewer did not modify implementation files; changes were limited to the regression tests, this report and screenshot evidence.
