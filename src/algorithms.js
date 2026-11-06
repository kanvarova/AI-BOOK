export const nodes={S:[35,135],A:[130,45],B:[125,220],C:[245,220],D:[350,180],G:[410,65]};
export const edges=[['S','A',3],['A','G',9],['S','B',2],['B','C',2],['C','D',2],['D','G',2],['A','C',4]];
// Each edge is at least its Euclidean length / 100: h is consistent.
export function search(algorithm='A*',start='S',goal='G'){
 const h=n=>Math.hypot(nodes[n][0]-nodes[goal][0],nodes[n][1]-nodes[goal][1])/100;
 let frontier=[{n:start,g:0,path:[start]}],seen=new Set(),best={[start]:0},expanded=[],frames=[];
 const frame=(current,path=[],cost=null)=>({current,frontier:frontier.map(x=>x.n),expanded:[...expanded],path,cost});
 frames.push(frame(null));
 while(frontier.length){
  if(['UCS','A*'].includes(algorithm))frontier.sort((a,b)=>(a.g+(algorithm==='A*'?h(a.n):0))-(b.g+(algorithm==='A*'?h(b.n):0))||a.n.localeCompare(b.n));
  const cur=algorithm==='DFS'?frontier.pop():frontier.shift();
  if(['UCS','A*'].includes(algorithm)&&cur.g>best[cur.n])continue;
  if(seen.has(cur.n))continue;seen.add(cur.n);expanded.push(cur.n);
  if(cur.n===goal){frames.push(frame(cur.n,cur.path,cur.g));break;}
  const neighbors=edges.filter(([a,b])=>a===cur.n||b===cur.n).map(([a,b,w])=>({n:a===cur.n?b:a,w})).sort((a,b)=>a.n.localeCompare(b.n));
  if(algorithm==='DFS')neighbors.reverse();
  for(const {n,w} of neighbors){const g=cur.g+w;if(['UCS','A*'].includes(algorithm)){if(best[n]===undefined||g<best[n]){best[n]=g;seen.delete(n);frontier.push({n,g,path:[...cur.path,n]});}}else if(!seen.has(n)&&!frontier.some(x=>x.n===n))frontier.push({n,g,path:[...cur.path,n]});}
  frames.push(frame(cur.n));
 }
 return frames;
}
export const events=[{name:'Robotics',size:40,teacher:'Aliya'},{name:'Python',size:20,teacher:'Aliya'},{name:'Design',size:35,teacher:'Dana'},{name:'Games',size:15,teacher:'Dana'}];
export function conflicts(assign){const out=[];assign.forEach((v,i)=>{if(v<0)return;const room=v%2,time=Math.floor(v/2);if(events[i].size>(room===0?60:25))out.push(events[i].name+': insufficient room capacity');for(let j=0;j<i;j++){if(assign[j]<0)continue;if(assign[j]===v)out.push(events[i].name+' and '+events[j].name+': same room and time');if(Math.floor(assign[j]/2)===time&&events[j].teacher===events[i].teacher)out.push(events[i].name+' and '+events[j].name+': same teacher at the same time');}});return out;}
export function backtrack(){const frames=[{assign:[-1,-1,-1,-1],message:'Start with an empty assignment'}],assign=[-1,-1,-1,-1];function solve(i){if(i===4)return true;for(let v=0;v<4;v++){assign[i]=v;const bad=conflicts(assign);frames.push({assign:[...assign],message:bad.length?bad.join('; '):'Consistent partial assignment'});if(!bad.length&&solve(i+1))return true;assign[i]=-1;frames.push({assign:[...assign],message:'Backtrack: try another value'});}return false;}solve(0);return frames;}
export const landscape=[1,3,6,4,3,5,9,7];
export function hillStep(x){const options=[x-1,x+1].filter(i=>i>=0&&i<landscape.length).sort((a,b)=>landscape[b]-landscape[a]);return landscape[options[0]]>landscape[x]?options[0]:x;}
export function gameTree(leaves,mode='minimax',p=.5){
 let visited=1,trace=[],pruned=[],alpha=-Infinity,values=[],frames=[];
 const emit=(message,branch,beta)=>{trace.push(message);frames.push({message,branch,beta,alpha,visited,values:[...values],pruned:[...pruned]});};
 emit('Visit MAX root',null,Infinity);
 for(let b=0;b<2;b++){
  visited++;let v=mode==='expectimax'?0:Infinity;
  emit(`Visit ${b===0?'left':'right'} ${mode==='expectimax'?'CHANCE':'MIN'} node`,b,Infinity);
  for(let j=0;j<2;j++){
   const i=2*b+j;visited++;
   v=mode==='expectimax'?v+leaves[i]*(j===0?p:1-p):Math.min(v,leaves[i]);
   emit(`Leaf ${i+1} = ${leaves[i]}; ${mode==='expectimax'?'weighted sum':'MIN value'} = ${v.toFixed(2)}`,b,v);
   if(mode==='alpha-beta'&&v<=alpha&&j===0){pruned.push(i+1);emit('Prune remaining leaf: beta ≤ alpha',b,v);break;}
  }
  values.push(v);alpha=Math.max(alpha,v);emit(`MAX best so far = ${alpha.toFixed(2)}`,b,v);
 }
 const value=Math.max(...values),choice=values.indexOf(value);
 emit(`Choose ${choice===0?'left':'right'} branch; root = ${value.toFixed(2)}`,null,Infinity);
 return {value,values,visited,pruned,trace,frames,choice};
}
export function bayes(prior,sensitivity,falsePositive){const signal=prior*sensitivity+(1-prior)*falsePositive;return {signal,posterior:signal===0?null:prior*sensitivity/signal};}
export const transition=[[.8,.1,.1],[.1,.8,.1],[.1,.1,.8]];
export function filterHMM(bel,light=true){const prediction=[0,1,2].map(j=>bel.reduce((s,b,i)=>s+b*transition[i][j],0));const likelihood=[.8,.5,.2].map(p=>light?p:1-p);const raw=prediction.map((p,j)=>p*likelihood[j]),z=raw.reduce((a,b)=>a+b,0);return {prediction,posterior:raw.map(x=>x/z),z};}
export const wall=5,goal=3,hazard=7,dirs=[[-1,0,'↑'],[0,1,'→'],[1,0,'↓'],[0,-1,'←']];
export const terminal=s=>s===goal||s===hazard;
export function move(s,a){const [dr,dc]=dirs[a],r=Math.floor(s/4)+dr,c=s%4+dc,n=r*4+c;return r<0||r>3||c<0||c>3||n===wall?s:n;}
export function outcomes(s,a,step=-.2){return [[a,.8],[(a+1)%4,.1],[(a+3)%4,.1]].map(([d,p])=>{const next=move(s,d);return {next,p,r:next===goal?10:next===hazard?-10:step};});}
export function valueIteration(values,step=-.2){const qs=values.map((_,s)=>dirs.map((_,a)=>terminal(s)||s===wall?0:outcomes(s,a,step).reduce((sum,o)=>sum+o.p*(o.r+(terminal(o.next)?0:.9*values[o.next])),0)));return {values:qs.map(q=>Math.max(...q)),policy:qs.map(q=>q.indexOf(Math.max(...q))),qs};}
export function qEpisode(q,epsilon=.2,step=-.2,rng=Math.random){let s=12,reward=0,steps=0;for(;steps<150;steps++){const a=rng()<epsilon?Math.floor(rng()*4):q[s].indexOf(Math.max(...q[s]));const os=outcomes(s,a,step),u=rng();const o=u<.8?os[0]:u<.9?os[1]:os[2];q[s][a]+=.25*(o.r+(terminal(o.next)?0:.9*Math.max(...q[o.next]))-q[s][a]);reward+=o.r;s=o.next;if(terminal(s))break;}return {reward,steps:Math.min(steps+1,150),end:s};}
export function metrics(tp,fp,fn,tn){const ratio=(a,b)=>b===0?null:a/b;return {accuracy:ratio(tp+tn,tp+fp+fn+tn),precision:ratio(tp,tp+fp),recall:ratio(tp,tp+fn)};}
export function naiveBayes(urgentWord,nearDeadline){const priors=[.8,.2],ps=[[.1,.2],[.8,.7]];const scores=priors.map((p,c)=>p*(urgentWord?ps[c][0]:1-ps[c][0])*(nearDeadline?ps[c][1]:1-ps[c][1]));return {scores,urgent:scores[1]/(scores[0]+scores[1])};}
