export const sources = [
  ['Poole & Mackworth · 2023', 'Artificial Intelligence: Foundations of Computational Agents, 3rd edition. Cambridge University Press.', 'https://artint.info/3e/html/ArtInt3e.html'],
  ['UC Berkeley · CS 188', 'Introduction to Artificial Intelligence. Open course textbook on search, decisions, uncertainty, and learning.', 'https://inst.eecs.berkeley.edu/~cs188/textbook/']
];
export const chapters = [
{
 title:'An agent starts its shift', topic:'Agents & environments', time:'08:00', lab:'agent', ref:0, path:'',
 quote:'Before choosing an algorithm, I need to define what success means.',
 story:'Four hours before the festival, Aliya asks AIRI to carry a projector from the laboratory to the main hall. “Deliver it quickly” leaves important questions open: what can the robot observe, which actions are available, and how should safety affect its choices?',
 goal:'Specify observations, actions, constraints, and a performance measure for equipment delivery.',
 terms:[['Agent','A system that receives observations and selects actions.'],['Environment','The part of the world with which the agent interacts in our model.'],['Rationality','Selecting an action that maximizes expected performance given the available information.'],['Observability','Whether observations provide the information needed to determine the relevant state.']],
 explain:'A world state and an observation are different. A person may stand behind a closed door without appearing in the camera image. Partial observability requires reasoning about missing information. In a deterministic model, a state and action determine one next state; in a stochastic model, they determine a distribution. A search problem specifies the initial state, actions, transition model, goal test, and path cost.',
 formula:'environment → observation → action selection → action → updated environment',
 example:'State: location, battery charge, and cargo status. Initial state: laboratory, 80% battery, projector loaded. Actions: move, wait, charge. Goal: projector delivered to the main hall. Cost: elapsed time. Routes with unacceptable collision risk are excluded by a safety constraint.',
 analogy:'A courier with an incomplete map must choose using the information available, while remaining uncertain about closed corridors.',
 limit:'Speed alone is an incomplete objective. A rational action can still have an unlucky outcome. Rationality does not imply perfect knowledge, and the choice of performance measure affects behavior.',
 question:'AIRI can observe only the nearest corridor. Is its environment fully observable?',
 answer:'Usually not: relevant obstacles and people may be hidden. Observability is relative to the model, so first ask which hidden information could change the best action.'
},
{
 title:'The shortest route is not always fastest', topic:'Search & heuristics', time:'08:30', lab:'search', ref:1, path:'search/informed.html',
 quote:'Counting doors and measuring travel time produce different best routes.',
 story:'The projector is ready. One route has only two connections, but a slow lift makes it expensive. Another has more connections and a lower total cost. Aliya compares four search methods on exactly the same campus graph.',
 goal:'Find a route and explain the trade-off between path cost and search effort.',
 terms:[['Frontier','Discovered paths waiting to be considered.'],['DFS / BFS','Depth-first search explores a branch; breadth-first search explores increasing path depths.'],['Uniform-cost search','Expands the frontier path with the smallest accumulated cost g.'],['A* and heuristic','A* prioritizes g+h, where h estimates the remaining cost.']],
 explain:'DFS uses a stack and BFS uses a queue. UCS and A* use priorities. The search tree represents paths; the same graph state may appear along different paths. Handling repeats matters: a better route to a state can require updating its cost. In this finite graph all edge costs are positive and neighbors are considered alphabetically.',
 formula:'f(n) = g(n) + h(n)',
 example:'S–A–G costs 12 and uses two edges. S–B–C–D–G costs 8 and uses four. BFS returns the two-edge route under the stated ordering. UCS returns cost 8. A* also returns 8 using straight-line distance divided by 100. Every edge weight is at least that scaled geometric distance.',
 analogy:'g is the travel cost already incurred; h is a cautious estimate of what remains.',
 limit:'BFS is cost-optimal when edge costs are equal. A* tree search needs an admissible heuristic; graph search also needs correct repeat handling. A consistent heuristic supports closing states without reopening; our implementation can reopen improved states. Setting h=0 gives UCS.',
 question:'Which method should you use with unequal edge costs and no useful heuristic?',
 answer:'UCS is a suitable choice. On this finite graph with positive costs it finds a minimum-cost route. A* with h=0 makes the same priority choices, subject to tie-breaking.'
},
{
 title:'Four events, two rooms', topic:'Local search & constraints', time:'09:00', lab:'csp', ref:1, path:'csp/csps.html',
 quote:'First make the schedule feasible. Then ask whether it is convenient.',
 story:'Robotics and Python share an instructor, and the small room cannot hold the Robotics audience. Aliya converts these practical requirements into variables, domains, and constraints before searching for a schedule.',
 goal:'Assign a room and time to every event without violating capacity or resource constraints.',
 terms:[['CSP','A constraint satisfaction problem: variables, domains, and constraints.'],['Domain','The allowed values for a variable, such as room–time pairs.'],['Backtracking','Build a partial assignment and return to earlier choices when necessary.'],['Hill climbing','Move to a better neighboring candidate according to an objective.']],
 explain:'Each event is a variable whose domain contains four room–time pairs. Constraints prevent double-booking a room or instructor and reject insufficient capacity. Backtracking tests partial assignments. Local search instead changes an existing candidate and evaluates its quality; it can stop when no neighbor improves the score.',
 formula:'CSP = variables + domains + constraints',
 example:'Hall A holds 60 people; Room B holds 25. Robotics has 40 attendees and Design 35, so both need Hall A at different times. Robotics and Python share Aliya as instructor. Games and Design share Dana. A feasible schedule must satisfy all these requirements simultaneously.',
 analogy:'Like fitting a puzzle, each placement restricts which placements remain possible.',
 limit:'Feasibility and optimization are separate. A conflict-free schedule can still have inconvenient gaps. Hill climbing can stop at a local maximum even when a better candidate exists elsewhere. A random restart may explore another region but does not prove optimality.',
 question:'Why might a schedule with no conflicts still be a poor schedule?',
 answer:'It satisfies hard constraints but may violate soft preferences, such as avoiding long gaps or late sessions. Those preferences require an objective function in addition to feasibility constraints.'
},
{
 title:'Plan for the next player', topic:'Adversarial search', time:'09:30', lab:'game', ref:1, path:'games/minimax.html',
 quote:'The right calculation depends on who chooses the next outcome.',
 story:'At the festival game stand, one mode has an opponent and another uses random outcomes. Aliya must distinguish a minimizing opponent from a chance process. She also wants to avoid exploring branches that cannot affect the decision.',
 goal:'Compare minimax, alpha-beta pruning, and expectation on one small game tree.',
 terms:[['Minimax','MAX selects a move anticipating MIN’s minimizing response.'],['Evaluation function','A numerical estimate of a position from MAX’s perspective.'],['Alpha-beta pruning','Skip branches that cannot improve the choice of an ancestor.'],['Expectimax','Use probability-weighted values at chance nodes.']],
 explain:'Leaf values propagate upward: MAX takes a maximum and MIN a minimum. Alpha stores MAX’s lower bound; beta stores MIN’s upper bound. If beta ≤ alpha, remaining descendants of that node cannot improve the relevant choice. Chance nodes compute expected value, so their probabilities and numerical utility scale matter.',
 formula:'V(chance) = Σ pᵢVᵢ',
 example:'Left leaves are 3 and 5; right leaves are 2 and 9. Minimax gives max(min(3,5),min(2,9))=3. With left-first alpha-beta, the right value 2 is already no better than 3, so leaf 9 can be pruned. With equal chance probabilities, expectimax gives max(4,5.5)=5.5.',
 analogy:'An opponent chooses a response; a random process samples an outcome. These require different models.',
 limit:'Limited search depth and inaccurate evaluations can lead to poor moves. Alpha-beta preserves the value of the same minimax tree, not a guarantee of perfect play beyond that tree. Its savings depend on move order. Expectimax requires a probability model.',
 question:'Outcomes 10 and 0 have probabilities 0.2 and 0.8. What are their expected value and MIN value?',
 answer:'The expected value is 0.2×10+0.8×0=2. A MIN node takes 0. A chance process and a minimizing opponent are different assumptions.'
},
{
 title:'Learning on a slippery path', topic:'MDPs & reinforcement learning', time:'10:00', lab:'mdp', ref:1, path:'mdp/value-iteration.html',
 quote:'Planning with a model and learning from experience use different information.',
 story:'Rain makes the campus path slippery. AIRI may move sideways despite the chosen command. A short route passes close to a hazardous cell, so Aliya considers expected rewards over a sequence of actions.',
 goal:'Find a policy for uncertain transitions and compare planning with experience-based updates.',
 terms:[['MDP','States, actions, transition probabilities, and rewards with the Markov property.'],['Policy','A rule mapping states to actions, possibly probabilistically.'],['Discount γ','Controls the contribution of future rewards.'],['Value iteration / Q-learning','Model-based Bellman updates / experience-based action-value updates.']],
 explain:'Value iteration uses known transitions and rewards to update all state values. Q-learning samples a transition and updates Q(s,a) toward r+γ max Q(s′,a′). A terminal transition has no future contribution. ε-greedy exploration sometimes chooses a random action instead of the current best one.',
 formula:'Q(s,a) ← Q(s,a) + α[r + γ maxₐ′ Q(s′,a′) − Q(s,a)]',
 example:'The lab uses a 4×4 grid with a wall, a terminal goal +10, and a terminal hazard −10. The intended move occurs with probability 0.8; each sideways move with 0.1. Hitting a wall leaves the state unchanged. γ=0.9, α=0.25. The ordinary transition reward and ε are adjustable.',
 analogy:'A known probabilistic map supports planning; trial journeys provide samples for learning.',
 limit:'A poorly chosen reward can favor unwanted behavior. Changing rewards changes the learning task. With a finite episode budget and constant α, this demonstration does not guarantee convergence. Each episode is capped at 150 steps.',
 question:'What can happen if the penalty for each ordinary step becomes larger?',
 answer:'Long routes become less attractive. The preferred policy may become shorter and riskier, depending on transition probabilities, terminal rewards, and discounting.'
},
{
 title:'A signal is not a certainty', topic:'Probability & Bayes nets', time:'10:30', lab:'bayes', ref:1, path:'bayes-nets/representation.html',
 quote:'Sensor accuracy alone does not tell me how likely the room is occupied.',
 story:'The room sensor lights up. It sometimes produces false positives, and the room is usually empty. Aliya updates the occupancy probability instead of treating the light as conclusive evidence.',
 goal:'Combine a prior and an observation through Bayes’ rule.',
 terms:[['Conditional probability','The probability of an event given a condition.'],['Prior / posterior','Belief before / after the current observation.'],['Conditional independence','Independence after conditioning on specified variables.'],['Bayesian network','A directed acyclic graph describing a factorization of a joint distribution.']],
 explain:'Bayes’ rule relates P(signal|occupied) to P(occupied|signal). The denominator includes both true and false signals. A Bayesian network supplies local conditional distributions; the joint probability is their product over nodes given parents. The graph also encodes conditional independence assumptions.',
 formula:'P(B|S) = P(S|B)P(B) / P(S)',
 example:'P(occupied)=0.2, sensitivity=0.9, and false-positive rate=0.1. P(signal)=0.2×0.9+0.8×0.1=0.26. The posterior is 0.18/0.26≈69.2%, not 90%. In the small network B→S, P(B,S)=P(B)P(S|B).',
 analogy:'Evidence changes the relative support for competing explanations.',
 limit:'Inference is only as useful as the probability model. An arrow in a Bayesian network alone does not establish causation. If P(signal)=0, the conditional probability is not defined by this formula. A different model may be needed for that observation.',
 question:'Why are P(signal|occupied) and P(occupied|signal) different?',
 answer:'They condition on different populations. Among all signals, some are false positives. Their proportion depends on how frequently rooms are occupied as well as on sensor performance.'
},
{
 title:'Following a trail of observations', topic:'HMMs & sequential inference', time:'11:00', lab:'hmm', ref:1, path:'hmms/hmm.html',
 quote:'A distribution can represent what a single confident location cannot.',
 story:'Indoor positioning is unavailable. AIRI observes only a noisy light-or-dark floor signal. Aliya combines the motion model with successive observations to estimate which corridor contains the robot.',
 goal:'Estimate the current hidden state using observations received so far.',
 terms:[['Hidden state','A relevant state not directly observed.'],['HMM','A hidden Markov model with transitions and observation probabilities.'],['Forward inference','Propagate state probabilities and incorporate the next observation.'],['Filtering','Compute the distribution of the present state given observations up to now.']],
 explain:'First predict by summing over transitions from the previous belief. Then multiply each prediction by the likelihood of the new observation and normalize. A basic HMM assumes the next state depends on the current state, and each observation depends on its corresponding hidden state. Prediction concerns future states; smoothing revises past states using later evidence.',
 formula:'belₜ(j) ∝ P(eₜ|j) Σᵢ P(j|i)belₜ₋₁(i)',
 example:'There are three zones A, B, C. Stay probability is 0.8; each other destination has probability 0.1. Light-signal likelihoods are 0.8, 0.5, 0.2. A uniform prior remains uniform after prediction. After a light signal, the normalized belief is 0.5333, 0.3333, 0.1333.',
 analogy:'Several uncertain clues can jointly support a useful estimate.',
 limit:'Incorrect transitions or likelihoods can produce systematically wrong beliefs. A basic HMM may ignore dependencies on longer history. Filtering does not identify a hidden state with certainty merely because one zone has the highest probability.',
 question:'Should one contradictory sensor reading set the previous location hypothesis to zero?',
 answer:'Only if the model assigns zero likelihood to that reading under the hypothesis. A noisy observation usually lowers its probability without eliminating it.'
},
{
 title:'Do not miss the urgent request', topic:'Rational decisions & classical ML', time:'11:30', lab:'ml', ref:1, path:'ml/naive-bayes.html',
 quote:'A prediction becomes a decision only after I consider its consequences.',
 story:'Equipment requests arrive before the festival opens. Missing one urgent request can interrupt a presentation. Aliya evaluates the classifier and separately chooses whether staff should review a request.',
 goal:'Evaluate predictions and choose an action using expected utility or expected loss.',
 terms:[['Features / labels','Input characteristics / target values in labeled examples.'],['Naive Bayes','Classification assuming conditional feature independence given the class.'],['Linear model','A score formed from a weighted sum of features plus a bias.'],['Expected utility','Probability-weighted utility of an action’s possible outcomes.']],
 explain:'Training data fit parameters, validation data guide model selection, and held-out test data evaluate the final model. Repeated tuning on the test set compromises that estimate. Overfitting means adapting to training specifics that do not generalize. Accuracy counts correct predictions; precision measures correctness among positive predictions; recall measures coverage of true positives.',
 formula:'precision = TP/(TP+FP) · recall = TP/(TP+FN)',
 example:'With 95 ordinary and 5 urgent requests, predicting “not urgent” for every request gives 95% accuracy and 0% urgent recall. Precision is undefined because there are no positive predictions. In the decision lab, reviewing costs 1; skipping an urgent request costs C, so expected skip loss is P(urgent|features)×C.',
 analogy:'An alarm must be evaluated on the rare events it needs to detect, not only on quiet days.',
 limit:'Class imbalance, data leakage, and distribution shift can distort evaluation. Naive Bayes relies on a simplifying independence assumption. A class probability alone does not select an action: utilities or losses are also needed. All data here are synthetic.',
 question:'How can the recommended action change while the model prediction stays the same?',
 answer:'Increasing the cost of missing an urgent request raises the expected loss of skipping it. Manual review can become preferable even when the predicted probability is unchanged.'
}
];
export const glossary=[['Agent','A system selecting actions from observations.'],['State','A representation of the situation in a model.'],['Heuristic','An estimate used to guide search.'],['Admissibility','A remaining-cost heuristic does not overestimate the optimal remaining cost.'],['CSP','Assign values while satisfying constraints.'],['Policy','A rule for selecting actions in states.'],['Reward','A numerical feedback signal specified by the task.'],['Utility','A numerical representation of outcome preference.'],['Bayesian network','A directed acyclic factorization of a joint distribution.'],['HMM','A temporal model with hidden states and observations.'],['Filtering','Estimate the present state from evidence received so far.'],['Feature','An input characteristic of an example.'],['Label','A target value associated with an example.'],['Overfitting','Fitting training specifics that do not generalize.'],['Precision','TP divided by TP+FP; undefined if the denominator is zero.'],['Recall','TP divided by TP+FN; undefined if the denominator is zero.']];
export const challenge=[
 {q:'Edges have unequal positive costs and you have no useful heuristic. Which search method minimizes path cost?',options:['BFS','UCS','DFS'],answer:1,chapter:1,why:'UCS orders the frontier by accumulated cost. BFS orders by depth, not weighted cost.'},
 {q:'A robot observes only its nearest corridor. Which statement is justified?',options:['The whole campus is fully observable.','Relevant hidden obstacles may make the environment partially observable.','The environment must be deterministic.'],answer:1,chapter:0,why:'Observability concerns relevant hidden information; it does not determine whether transitions are stochastic.'},
 {q:'Hill climbing stops because no neighboring candidate improves the score. What follows?',options:['The global optimum is proven.','No feasible solution exists.','It may have reached a local optimum.'],answer:2,chapter:2,why:'A better candidate may lie beyond a sequence of non-improving moves.'},
 {q:'What does alpha-beta pruning preserve?',options:['The result of minimax on the same tree and depth.','The number of visited nodes.','The result of every possible deeper search.'],answer:0,chapter:3,why:'Pruned branches cannot affect that minimax decision. Move ordering affects the savings.'},
 {q:'Outcomes 10 and 0 have probabilities 0.2 and 0.8. What is their expected value?',options:['0','2','8'],answer:1,chapter:3,why:'0.2×10 + 0.8×0 = 2.'},
 {q:'A Q-learning transition reaches a terminal goal. Which target is correct?',options:['r + γ max Q(next)','r','γ alone'],answer:1,chapter:4,why:'A terminal state has no future return, so its bootstrap contribution is zero.'},
 {q:'Prior occupancy is 0.2, sensitivity 0.9, false-positive rate 0.1. What is P(occupied|signal)?',options:['90%','20%','About 69.2%'],answer:2,chapter:5,why:'0.18 / (0.18+0.08) ≈ 0.6923.'},
 {q:'What is the correct filtering order for a new HMM observation?',options:['Predict, weight by likelihood, normalize.','Pick the largest prior and discard the rest.','Normalize the observation labels only.'],answer:0,chapter:6,why:'Filtering combines transition uncertainty and the evidence likelihood, then normalizes the resulting weights.'},
 {q:'A classifier predicts all 100 requests ordinary; 5 are urgent. What is urgent recall?',options:['95%','100%','0%'],answer:2,chapter:7,why:'TP=0 and FN=5, so recall=0/(0+5)=0. Accuracy is 95%, but it misses every urgent request.'},
 {q:'P(urgent)=0.2. Reviewing costs 1; missing urgency costs 10. Which action has lower expected loss?',options:['Review: loss 1 versus skip loss 2.','Skip: loss 0.2.','Both always cost 10.'],answer:0,chapter:7,why:'The expected loss of skipping is 0.2×10=2. Reviewing costs 1 under this simplified model.'}
];
