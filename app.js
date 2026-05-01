const DIFFICULTIES = {
  easy:   { label: "Chill",   hintIntervalMs: null },
  medium: { label: "Timed", hintIntervalMs: 10000 },
  hard:   { label: "For F*ck's Sake",   hintIntervalMs: 5000 },
};

const ROUNDS_PER_GAME = 10;
const CLUES_PER_ROUND = 4;
const ROUND_COUNTDOWN_SECONDS = 4;

const EPISODE_DATA_URL = "./quiz_data.json";
var EPISODE_FILTER_SOURCES = null;

const SOURCES = {
  all: { label: "All shows", filter: null },
  castData: { label: "Ain't Slayed Nobody", filter: "CastData" },
  castDataPTR: { label: "Push the Roll with Ross Bryant", filter: "CastDataPTR" },
}

// Supabase REST configuration
const SUPABASE_CONFIG = {
  projectUrl: "https://itbjcymfxueedycnrdru.supabase.co",
  anonKey: "sb_publishable_cw_KSSXLoWhJtmYLDgDZsg_cCXHVmBE",
  table: "scores",
};

const PLAYER_NAME_STORAGE_KEY = "ptrquizgame.playerName";
const SOURCE_SELECTION_STORAGE_KEY = "ptrquizgame.sourceSelection";

// Cap retries so round generation never loops forever on sparse datasets.
const ROUND_BUILD_ATTEMPTS = 900;

// Canonical warning keys used for matching and frequency scoring.
// Display text still comes from the original JSON values.
const WARNING_EQUIVALENCE = {
  "substance use":                   "substance use",
  "substance abuse":                 "substance use",
  "alcohol and drug abuse":          "substance use",
  "drug and alcohol abuse":          "substance use",
  "alcohol and drug use":            "substance use",
  "drug and alcohol use":            "substance use",
  "alcohol abuse":                   "substance use",
  "alcohol use":                     "substance use",
  "alcohol":                         "substance use",
  "alcoholism":                      "substance use",
  "alcohol/drinking":                "substance use",
  "alcohol and smoking":             "substance use",
  "drug abuse":                      "substance use",
  "drug use":                        "substance use",
  "drug references":                 "substance use",
  "references to drugs":             "substance use",
  "drug experimentation":            "substance use",
  "drug misuse jokes":               "substance use",
  "smoking":                         "substance use",
  "smoking and substance use":       "substance use",
  "teen smoking":                    "substance use",
  "teen drug and alcohol use":       "substance use",
  "addiction":                       "substance use",

  "drugging":                        "drugging",
  "discussion about drugging":       "drugging",

  "gunfire sounds":                  "gunfire sounds",
  "gunfire":                         "gunfire sounds",
  "gunfire sound":                   "gunfire sounds",
  "gunfire (sfx)":                   "gunfire sounds",
  "gunshot sound":                   "gunfire sounds",
  "gunshots":                        "gunfire sounds",
  "gunshot sfx":                     "gunfire sounds",
  "gunshot (sfx)":                   "gunfire sounds",
  "gun shots (sound fx)":            "gunfire sounds",
  "gun fights (sfx)":                "gunfire sounds",
  "explosion and gunfire sounds":    "gunfire sounds",

  "gun violence":                    "gun violence",
  "gun use":                         "gun violence",
  "being held at gunpoint":          "gun violence",

  "gore":                               "gore",
  "blood and gore":                     "gore",
  "depictions of violence and gore":    "gore",

  "body horror":                        "body horror",
  "mild body horror":                   "body horror",
  "extreme body horror":                "body horror",
  "gore/body mutilation (fingernails)": "body horror",
  "gore (head/brain)":                  "body horror",
  "body mutilation (head)":             "body horror",
  "body horror (incl. fingernails)":    "body horror",
  "body horror (fingernails)":          "body horror",

  "self-harm":                       "self-harm",
  "self harm":                       "self-harm",
  "cutting":                         "self-harm",
  "wrist cutting":                   "self-harm",
  "suicide":                         "self-harm",
  "suicidal ideation":               "self-harm",
  "suicidal tendencies":             "self-harm",
  "suicide and suicidal ideation":   "self-harm",
  "references to suicide":           "self-harm",

  "death":                           "death",
  "death and dying":                 "death",
  "death of a loved one":            "death",
  "death of family":                 "death",
  "parental loss":                   "death",

  "mass death":                      "mass death",
  "mass casualties":                 "mass death",
  "mass death and destruction":      "mass death",
  "references to mass death":        "mass death",

  "child death":                     "child death",
  "discussion of child death":       "child death",
  "references to child death":       "child death",
  "discussion of child murder and death": "child death",
  "references to a child's death (off-screen)": "child death",

  "child in peril":                  "child in peril",
  "children in peril":               "child in peril",
  "harm to children":                "child in peril",
  "child endangerment":              "child in peril",
  "threats to children":             "child in peril",
  "teens in peril":                  "teens in peril",
  "teen in peril":                   "teens in peril",
  "harm to teenagers":               "teens in peril",

  "harm to animals":                 "harm to animals",
  "animal harm and death":           "harm to animals",
  "animal death":                    "harm to animals",
  "animal injury":                   "harm to animals",
  "animal endangerment":             "harm to animals",
  "harm to livestock":               "harm to animals",
  "harm to rodents":                 "harm to animals",
  "animals in peril":                "harm to animals",

  "eye trauma":                      "eye trauma",
  "eye harm":                        "eye trauma",
  "implied eye trauma":              "eye trauma",
  "implications of eye trauma":      "eye trauma",
  "eye mutilation imagery":          "eye trauma",

  "head trauma":                     "head trauma",
  "brain trauma":                    "head trauma",

  "mental illness":                  "mental illness",
  "mental illness with delusions":   "mental illness",
  "mental deterioration":            "mental illness",
  "cognitive decline/dementia":      "mental illness",

  "hallucinations":                  "hallucinations",
  "hallucination":                   "hallucinations",

  "drowning":                        "drowning",
  "drowning imagery":                "drowning",
  "references to drowning":          "drowning",
  "water submersion":                "drowning",

  "vomiting":                        "vomiting",
  "vomiting (no sfx)":               "vomiting",
  "choking/vomiting":                "vomiting",

  "insects":                         "insects",
  "bugs/insects":                    "insects",
  "swarming bugs":                   "insects",
  "insects (centipedes)":            "insects",
  "insects (centipedes, maggots, flies, beetles, spiders)": "insects",
  "insects (centipedes, maggots, flies, beetles, spiders, etc.)": "insects",

  "phobias":                         "phobias",
  "phobias (rats, claustrophobia, etc.)": "phobias",
  "phobias (clowns, insects, rats, claustrophobia, etc.)": "phobias",

  "cannibalism":                     "cannibalism",
  "discussions of cannibalism":      "cannibalism",

  "kidnapping":                      "kidnapping",
  "hostage situation/kidnapping":    "kidnapping",
  "abduction":                       "kidnapping",

  "incarceration":                   "incarceration",
  "imprisonment":                    "incarceration",
  "institutionalization":            "incarceration",

  "human experimentation":           "human experimentation",
  "human experiments":               "human experimentation",
  "prison experiments":              "human experimentation",

  "coercion":                        "coercion",
  "social coercion":                 "coercion",

  "grief and loss":                  "grief and loss",
  "grief":                           "grief and loss",

  "abortion":                        "abortion",
  "abortion and miscarriage":        "abortion",
  "abortion references":             "abortion",
  "discussion of abortion and forced infertility": "abortion",

  "arson":                           "arson",
  "pyromania":                       "arson",

  "auto accidents":                  "auto accidents",
  "car accidents":                   "auto accidents",
  "motor vehicle accident (without sound fx)": "auto accidents",

  "sexual content":                  "sexual content",
  "sexual themes":                   "sexual content",
  "sexuality":                       "sexual content",
  "suggestive content":              "sexual content",
  "brief sexual undertones":         "sexual content",

  "sexual innuendo":                 "sexual innuendo",
  "sexual references":               "sexual innuendo",
  "innuendo":                        "sexual innuendo",
  "mild innuendo":                   "sexual innuendo",
  "sexual humor":                    "sexual humor",
  "sexual humor and crude jokes":    "sexual humor",
  "lewd humor":                      "sexual humor",

  "siren sounds":                    "siren sounds",
  "air raid siren":                  "siren sounds",
  "air siren":                       "siren sounds",
  "siren sounds in ambient noise":   "siren sounds",
  "brief siren sounds (opening scene)": "siren sounds",

  "vehicle sound effects":           "vehicle sound effects",
  "automobile sounds (light horns, tire skid, impact)": "vehicle sound effects",
  "automobile fx (braking, car alarm)": "vehicle sound effects",

  "misophonia":                      "misophonia",
  "eating sounds":                   "misophonia",
  "eating noises (misophonia)":      "misophonia",
  "chewing":                         "misophonia",
  "chewing sounds":                  "misophonia",
  "slurping sounds":                 "misophonia",
  "wet mouth sounds":                "misophonia",
};

function normalizeHint(value) {
  return String(value || "").trim().toLowerCase();
}

function normalizeWarningHint(value) {
  const base = normalizeHint(value);
  if (!base) return "";
  const lookup = base.replace(/[-_/]+/g, " ").replace(/\s+/g, " ").trim();
  return WARNING_EQUIVALENCE[lookup] || lookup;
}

function buildCluePool(episode) {
  const pool = [];
  const seen = new Set();

  function add(type, raw, normalized) {
    if (!normalized) return;
    const key = `${type}:${normalized}`;
    if (seen.has(key)) return;
    seen.add(key);
    pool.push({ type, value: raw.trim(), normalized, key });
  }

  for (const w of episode.warnings   || []) add("warning",   w, normalizeWarningHint(w));
  for (const c of episode.characters || []) add("character", c, normalizeHint(c));
  for (const p of episode.players    || []) add("player",    p, normalizeHint(p));  if (episode.date) add("date", episode.date, normalizeHint(episode.date));
  return pool;
}

function buildLoglineClue(logline) {
  const clean = String(logline || "").replace(/\s+/g, " ").trim();
  if (!clean) return null;
  const maxLen = 190;
  const value = clean.length > maxLen ? `${clean.slice(0, maxLen - 3).trimEnd()}...` : clean;
  return { type: "logline", value, normalized: normalizeHint(clean), key: `logline:${normalizeHint(clean)}` };
}

function shuffle(arr) {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function episodeHasClue(episode, clue) {
  if (clue.type === "date") {
    return episode.date && normalizeHint(episode.date) === clue.normalized;
  }
  const source = clue.type === "warning"  ? episode.warnings
               : clue.type === "player"   ? episode.players
               : episode.characters;
  const normalize = clue.type === "warning" ? normalizeWarningHint : normalizeHint;
  return new Set((source || []).map(normalize)).has(clue.normalized);
}

function clueFrequency(clue, frequencies) {
  const bucket = clue.type === "warning" ? "warnings" : clue.type === "player" ? "players" : clue.type === "date" ? "dates" : "characters";
  const bucketFrequencies = frequencies[bucket];
  let freq = bucketFrequencies && bucketFrequencies[clue.normalized] != null
    ? bucketFrequencies[clue.normalized]
    : 9999;
  // Deprioritize dates to give them lower priority overall
  if (clue.type === "date") freq *= 2;
  return freq;
}

function computeClueFrequencies(episodes) {
  const freq = { warnings: {}, characters: {}, players: {}, dates: {} };
  for (const ep of episodes || []) {
    const ws = new Set((ep.warnings   || []).map(normalizeWarningHint).filter(Boolean));
    const cs = new Set((ep.characters || []).map(normalizeHint).filter(Boolean));
    const ps = new Set((ep.players    || []).map(normalizeHint).filter(Boolean));
    const ds = ep.date ? new Set([normalizeHint(ep.date)]) : new Set();
    for (const k of ws) freq.warnings[k]   = (freq.warnings[k]   || 0) + 1;
    for (const k of cs) freq.characters[k] = (freq.characters[k] || 0) + 1;
    for (const k of ps) freq.players[k]    = (freq.players[k]    || 0) + 1;
    for (const k of ds) freq.dates[k]      = (freq.dates[k]      || 0) + 1;
  }
  return freq;
}

// Fewer revealed clues means more points, with a minimum of 1.
function scoreAnswer(cluesRevealed) {
  return Math.max(1, CLUES_PER_ROUND - (cluesRevealed - 1));
}

function pickRound(episodePool, playedIds, frequencies, difficulty) {
  const candidates = episodePool.filter(ep => !playedIds.has(ep.id));
  if (candidates.length < 4) return null;

  for (let attempt = 0; attempt < ROUND_BUILD_ATTEMPTS; attempt++) {
    const correct = candidates[Math.floor(Math.random() * candidates.length)];
    const cluePool = buildCluePool(correct);
    const loglineClue = buildLoglineClue(correct.logline);

    if (cluePool.length < CLUES_PER_ROUND - 1) continue;

    // Wrong options must each come from a different show.
    const byShow = new Map();
    for (const ep of candidates) {
      if (ep.id === correct.id || ep.show === correct.show) continue;
      if (!byShow.has(ep.show)) byShow.set(ep.show, []);
      byShow.get(ep.show).push(ep);
    }
    if (byShow.size < 3) continue;

    const otherShows = shuffle([...byShow.keys()]).slice(0, 3);
    const wrongOptions = otherShows.map(show => shuffle(byShow.get(show))[0]);

    // First clue must narrow down to the correct answer alone.
    const byFreq = (a, b) => clueFrequency(a, frequencies) - clueFrequency(b, frequencies);
    const uniqueFirst = shuffle(
      cluePool.filter(c => c.type !== "date" && wrongOptions.every(ep => !episodeHasClue(ep, c)))
    ).sort(byFreq);

    if (!uniqueFirst.length) continue;

    const firstClue = uniqueFirst[0];
    const rest = shuffle(cluePool.filter(c => c.key !== firstClue.key)).sort(byFreq);

    if (rest.length < CLUES_PER_ROUND - 1) continue;

    const clues = [firstClue, ...rest.slice(0, CLUES_PER_ROUND - 2), loglineClue || rest[CLUES_PER_ROUND - 2]];
    return { correct, options: shuffle([correct, ...wrongOptions]), clues, difficulty };
  }

  return null;
}

const PHASE = {
  INTRO:          "intro",
  ROUND_ACTIVE:   "round_active",
  ROUND_RESOLVED: "round_resolved",
  SUMMARY:        "summary",
};

const game = {
  phase:           PHASE.INTRO,
  episodes:        [],
  clueFrequencies: { warnings: {}, characters: {}, players: {} },
  sourceKey:       "all",
  difficulty:      null,
  difficultyKey:   null,
  score:           0,
  roundIndex:      0,
  playedIds:       new Set(),
  round:           null,
  cluesRevealed:   0,
  hintTimer:       null,
  meterTimer:      null,
  countdownTimer:  null,
  remainingMs:     0,
  playerName:      "",
  leaderboards:    { easy: [], medium: [], hard: [] },
};

const dom = {
  introCard:      document.getElementById("introCard"),
  gameCard:       document.getElementById("gameCard"),
  summaryCard:    document.getElementById("summaryCard"),
  sourceSelector: document.getElementById("sourceSelector"),
  difficultyGrid: document.getElementById("difficultyGrid"),
  startBtn:       document.getElementById("startBtn"),
  introStatus:    document.getElementById("introStatus"),
  introHint:      document.getElementById("introHint"),
    playerNameInput: document.getElementById("playerNameInput"),
    leaderboardsStatus: document.getElementById("leaderboardsStatus"),
    leaderboardsGrid: document.getElementById("leaderboardsGrid"),
    leaderboardEasy: document.getElementById("leaderboardEasy"),
    leaderboardMedium: document.getElementById("leaderboardMedium"),
    leaderboardHard: document.getElementById("leaderboardHard"),
  roundLabel:     document.getElementById("roundLabel"),
  scoreLabel:     document.getElementById("scoreLabel"),
  timerText:      document.getElementById("timerText"),
  difficultyLabel: document.getElementById("difficultyLabel"),
  meterFill:      document.getElementById("meterFill"),
  hintsList:      document.getElementById("hintsList"),
  nextHintBtn:    document.getElementById("nextHintBtn"),
  answersGrid:    document.getElementById("answersGrid"),
  answerHint:     document.getElementById("answerHint"),
  feedback:       document.getElementById("feedback"),
  nextRoundBtn:   document.getElementById("nextRoundBtn"),
  finalScore:     document.getElementById("finalScore"),
  finalStats:     document.getElementById("finalStats"),
  summaryLeaderboard: document.getElementById("summaryLeaderboard"),
  summaryCongrats: document.getElementById("summaryCongrats"),
  playAgainBtn:   document.getElementById("playAgainBtn"),
};

const CLUE_TYPE_LABELS = {
  warning:   "Content warning",
  player:    "Player",
  character: "Character",
  logline:   "Logline",
  date:      "Air date",
};

function loadStoredPlayerName() {
  try {
    return String(localStorage.getItem(PLAYER_NAME_STORAGE_KEY) || "").slice(0, 20);
  } catch {
    return "";
  }
}

function saveStoredPlayerName(name) {
  try {
    localStorage.setItem(PLAYER_NAME_STORAGE_KEY, String(name || "").slice(0, 20));
  } catch {
    // Ignore storage failures (private mode/quota/etc.) and continue normally.
  }
}

function loadStoredSourceKey() {
  try {
    const sourceKey = String(localStorage.getItem(SOURCE_SELECTION_STORAGE_KEY) || "all");
    return SOURCES[sourceKey] ? sourceKey : "all";
  } catch {
    return "all";
  }
}

function saveStoredSourceKey(sourceKey) {
  try {
    const safeSourceKey = SOURCES[sourceKey] ? sourceKey : "all";
    localStorage.setItem(SOURCE_SELECTION_STORAGE_KEY, safeSourceKey);
  } catch {
    // Ignore storage failures (private mode/quota/etc.) and continue normally.
  }
}

function isManualClueRevealAllowed() {
  return !(game.round && game.round.difficulty && game.round.difficulty.hintIntervalMs);
}

function createClueItem(clue, index, isRevealed) {
  const li = document.createElement("li");
  li.className = "hint-item";

  if (!isRevealed) {
    li.classList.add("pending");
  }

  const label = document.createElement("span");
  label.className = "hint-label";
  label.textContent = isRevealed
    ? `Clue ${index + 1} · ${CLUE_TYPE_LABELS[clue.type] || clue.type}`
    : `Clue ${index + 1} · Locked`;

  const value = document.createElement("span");
  value.className = "hint-value";
  value.textContent = isRevealed
    ? clue.value
    : isManualClueRevealAllowed()
      ? "Reveal the next clue to unlock this slot."
      : "???";

  li.append(label, value);
  return li;
}

function renderClueList() {
  const existing = dom.hintsList.querySelectorAll(".hint-item").length;
  for (let i = existing; i < game.round.clues.length; i++) {
    const isRevealed = i < game.cluesRevealed;
    dom.hintsList.appendChild(createClueItem(game.round.clues[i], i, isRevealed));
  }
  const items = dom.hintsList.querySelectorAll(".hint-item");
  items.forEach((item, i) => {
    if (i < game.cluesRevealed && item.classList.contains("pending")) {
      const clue = game.round.clues[i];
      item.classList.remove("pending");
      item.querySelector(".hint-label").textContent = `Clue ${i + 1} · ${CLUE_TYPE_LABELS[clue.type] || clue.type}`;
      item.querySelector(".hint-value").textContent = clue.value;
    }
  });
  const allOut = game.cluesRevealed >= game.round.clues.length;
  const showManualReveal = game.phase === PHASE.ROUND_ACTIVE && isManualClueRevealAllowed() && !allOut;
  dom.nextHintBtn.classList.toggle("hidden", !showManualReveal);
  dom.nextHintBtn.disabled = allOut || game.phase !== PHASE.ROUND_ACTIVE || !isManualClueRevealAllowed();
}

function formatEpisodeLabel(show, episode) {
  const showText = String(show || "").trim();
  const episodeText = String(episode || "").trim();
  if (!showText) return episodeText;
  if (!episodeText) return showText;

  const showLower = showText.toLowerCase();
  const episodeLower = episodeText.toLowerCase();
  const startsWithShow = episodeLower === showLower || episodeLower.startsWith(`${showLower} `);

  return startsWithShow ? episodeText : `${showText} — ${episodeText}`;
}

function renderAnswerButtons() {
  dom.answersGrid.innerHTML = "";
  game.round.options.forEach((ep, i) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.dataset.episodeId = ep.id;
    const num = document.createElement("span");
    num.className = "answer-num";
    num.textContent = i + 1;
    const label = document.createElement("span");
    label.className = "answer-label";
    label.textContent = formatEpisodeLabel(ep.show, ep.episode);
    btn.appendChild(num);
    btn.appendChild(label);
    dom.answersGrid.appendChild(btn);
  });
}

function setAnswerButtonsDisabled(disabled) {
  for (const btn of dom.answersGrid.querySelectorAll(".answer-btn")) {
    btn.disabled = disabled;
  }
}

function renderAnswerHint() {
  if (!dom.answerHint || !game.round) return;
  if (game.round.difficulty.hintIntervalMs) {
    dom.answerHint.innerHTML = "Press <kbd>1</kbd>&ndash;<kbd>4</kbd> to answer";
  } else {
    dom.answerHint.innerHTML = "Press <kbd>1</kbd>&ndash;<kbd>4</kbd> to answer &middot; <kbd>Space</kbd> to reveal the next clue";
  }
}

function renderSummary() {
  const maxScore = ROUNDS_PER_GAME * CLUES_PER_ROUND;
  const percentage = maxScore > 0 ? Math.round((game.score / maxScore) * 100) : 0;

  dom.gameCard.classList.add("hidden");
  dom.summaryCard.classList.remove("hidden");
  dom.finalScore.textContent = `Final score: ${game.score} (${percentage}%)`;
  dom.finalStats.textContent = `${game.roundIndex} rounds played. Max possible: ${maxScore}.`;
  renderSummaryDifficultyLeaderboard();
}

function getDisplayLeaderboardRows(scores) {
  return Array.from({ length: 10 }, (_, i) => {
    const row = scores[i];
    if (!row) return { id: null, playerName: "---", score: 0, rank: i + 1, isPlaceholder: true };
    const score = Number.isFinite(Number(row.score)) ? Number(row.score) : 0;
    // Standard competition ranking: rank = 1 + count of entries with strictly higher score
    const rank = scores.filter(r => Number(r.score) > score).length + 1;
    return { id: row.id || row._id || null, playerName: String(row.playerName || "---").slice(0, 20), score, rank, isPlaceholder: false };
  });
}

function getSupabaseBaseUrl() {
  return `${SUPABASE_CONFIG.projectUrl}/rest/v1/${SUPABASE_CONFIG.table}`;
}

function getSupabaseHeaders(extra = {}) {
  return {
    "Content-Type": "application/json",
    apikey: SUPABASE_CONFIG.anonKey,
    Authorization: `Bearer ${SUPABASE_CONFIG.anonKey}`,
    ...extra,
  };
}

function buildLeaderboardUrlForDifficulty(difficulty) {
  const params = new URLSearchParams();
  params.set("select", "id,playerName,score,difficulty,source,date");
  params.set("difficulty", `eq.${difficulty}`);
  if (game.sourceKey !== "all") params.set("source", `eq.${game.sourceKey}`);
  params.set("order", "score.desc,date.asc");
  params.set("limit", "10");
  return `${getSupabaseBaseUrl()}?${params.toString()}`;
}

function setSummaryLeaderboardStatus(message) {
  if (!dom.summaryLeaderboard) return;
  dom.summaryLeaderboard.innerHTML = "";
  const p = document.createElement("p");
  p.className = "leaderboard-status";
  p.textContent = message;
  dom.summaryLeaderboard.appendChild(p);
  if (dom.summaryCongrats) dom.summaryCongrats.textContent = "";
}

function getCurrentSourceConfig() {
  return SOURCES[game.sourceKey] || SOURCES.all;
}

function refreshIntroStatus() {
  const sourceLabel = getCurrentSourceConfig().label;
  dom.introStatus.textContent = `${game.episodes.length} episodes loaded (${sourceLabel}). Choose a difficulty to begin.`;
}

async function reloadEpisodesForSource() {
  const res = await fetch(EPISODE_DATA_URL, { cache: "no-cache" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const data = await res.json();
  const sourceConfig = getCurrentSourceConfig();
  EPISODE_FILTER_SOURCES = sourceConfig.filter ? [sourceConfig.filter] : null;

  game.episodes = data.episodes || [];
  if (EPISODE_FILTER_SOURCES) {
    game.episodes = game.episodes.filter(ep => EPISODE_FILTER_SOURCES.includes(ep.source));
  }
  game.clueFrequencies = computeClueFrequencies(game.episodes);
}

async function refreshLeaderboardsForSource() {
  if (dom.leaderboardsStatus) dom.leaderboardsStatus.textContent = "Summoning Yog-Sothoth, please wait...";
  if (dom.leaderboardsGrid) dom.leaderboardsGrid.classList.add("hidden");
  if (dom.leaderboardEasy) dom.leaderboardEasy.innerHTML = "";
  if (dom.leaderboardMedium) dom.leaderboardMedium.innerHTML = "";
  if (dom.leaderboardHard) dom.leaderboardHard.innerHTML = "";

  try {
    await loadLeaderboards();
    renderLeaderboards();
    if (dom.leaderboardsStatus) dom.leaderboardsStatus.textContent = "";
    if (dom.leaderboardsGrid) dom.leaderboardsGrid.classList.remove("hidden");
  } catch (err) {
    console.error("Error loading leaderboards:", err);
    if (dom.leaderboardsStatus) dom.leaderboardsStatus.textContent = "Couldn't reach the leaderboard - check your connection.";
  }
}

async function applySourceSelection(sourceKey) {
  game.sourceKey = SOURCES[sourceKey] ? sourceKey : "all";
  saveStoredSourceKey(game.sourceKey);
  if (dom.sourceSelector) dom.sourceSelector.value = game.sourceKey;

  clearDifficultySelection();
  await reloadEpisodesForSource();
  refreshIntroStatus();
  await refreshLeaderboardsForSource();
}

function renderSummaryDifficultyLeaderboard(newEntryId = null) {
  if (!dom.summaryLeaderboard || !game.difficultyKey) return;

  const difficultyKey = game.difficultyKey;
  const scores = game.leaderboards[difficultyKey] || [];
  const displayRows = getDisplayLeaderboardRows(scores);

  dom.summaryLeaderboard.innerHTML = "";

  const title = document.createElement("h3");
  title.textContent = `${DIFFICULTIES[difficultyKey].label} leaderboard`;
  dom.summaryLeaderboard.appendChild(title);

  const list = document.createElement("ol");
  displayRows.forEach((score) => {
    const li = document.createElement("li");
    if (score.isPlaceholder) li.classList.add("placeholder");

    const rank = document.createElement("span");
    rank.className = "leaderboard-rank";
    rank.textContent = `${score.rank}.`;

    const name = document.createElement("span");
    name.className = "leaderboard-name";
    name.textContent = score.playerName;

    const points = document.createElement("span");
    points.className = "leaderboard-score";
    points.textContent = String(score.score);

    li.append(rank, name, points);
    list.appendChild(li);
  });
  dom.summaryLeaderboard.appendChild(list);

  if (!dom.summaryCongrats) return;
  const madeLeaderboard = Boolean(newEntryId) && scores.some((entry) => entry && String(entry.id || entry._id) === String(newEntryId));
  dom.summaryCongrats.textContent = madeLeaderboard
    ? "Congratulations! Your new score made the leaderboard!"
    : "";
}

function stopTimers() {
  clearInterval(game.hintTimer);
  clearInterval(game.meterTimer);
  clearInterval(game.countdownTimer);
  game.hintTimer = null;
  game.meterTimer = null;
  game.countdownTimer = null;
  game.remainingMs = 0;
  dom.meterFill.style.width = "100%";
}

function startTimedRoundCountdown() {
  const countdownSeconds = ROUND_COUNTDOWN_SECONDS;
  let secondsLeft = countdownSeconds;

  setAnswerButtonsDisabled(true);
  if (dom.answerHint) dom.answerHint.textContent = "Round starts in a moment...";
  dom.nextHintBtn.classList.add("hidden");
  dom.nextHintBtn.disabled = true;
  dom.timerText.textContent = `Starting in ${secondsLeft}...`;
  dom.meterFill.style.width = "100%";

  game.countdownTimer = setInterval(() => {
    if (game.phase !== PHASE.ROUND_ACTIVE) return;

    secondsLeft -= 1;

    if (secondsLeft > 0) {
      dom.timerText.textContent = `Starting in ${secondsLeft}...`;
      dom.meterFill.style.width = `${(secondsLeft / countdownSeconds) * 100}%`;
      return;
    }

    clearInterval(game.countdownTimer);
    game.countdownTimer = null;
    game.cluesRevealed = 1;
    renderClueList();
    setAnswerButtonsDisabled(false);
    renderAnswerHint();
    startClueTimer();
  }, 1000);
}

function startClueTimer() {
  const { hintIntervalMs } = game.round.difficulty;
  if (!hintIntervalMs) {
    dom.timerText.textContent = "Timer off";
    dom.nextHintBtn.disabled = false;
    return;
  }

  dom.nextHintBtn.disabled = true;
  game.remainingMs = hintIntervalMs;
  dom.meterFill.style.width = "100%";
  dom.timerText.textContent = `${Math.ceil(game.remainingMs / 1000)}s`;

  game.meterTimer = setInterval(() => {
    if (game.phase !== PHASE.ROUND_ACTIVE) return;
    game.remainingMs = Math.max(0, game.remainingMs - 100);
    dom.meterFill.style.width = `${(game.remainingMs / hintIntervalMs) * 100}%`;
    dom.timerText.textContent = `${Math.ceil(game.remainingMs / 1000)}s`;
  }, 100);

  game.hintTimer = setInterval(() => {
    if (game.phase !== PHASE.ROUND_ACTIVE) return;
    revealNextClue();
    if (game.cluesRevealed >= game.round.clues.length) {
      stopTimers();
      dom.timerText.textContent = "All clues out";
    } else {
      game.remainingMs = hintIntervalMs;
      dom.meterFill.style.width = "100%";
    }
  }, hintIntervalMs);
}

function revealNextClue() {
  if (game.phase !== PHASE.ROUND_ACTIVE) return;
  if (game.cluesRevealed >= game.round.clues.length) return;
  game.cluesRevealed++;
  renderClueList();
}

function resolveAnswer(chosenId) {
  if (game.phase !== PHASE.ROUND_ACTIVE) return;
  if (game.cluesRevealed < 1) return;
  game.phase = PHASE.ROUND_RESOLVED;
  stopTimers();

  const { correct } = game.round;
  const won = chosenId === correct.id;

  if (won) {
    const pts = scoreAnswer(game.cluesRevealed);
    game.score += pts;
    dom.feedback.textContent = `Correct! +${pts} point${pts !== 1 ? "s" : ""}.`;
    dom.feedback.className = "feedback ok";
  } else {
    dom.feedback.textContent = `Not quite — the answer was ${formatEpisodeLabel(correct.show, correct.episode)}.`;
    dom.feedback.className = "feedback bad";
  }

  for (const btn of dom.answersGrid.querySelectorAll(".answer-btn")) {
    btn.disabled = true;
    if (btn.dataset.episodeId === correct.id)              btn.classList.add("correct");
    else if (btn.dataset.episodeId === chosenId && !won)   btn.classList.add("wrong");
  }

  dom.scoreLabel.textContent = `Score: ${game.score}`;
  dom.nextHintBtn.classList.add("hidden");
  dom.nextHintBtn.disabled = true;
  dom.answerHint.innerHTML = "Press <kbd>Space</kbd> to start the next round";
  dom.nextRoundBtn.classList.remove("hidden");
}

function launchRound() {
  const round = pickRound(game.episodes, game.playedIds, game.clueFrequencies, game.difficulty);
  if (!round) {
    endGame("Couldn't build a valid round — you may have exhausted the episode pool!");
    return;
  }

  game.round = round;
  game.phase = PHASE.ROUND_ACTIVE;
  game.cluesRevealed = round.difficulty.hintIntervalMs ? 0 : 1;
  game.playedIds.add(round.correct.id);

  dom.roundLabel.textContent = `Round ${game.roundIndex + 1} / ${ROUNDS_PER_GAME}`;
  dom.hintsList.innerHTML = "";
  dom.feedback.textContent = "";
  dom.feedback.className = "feedback";
  dom.nextRoundBtn.classList.add("hidden");

  renderClueList();
  renderAnswerButtons();
  renderAnswerHint();

  if (round.difficulty.hintIntervalMs) {
    startTimedRoundCountdown();
  } else {
    dom.timerText.textContent = "Timer off";
    dom.meterFill.style.width = "100%";
    dom.nextHintBtn.classList.remove("hidden");
    dom.nextHintBtn.disabled = false;
  }
}

function advanceRound() {
  game.roundIndex++;
  if (game.roundIndex >= ROUNDS_PER_GAME) {
    endGame();
    return;
  }
  launchRound();
}

function endGame(note = "") {
  stopTimers();
  game.phase = PHASE.SUMMARY;
  renderSummary();
  if (note) dom.finalStats.textContent += ` ${note}`;
  submitScore();
}

async function submitScore() {
  if (!game.playerName || game.playerName.length === 0) return;

  setSummaryLeaderboardStatus("Summoning Yog-Sothoth, please wait…");

  const payload = {
    playerName: game.playerName.substring(0, 20),
    score: game.score,
    difficulty: Object.keys(DIFFICULTIES).find(k => DIFFICULTIES[k] === game.difficulty) || "easy",
    source: game.sourceKey,
    date: new Date().toISOString(),
  };
  
  try {
    const response = await fetch(getSupabaseBaseUrl(), {
      method: "POST",
      headers: getSupabaseHeaders({ Prefer: "return=representation" }),
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const createdRecordJson = await response.json();
    const createdRecord = Array.isArray(createdRecordJson) ? createdRecordJson[0] : createdRecordJson;
    await loadLeaderboards();
    renderLeaderboards();
    renderSummaryDifficultyLeaderboard(createdRecord && (createdRecord.id || createdRecord._id) ? (createdRecord.id || createdRecord._id) : null);
  } catch (err) {
    console.error("Error submitting score:", err);
    setSummaryLeaderboardStatus("Couldn't reach the leaderboard — check your connection.");
  }
}

async function loadLeaderboards() {
  game.leaderboards = { easy: [], medium: [], hard: [] };

  for (const difficulty of ["easy", "medium", "hard"]) {
    const response = await fetch(buildLeaderboardUrlForDifficulty(difficulty), {
      headers: getSupabaseHeaders(),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const scores = await response.json();
    game.leaderboards[difficulty] = scores;
  }
}

function renderLeaderboards() {
  const render = (containerId, difficultyKey) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const scores = game.leaderboards[difficultyKey] || [];
    container.innerHTML = "";
    
    const title = document.createElement("h3");
    title.textContent = DIFFICULTIES[difficultyKey].label;
    container.appendChild(title);
    
    const list = document.createElement("ol");
    const displayRows = getDisplayLeaderboardRows(scores);

    displayRows.forEach((score) => {
      const li = document.createElement("li");
      if (score.isPlaceholder) li.classList.add("placeholder");

      const rank = document.createElement("span");
      rank.className = "leaderboard-rank";
      rank.textContent = `${score.rank}.`;

      const name = document.createElement("span");
      name.className = "leaderboard-name";
      name.textContent = score.playerName;

      const points = document.createElement("span");
      points.className = "leaderboard-score";
      points.textContent = String(score.score);

      li.append(rank, name, points);
      list.appendChild(li);
    });
    container.appendChild(list);
  };
  
  render("leaderboardEasy", "easy");
  render("leaderboardMedium", "medium");
  render("leaderboardHard", "hard");
}

function clearDifficultySelection() {
  game.difficulty = null;
  for (const radio of dom.difficultyGrid.querySelectorAll('input[type="radio"]')) {
    radio.checked = false;
  }
  for (const label of dom.difficultyGrid.querySelectorAll(".difficulty-btn")) {
    label.classList.remove("active");
  }
  dom.startBtn.disabled = true;
  if (dom.introHint) dom.introHint.innerHTML = "Press <kbd>1</kbd>&ndash;<kbd>3</kbd> to select difficulty";
}

function selectDifficulty(radio) {
  if (!radio || radio.type !== "radio") return;
  radio.checked = true;
  for (const label of dom.difficultyGrid.querySelectorAll(".difficulty-btn")) {
    label.classList.toggle("active", label.querySelector("input") === radio);
  }
  game.difficultyKey = radio.value;
  game.difficulty = DIFFICULTIES[radio.value];
  dom.startBtn.disabled = false;
  if (dom.introHint) dom.introHint.innerHTML = "Press <kbd>Space</kbd> to begin &middot; <kbd>1</kbd>&ndash;<kbd>3</kbd> to change difficulty";
}

function startGame() {
  game.score = 0;
  game.roundIndex = 0;
  game.playedIds = new Set();
  if (dom.playerNameInput) {
    game.playerName = dom.playerNameInput.value.trim().substring(0, 20);
    saveStoredPlayerName(game.playerName);
  }
  dom.introCard.classList.add("hidden");
  dom.summaryCard.classList.add("hidden");
  dom.gameCard.classList.remove("hidden");
  dom.difficultyLabel.textContent = game.difficulty.label;
  launchRound();
}

document.addEventListener("keydown", (e) => {
  if (game.phase === PHASE.INTRO) {
    const diffKeys = ["1", "2", "3"];
    const diffValues = ["easy", "medium", "hard"];
    const di = diffKeys.indexOf(e.key);
    if (di !== -1) {
      e.preventDefault();
      const radio = dom.difficultyGrid.querySelector(`input[value="${diffValues[di]}"]`);
      if (radio) selectDifficulty(radio);
      return;
    }
    if (e.key === " " && game.difficulty) {
      e.preventDefault();
      startGame();
      return;
    }
  }
  if (game.phase === PHASE.ROUND_ACTIVE) {
    if (e.key === " " || e.key === "ArrowRight") {
      e.preventDefault();
      if (!isManualClueRevealAllowed()) return;
      revealNextClue();
      return;
    }
    const idx = ["1", "2", "3", "4"].indexOf(e.key);
    if (idx !== -1) {
      const btn = dom.answersGrid.querySelectorAll(".answer-btn")[idx];
      if (btn && !btn.disabled) resolveAnswer(btn.dataset.episodeId);
    }
  }
  if (game.phase === PHASE.ROUND_RESOLVED && (e.key === "Enter" || e.key === " ")) {
    e.preventDefault();
    advanceRound();
  }
});

function wireEvents() {
  if (dom.sourceSelector) {
    dom.sourceSelector.addEventListener("change", async (e) => {
      const nextSource = e.target && e.target.value ? e.target.value : "all";
      try {
        await applySourceSelection(nextSource);
      } catch (err) {
        console.error("Error applying source selection:", err);
        dom.introStatus.textContent = `Couldn't load episode data: ${err.message}`;
      }
    });
  }

  dom.difficultyGrid.addEventListener("click", (e) => {
    const label = e.target.closest(".difficulty-btn");
    if (!label) return;
    selectDifficulty(label.querySelector('input[type="radio"]'));
  });

  dom.difficultyGrid.addEventListener("change", (e) => {
    selectDifficulty(e.target);
  });

  dom.startBtn.addEventListener("click", () => {
    if (game.difficulty) startGame();
  });

  if (dom.playerNameInput) {
    dom.playerNameInput.addEventListener("input", () => {
      const nextName = dom.playerNameInput.value.substring(0, 20);
      game.playerName = nextName;
      saveStoredPlayerName(nextName);
    });
  }

  dom.nextHintBtn.addEventListener("click", revealNextClue);

  dom.answersGrid.addEventListener("click", (e) => {
    const btn = e.target.closest(".answer-btn");
    if (btn && !btn.disabled) resolveAnswer(btn.dataset.episodeId);
  });

  dom.nextRoundBtn.addEventListener("click", advanceRound);

  dom.playAgainBtn.addEventListener("click", () => {
    dom.summaryCard.classList.add("hidden");
    dom.introCard.classList.remove("hidden");
    game.phase = PHASE.INTRO;
    clearDifficultySelection();
    dom.introStatus.textContent = "Choose a difficulty to begin.";
  });
}

(async function init() {
  try {
    game.playerName = loadStoredPlayerName();
    if (dom.playerNameInput) dom.playerNameInput.value = game.playerName;
    wireEvents();
    await applySourceSelection(loadStoredSourceKey());
  } catch (err) {
    console.error(err);
    dom.introStatus.textContent = `Couldn't load episode data: ${err.message}`;
  }
})();
