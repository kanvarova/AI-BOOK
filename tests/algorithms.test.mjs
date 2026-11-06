import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import * as A from '../src/algorithms.js';
import {chapters,challenge,glossary,sources} from '../src/content.js';
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-10,`${a} != ${b}`);

test('search compares hop and cost objectives and gives valid routes for every node pair',()=>{
 assert.equal(A.search('BFS').at(-1).cost,12);assert.equal(A.search('UCS').at(-1).cost,8);
 for(const start of Object.keys(A.nodes))for(const goal of Object.keys(A.nodes)){
  assert.equal(A.search('A*',start,goal).at(-1).cost,A.search('UCS',start,goal).at(-1).cost);
  for(const algo of ['DFS','BFS','UCS','A*']){const f=A.search(algo,start,goal).at(-1);assert.equal(f.path[0],start);assert.equal(f.path.at(-1),goal);let cost=0;for(let i=1;i<f.path.length;i++){const e=A.edges.find(([x,y])=>x===f.path[i-1]&&y===f.path[i]||y===f.path[i-1]&&x===f.path[i]);assert.ok(e);cost+=e[2];}assert.equal(f.cost,cost);}
 }
});
test('A* heuristic is consistent in both directions for every edge and goal',()=>{
 for(const goal of Object.keys(A.nodes))for(const [a,b,w]of A.edges){const h=n=>Math.hypot(A.nodes[n][0]-A.nodes[goal][0],A.nodes[n][1]-A.nodes[goal][1])/100;assert.ok(h(a)<=w+h(b)+1e-12);assert.ok(h(b)<=w+h(a)+1e-12);}
});
test('CSP checks capacity, room, teacher and resolves a complete feasible schedule',()=>{
 const frames=A.backtrack();assert.ok(frames.length>5);assert.ok(frames.some(f=>f.message.startsWith('Backtrack')));assert.deepEqual(A.conflicts(frames.at(-1).assign),[]);assert.ok(frames.at(-1).assign.every(v=>v>=0));
 assert.ok(A.conflicts([1,-1,-1,-1]).some(x=>x.includes('capacity')));assert.ok(A.conflicts([0,0,-1,-1]).some(x=>x.includes('same room')));assert.ok(A.conflicts([0,1,-1,-1]).some(x=>x.includes('teacher')));
 assert.equal(A.hillStep(2),2);assert.equal(A.hillStep(4),5);assert.equal(A.hillStep(5),6);
});
test('exhaustive small game trees agree with direct minimax and expected-value formulas',()=>{
 for(let a=-3;a<=3;a++)for(let b=-3;b<=3;b++)for(let c=-3;c<=3;c++)for(let d=-3;d<=3;d++){
  const leaves=[a,b,c,d],expected=Math.max(Math.min(a,b),Math.min(c,d));assert.equal(A.gameTree(leaves).value,expected);assert.equal(A.gameTree(leaves,'alpha-beta').value,expected);
  for(const p of [0,.25,.5,.75,1])assert.equal(A.gameTree(leaves,'expectimax',p).value,Math.max(p*a+(1-p)*b,p*c+(1-p)*d));
 }
});
test('game frames expose intermediate bounds, pruning and final choice',()=>{
 const m=A.gameTree([3,5,2,9]),a=A.gameTree([3,5,2,9],'alpha-beta');assert.ok(a.visited<m.visited);assert.deepEqual(a.pruned,[3]);assert.equal(a.choice,0);
 assert.equal(a.frames[0].visited,1);assert.equal(a.frames[0].alpha,-Infinity);assert.ok(a.frames.some(f=>f.alpha===3&&f.beta===2));assert.ok(a.frames.some(f=>f.pruned.includes(3)));assert.equal(a.frames.at(-1).visited,a.visited);assert.deepEqual(a.frames.at(-1).values,a.values);assert.match(a.frames.at(-1).message,/Choose left/);
});
test('Bayes matches hand calculation and identifies impossible evidence',()=>{close(A.bayes(.2,.9,.1).posterior,9/13);assert.equal(A.bayes(.2,0,0).posterior,null);assert.equal(A.bayes(1,.9,.1).posterior,1);assert.equal(A.bayes(0,.9,.1).posterior,0);});
test('HMM prediction, likelihood weighting and normalizer match hand calculations',()=>{
 const f=A.filterHMM([1/3,1/3,1/3],true);f.prediction.forEach(x=>close(x,1/3));close(f.z,.5);f.posterior.forEach((x,i)=>close(x,[8/15,1/3,2/15][i]));
 const dark=A.filterHMM([1,0,0],false);dark.prediction.forEach((x,i)=>close(x,[.8,.1,.1][i]));close(dark.z,.29);dark.posterior.forEach((x,i)=>close(x,[.16/.29,.05/.29,.08/.29][i]));
 let bel=f.posterior;for(let i=0;i<100;i++){bel=A.filterHMM(bel,i%2===0).posterior;close(bel.reduce((a,b)=>a+b,0),1);assert.ok(bel.every(x=>x>=0&&x<=1));}
});
test('MDP conserves transition probability, respects walls and reaches a Bellman fixed point',()=>{
 assert.equal(A.move(4,1),4);assert.equal(A.move(0,0),0);for(let s=0;s<16;s++)for(let a=0;a<4;a++)close(A.outcomes(s,a).reduce((n,x)=>n+x.p,0),1);
 const first=A.valueIteration(Array(16).fill(0));close(first.qs[2][1],7.96);
 let v=Array(16).fill(0);for(let i=0;i<300;i++)v=A.valueIteration(v).values;const next=A.valueIteration(v).values;assert.ok(Math.max(...v.map((x,i)=>Math.abs(x-next[i])))<1e-9);assert.equal(v[A.goal],0);assert.equal(v[A.hazard],0);assert.ok(v[2]>0);
});
test('seeded Q-learning updates finite values and never bootstraps from terminal Q values',()=>{
 let seed=123;const rng=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/2**32;};const q=Array.from({length:16},()=>[0,0,0,0]);for(let i=0;i<500;i++){const ep=A.qEpisode(q,.3,-.2,rng);assert.ok(Number.isFinite(ep.reward));assert.ok(ep.steps<=150);}assert.ok(q.flat().every(Number.isFinite));assert.ok(Math.max(...q[2])>5);assert.deepEqual(q[A.goal],[0,0,0,0]);
 const q2=Array.from({length:16},()=>[0,0,0,0]);q2[A.goal]=[999,999,999,999];const samples=[0,0,0,1,1,1].flatMap(a=>[0,(a+.1)/4,.2]);let i=0;const ep=A.qEpisode(q2,1,-.2,()=>samples[i++]??.2);assert.equal(ep.end,A.goal);assert.equal(ep.steps,6);assert.equal(q2[2][1],2.5);
});
test('metrics preserve undefined denominators and Naive Bayes normalizes correctly',()=>{
 const m=A.metrics(0,0,5,95);assert.equal(m.accuracy,.95);assert.equal(m.recall,0);assert.equal(m.precision,null);assert.equal(A.metrics(0,0,0,0).accuracy,null);
 for(const word of [false,true])for(const deadline of [false,true]){const b=A.naiveBayes(word,deadline);close(b.urgent,b.scores[1]/(b.scores[0]+b.scores[1]));assert.ok(b.urgent>=0&&b.urgent<=1);}close(A.naiveBayes(true,true).urgent,.112/.128);
});
test('eight complete English chapters map to distinct in-scope labs',()=>{
 assert.equal(chapters.length,8);assert.deepEqual(chapters.map(c=>c.lab),['agent','search','csp','game','mdp','bayes','hmm','ml']);
 for(const c of chapters){for(const key of ['story','goal','explain','example','limit','question','answer'])assert.ok(c[key].length>20,`${c.topic}: ${key}`);assert.ok(c.formula.length>0);assert.ok(c.terms.length>=4);assert.ok(sources[c.ref]);}
 assert.ok(!/[\u0400-\u04ff]/u.test(JSON.stringify({chapters,glossary,challenge})));
 assert.ok(!/\b(neural|perceptron|transformer|generative|LLMs?)\b/i.test(JSON.stringify({chapters,glossary,challenge})));
});
test('challenge has valid answers, explanations and coverage of all eight chapters',()=>{
 assert.ok(challenge.length>=8&&challenge.length<=12);assert.deepEqual([...new Set(challenge.map(q=>q.chapter))].sort(),[0,1,2,3,4,5,6,7]);
 for(const q of challenge){assert.ok(q.q.length>20);assert.ok(q.options.length>=2);assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<q.options.length);assert.ok(q.why.length>10);}
});
test('visible application source contains no Cyrillic text',async()=>{for(const file of ['index.html','src/app.js','src/labs.js','src/algorithms.js','src/content.js'])assert.ok(!/[\u0400-\u04ff]/u.test(await readFile(new URL('../'+file,import.meta.url),'utf8')),file);});
