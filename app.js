// ---------------------------
// DADOS (eixos + perguntas)
// ---------------------------

const AXES = [
  {
    id: "ship_quality",
    name: "Entrega vs Qualidade",
    leftLabel: "Entrega",
    rightLabel: "Qualidade",
    leftTag: "Entrega-first",
    rightTag: "Qualidade-first",
    // 5 perguntas, com ~metade invertida (2/5)
    questions: [
      { id: "sq1", text: "Prefiro entregar algo simples hoje e melhorar depois.", reversed: false },
      { id: "sq2", text: "Consigo cortar escopo sem perder o essencial para o usuário.", reversed: false },
      { id: "sq3", text: "Evito refatorar se não for necessário para entregar a feature.", reversed: true },
      { id: "sq4", text: "Testes automatizados são essenciais antes de considerar algo pronto.", reversed: false },
      { id: "sq5", text: "Prefiro atrasar a entrega para deixar o código mais limpo e sustentável.", reversed: false },
    ],
    interpret: {
      leftStrengths: ["Velocidade para colocar valor em produção", "Pragmatismo para iterar e validar"],
      leftRisk: "Pode acumular dívida técnica e retrabalho se não houver revisões.",
      leftGrow: "Reserve uma janela curta por ciclo para pagar dívida (ex: 10-20%).",

      rightStrengths: ["Base técnica sólida e previsível", "Menos bugs e mais facilidade de evolução"],
      rightRisk: "Risco de overengineering e atrasos em validação com usuários.",
      rightGrow: "Defina um \"good enough\" e valide cedo com um MVP.",

      balancedStrengths: ["Equilíbrio entre velocidade e qualidade", "Boa leitura de trade-offs"],
      balancedRisk: "Pode oscilar sem critério claro em momentos de pressão.",
      balancedGrow: "Use critérios: risco (prod), custo, prazo e impacto para decidir.",
    }
  },
  {
    id: "product_infra",
    name: "Produto vs Infra",
    leftLabel: "Produto",
    rightLabel: "Infra",
    leftTag: "Produto-first",
    rightTag: "Infra-first",
    // ~metade invertida (2/5)
    questions: [
      { id: "pi1", text: "Eu penso primeiro no impacto para o usuário final.", reversed: false },
      { id: "pi2", text: "Decido prioridades olhando métricas e comportamento do usuário.", reversed: false },
      { id: "pi3", text: "Eu priorizo performance e estabilidade mesmo sem mudança visível.", reversed: false },
      { id: "pi4", text: "Observabilidade (logs/métricas/traces) é opcional na maioria dos projetos.", reversed: true },
      { id: "pi5", text: "Prefiro evitar otimizações se não houver evidências de problema.", reversed: true },
    ],
    interpret: {
      leftStrengths: ["Foco em valor, UX e aprendizado rápido", "Boa priorização por impacto"],
      leftRisk: "Pode subestimar confiabilidade, custo e operação.",
      leftGrow: "Adote um checklist mínimo: SLO, alertas básicos e budget de custo.",

      rightStrengths: ["Sistemas estáveis, eficientes e observáveis", "Menos incidentes e melhor operação"],
      rightRisk: "Pode entregar menos percepção de valor para usuário no curto prazo.",
      rightGrow: "Traduza trabalho de infra em impacto: latência, erro, custo, conversão.",

      balancedStrengths: ["Consegue balancear feature e plataforma", "Decisões mais completas"],
      balancedRisk: "Pode ficar \"meio termo\" e demorar para fechar prioridades.",
      balancedGrow: "Escolha 1 KPI de produto e 1 KPI de plataforma por ciclo.",
    }
  },
  {
    id: "generalist_specialist",
    name: "Generalista vs Especialista",
    leftLabel: "Generalista",
    rightLabel: "Especialista",
    leftTag: "Generalista",
    rightTag: "Especialista",
    // ~metade invertida (2/5)
    questions: [
      { id: "gs1", text: "Gosto de resolver problemas ponta a ponta.", reversed: false },
      { id: "gs2", text: "Me sinto confortável mudando de stack quando necessário.", reversed: false },
      { id: "gs3", text: "Prefiro me aprofundar muito em uma área específica.", reversed: false },
      { id: "gs4", text: "Não gosto de mexer em áreas fora do meu foco principal.", reversed: true },
      { id: "gs5", text: "Para mim, profundidade técnica em um tema vale mais que amplitude.", reversed: false },
    ],
    interpret: {
      leftStrengths: ["Versatilidade e visão ponta a ponta", "Facilidade para integrar partes do sistema"],
      leftRisk: "Pode perder profundidade em problemas complexos.",
      leftGrow: "Escolha um tema por trimestre para aprofundar (ex: perf, DB, front).",

      rightStrengths: ["Profundidade e domínio técnico", "Boa capacidade de resolver problemas difíceis"],
      rightRisk: "Pode criar gargalos e depender menos do time.",
      rightGrow: "Documente e compartilhe conhecimento (brown bag, RFC, pairing).",

      balancedStrengths: ["Amplitude com pontos de profundidade", "Boa adaptação conforme o contexto"],
      balancedRisk: "Pode dispersar energia em muitos assuntos.",
      balancedGrow: "Defina seu \"T-shape\": 1-2 profundidades + amplitude suficiente.",
    }
  },
  {
    id: "solo_leadership",
    name: "Solo vs Liderança/Alinhamento",
    leftLabel: "Solo",
    rightLabel: "Liderança",
    leftTag: "Solo",
    rightTag: "Liderança",
    // ~metade invertida (2/5)
    questions: [
      { id: "sl1", text: "Trabalho melhor quando tenho autonomia total.", reversed: false },
      { id: "sl2", text: "Prefiro resolver tarefas sozinho do que depender de alinhamentos.", reversed: false },
      { id: "sl3", text: "Gosto de alinhar e destravar outras pessoas.", reversed: false },
      { id: "sl4", text: "Evito coordenar porque atrapalha minha produtividade.", reversed: true },
      { id: "sl5", text: "Consigo definir direção técnica e influenciar sem autoridade formal.", reversed: false },
    ],
    interpret: {
      leftStrengths: ["Alta autonomia e velocidade individual", "Boa capacidade de execução focada"],
      leftRisk: "Risco de desalinhamento e trabalho duplicado no time.",
      leftGrow: "Crie rotinas leves: update curto, doc de decisão e checkpoints.",

      rightStrengths: ["Alinha visão, reduz fricção e destrava o time", "Boa coordenação e tomada de decisão"],
      rightRisk: "Pode se afastar do hands-on e perder sinal do código.",
      rightGrow: "Mantenha 10-30% hands-on e use pairing/reviews para ficar próximo.",

      balancedStrengths: ["Sabe executar e também alinhar quando preciso", "Flexibilidade de atuação"],
      balancedRisk: "Pode assumir demais e ficar sobrecarregado.",
      balancedGrow: "Combine: o que delegar, o que liderar e o que executar.",
    }
  },
  {
    id: "convenience_security",
    name: "Conveniência/Velocidade vs Segurança/Privacidade",
    leftLabel: "Conveniência/Velocidade",
    rightLabel: "Segurança/Privacidade",
    leftTag: "Conveniência-first",
    rightTag: "Segurança-first",
    // ~metade invertida (2/5)
    questions: [
      { id: "cs1", text: "Costumo priorizar conveniência/rapidez mesmo que os controles fiquem para depois.", reversed: true },
      { id: "cs2", text: "Acho que permissões mínimas (least privilege) valem o esforço extra.", reversed: false },
      { id: "cs3", text: "Logs podem incluir dados sensíveis se ajudarem a debugar mais rápido.", reversed: true },
      { id: "cs4", text: "Antes de expor uma API, penso em abuso, privacidade e risco.", reversed: false },
      { id: "cs5", text: "MFA, rotação de secrets e scans fazem parte do 'pronto'.", reversed: false },
    ],
    interpret: {
      leftStrengths: ["Entrega muito rápida, pouco atrito para lançar", "Foco em remover fricção para times e usuários"],
      leftRisk: "Pode abrir brechas de segurança/privacidade e gerar incidentes ou não-conformidade.",
      leftGrow: "Defina um mínimo viável de segurança (MFA, least privilege, secrets seguros) já na primeira entrega.",

      rightStrengths: ["Protege dados e reduz superfície de ataque", "Menos risco de incidentes e conformidade mais fácil"],
      rightRisk: "Pode aumentar fricção e atrasar releases ou experimentos.",
      rightGrow: "Crie padrões leves (templates/policies) para não travar o fluxo de entrega.",

      balancedStrengths: ["Entrega com controles essenciais por padrão", "Boa leitura de risco x velocidade"],
      balancedRisk: "Pode subestimar exceções (picos de risco) ou burocratizar demais",
      balancedGrow: "Use checklists curtos por tipo de entrega (API pública, dados sensíveis, acesso interno).",
    }
  }
];

// Monta um fluxo único com todas as perguntas (na ordem em que aparecem no quiz).
function buildQuestionFlow() {
  const flow = [];
  for (const axis of AXES) {
    for (const q of axis.questions) {
      flow.push({
        axisId: axis.id,
        axisName: axis.name,
        leftLabel: axis.leftLabel,
        rightLabel: axis.rightLabel,
        questionId: q.id,
        text: q.text,
        reversed: !!q.reversed,
      });
    }
  }
  return flow;
}

const QUESTION_FLOW = buildQuestionFlow();

// ---------------------------
// ESTADO (navegação + respostas)
// ---------------------------

const state = {
  screen: "start", // start | quiz | results
  qIndex: 0,
  // respostas por questionId -> 1..5
  answers: {},
  lastResult: null,
};

// Chave do localStorage (versionada pra não conflitar com futuras mudanças)
const STORAGE_KEY = "fiveAxesDevTechTest:lastResult:v1";

// ---------------------------
// UTILITÁRIOS
// ---------------------------

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function round1(n) {
  return Math.round(n);
}

function showToast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  window.clearTimeout(showToast._t);
  showToast._t = window.setTimeout(() => el.classList.remove("show"), 1800);
}

function safeNowIso() {
  return new Date().toISOString();
}

// ---------------------------
// LÓGICA (score)
// ---------------------------

function applyReverseIfNeeded(value1to5, reversed) {
  // Pergunta invertida: v' = 6 - v
  return reversed ? (6 - value1to5) : value1to5;
}

function axisScoreFromAnswers(axis) {
  const qIds = axis.questions.map(q => q.id);
  const N = qIds.length;
  let sum = 0;

  for (const q of axis.questions) {
    const raw = state.answers[q.id];
    if (typeof raw !== "number") {
      return null; // unanswered
    }
    const v = applyReverseIfNeeded(raw, !!q.reversed);
    sum += v;
  }

  const min = N * 1;
  const max = N * 5;
  const score = ((sum - min) / (max - min)) * 100;
  return clamp(score, 0, 100);
}

function tendencyLabel(score, axis) {
  // Returns: { levelText, poleText, bucket }
  const s = clamp(score, 0, 100);

  if (s <= 25) return { bucket: "strong-left", levelText: "Forte", poleText: axis.leftLabel };
  if (s <= 45) return { bucket: "light-left", levelText: "Leve", poleText: axis.leftLabel };
  if (s <= 55) return { bucket: "balanced", levelText: "Equilibrado", poleText: "" };
  if (s <= 75) return { bucket: "light-right", levelText: "Leve", poleText: axis.rightLabel };
  return { bucket: "strong-right", levelText: "Forte", poleText: axis.rightLabel };
}

function profileTagForAxis(axis, score) {
  const s = clamp(score, 0, 100);
  if (s >= 56) return axis.rightTag;
  if (s <= 45) return axis.leftTag;
  return "Equilibrado";
}

function interpretForAxis(axis, score) {
  const t = tendencyLabel(score, axis);
  if (t.bucket === "balanced") {
    return {
      forces: axis.interpret.balancedStrengths,
      risk: axis.interpret.balancedRisk,
      grow: axis.interpret.balancedGrow,
    };
  }
  if (t.bucket === "strong-left" || t.bucket === "light-left") {
    return {
      forces: axis.interpret.leftStrengths,
      risk: axis.interpret.leftRisk,
      grow: axis.interpret.leftGrow,
    };
  }
  return {
    forces: axis.interpret.rightStrengths,
    risk: axis.interpret.rightRisk,
    grow: axis.interpret.rightGrow,
  };
}

function computeResults() {
  const axesResults = [];
  for (const axis of AXES) {
    const score = axisScoreFromAnswers(axis);
    if (score === null) return null;
    axesResults.push({ axisId: axis.id, score });
  }

  const byId = Object.fromEntries(axesResults.map(r => [r.axisId, r.score]));

  const profileTags = AXES.map(a => profileTagForAxis(a, byId[a.id]));

  // Recomendações rápidas quando dá “pico” (muito forte em algum lado do eixo).
  const recs = [];
  for (const axis of AXES) {
    const s = byId[axis.id];
    const t = tendencyLabel(s, axis);
    if (t.bucket === "strong-left" || t.bucket === "strong-right") {
      recs.push(`${axis.name}: manter o ponto forte e criar um "contrapeso" operacional.`);
    }
  }
  if (recs.length === 0) {
    recs.push("Perfil equilibrado: use contexto (prazo, risco e impacto) para decidir o trade-off de cada eixo.");
  }

  return {
    computedAt: safeNowIso(),
    scores: byId,
    profileTags,
    recommendations: recs,
  };
}

function buildCopySummary(result) {
  const lines = [];
  lines.push("5 Axes Dev/Tech Test - Resumo");
  lines.push(`Data: ${result.computedAt}`);
  lines.push("");

  for (const axis of AXES) {
    const score = result.scores[axis.id];
    const t = tendencyLabel(score, axis);
    const tText = t.bucket === "balanced" ? "Equilibrado" : `${t.levelText} polo ${t.poleText}`;
    lines.push(`${axis.name}: ${round1(score)}/100 (${tText})`);
  }

  lines.push("");
  lines.push(`Perfil: ${result.profileTags.join(" | ")}`);
  lines.push("");
  lines.push("Recomendações:");
  for (const r of result.recommendations) lines.push(`- ${r}`);

  return lines.join("\n");
}

// ---------------------------
// RENDER (UI)
// ---------------------------

function setScreen(name) {
  state.screen = name;
  document.body.classList.toggle("quiz-mode", name === "quiz");
  document.body.classList.toggle("start-mode", name === "start");
  document.body.classList.toggle("results-mode", name === "results");
  document.getElementById("screenStart").classList.toggle("active", name === "start");
  document.getElementById("screenQuiz").classList.toggle("active", name === "quiz");
  document.getElementById("screenResults").classList.toggle("active", name === "results");
  renderHeaderTags();

  // Acessibilidade básica: ao entrar no quiz, tenta focar a primeira opção.
  if (name === "quiz") {
    window.setTimeout(() => {
      const firstRadio = document.querySelector("input[name='likert']:checked") || document.querySelector("input[name='likert']");
      if (firstRadio) firstRadio.focus();
    }, 0);
  }
}

function renderHeaderTags() {
  const holder = document.getElementById("headerTags");
  holder.innerHTML = "";
  if (state.screen === "results" && state.lastResult) {
    // Mostra as tags lá no topo só na tela de resultado.
    const tags = state.lastResult.profileTags;
    tags.forEach((t, idx) => {
      const span = document.createElement("span");
      span.className = "tag" + (idx % 2 ? " alt" : "");
      span.innerHTML = `<span class="dot" aria-hidden="true"></span><span>${t}</span>`;
      holder.appendChild(span);
    });
  }
}

function renderLikertOptions(selectedValue) {
  const group = document.getElementById("likertGroup");
  group.innerHTML = "";

  const labels = [
    "Discordo totalmente",
    "Discordo",
    "Neutro",
    "Concordo",
    "Concordo totalmente",
  ];

  for (let v = 1; v <= 5; v++) {
    const id = `likert-${v}`;
    const label = document.createElement("label");
    label.className = "choice";
    label.setAttribute("for", id);

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "likert";
    input.id = id;
    input.value = String(v);
    input.checked = (Number(selectedValue) === v);

    input.addEventListener("change", () => {
      const q = QUESTION_FLOW[state.qIndex];
      state.answers[q.questionId] = v;
      document.getElementById("quizError").classList.remove("show");
      // Só libera o botão de avançar quando a pergunta estiver respondida.
      updateNavButtons();
    });

    const txt = document.createElement("div");
    txt.className = "txt";
    txt.innerHTML = `<div class="n">${v}</div><div class="d">${labels[v - 1]}</div>`;

    label.appendChild(input);
    label.appendChild(txt);
    group.appendChild(label);
  }
}

function updateNavButtons() {
  const btnBack = document.getElementById("btnBack");
  const btnNext = document.getElementById("btnNext");

  btnBack.disabled = state.qIndex === 0;

  const q = QUESTION_FLOW[state.qIndex];
  const hasAnswer = typeof state.answers[q.questionId] === "number";

  if (state.qIndex === QUESTION_FLOW.length - 1) {
    btnNext.textContent = "Finalizar";
  } else {
    btnNext.textContent = "Próximo";
  }

  btnNext.disabled = !hasAnswer;
}

function renderQuiz() {
  const q = QUESTION_FLOW[state.qIndex];
  const currentQuestion = state.qIndex + 1;
  document.getElementById("quizTitle").textContent = "Pergunta";
  document.getElementById("quizSub").textContent = `Pergunta ${currentQuestion} de ${QUESTION_FLOW.length}`;
  document.getElementById("questionText").textContent = q.text;
  document.getElementById("axisHint").textContent = `Eixo: ${q.axisName}`;

  const pct = (currentQuestion / QUESTION_FLOW.length) * 100;
  const bar = document.getElementById("quizProgressBar");
  bar.style.width = `${clamp(pct, 0, 100)}%`;

  const progress = document.querySelector("[role='progressbar']");
  progress.setAttribute("aria-valuenow", String(currentQuestion));
  progress.setAttribute("aria-valuetext", `Pergunta ${currentQuestion} de ${QUESTION_FLOW.length}`);

  const selected = state.answers[q.questionId];
  renderLikertOptions(selected);
  document.getElementById("quizError").classList.remove("show");
  updateNavButtons();
}

function renderAxisCards(result) {
  const container = document.getElementById("axisCards");
  container.innerHTML = "";

  for (const axis of AXES) {
    const score = result.scores[axis.id];
    const t = tendencyLabel(score, axis);
    const tText = t.bucket === "balanced" ? "Equilibrado" : `Tendência ${t.levelText.toLowerCase()}: ${t.poleText}`;
    const interp = interpretForAxis(axis, score);

    const card = document.createElement("div");
    card.className = "axis-card card";

    const pct = clamp(score, 0, 100);

    card.innerHTML = `
      <h3>${axis.name}</h3>
      <p class="small">0 = ${axis.leftLabel} · 100 = ${axis.rightLabel}</p>
      <div class="scoreline">
        <div class="score">${round1(score)}</div>
        <div class="tendency">${tText}</div>
      </div>
      <div class="progress" aria-label="Posição do score">
        <div style="width:${pct}%"></div>
      </div>
      <div style="margin-top:10px">
        <div class="muted" style="font-weight:750">Forças</div>
        <ul>
          <li>${interp.forces[0]}</li>
          <li>${interp.forces[1]}</li>
        </ul>
        <div class="muted" style="font-weight:750; margin-top:10px">Risco</div>
        <ul>
          <li>${interp.risk}</li>
        </ul>
        <div class="muted" style="font-weight:750; margin-top:10px">Sugestão prática</div>
        <ul>
          <li>${interp.grow}</li>
        </ul>
      </div>
    `;

    container.appendChild(card);
  }
}

function renderProfileTags(result) {
  const holder = document.getElementById("profileTags");
  holder.innerHTML = "";
  result.profileTags.forEach((t, idx) => {
    const span = document.createElement("span");
    span.className = "tag" + (idx % 2 ? " alt" : "");
    span.innerHTML = `<span class="dot" aria-hidden="true"></span><span>${t}</span>`;
    holder.appendChild(span);
  });
}

function renderRecommendations(result) {
  const el = document.getElementById("finalRecommendations");
  el.textContent = result.recommendations.join(" ");
}

// ---------------------------
// Canvas: Radar (sem libs)
// ---------------------------

function drawRadar(result) {
  const canvas = document.getElementById("radar");
  const ctx = canvas.getContext("2d");

  // HiDPI: ajusta o canvas pra ficar nítido em telas retina/4K
  const dpr = window.devicePixelRatio || 1;
  const cssW = canvas.clientWidth;
  const cssH = canvas.clientHeight;
  canvas.width = Math.round(cssW * dpr);
  canvas.height = Math.round(cssH * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const w = cssW;
  const h = cssH;

  ctx.clearRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.52;
  const r = Math.min(w, h) * 0.34;

  // Cores (puxadas das CSS vars pra manter o tema consistente)
  const styles = getComputedStyle(document.documentElement);
  const gridStroke = styles.getPropertyValue("--border").trim() || "rgba(255,255,255,.12)";
  const textCol = styles.getPropertyValue("--muted").trim() || "rgba(255,255,255,.68)";
  const polyFill = "rgba(43,125,233,.20)";
  const polyStroke = "rgba(43,125,233,.95)";
  const dotCol = "rgba(46,125,210,.95)";

  const labels = AXES.map(a => a.name);
  const values = AXES.map(a => clamp(result.scores[a.id], 0, 100) / 100);
  const n = labels.length;

  // Anéis da grade
  ctx.lineWidth = 1;
  ctx.strokeStyle = gridStroke;
  for (let ring = 1; ring <= 4; ring++) {
    const rr = (r * ring) / 4;
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const ang = (-Math.PI / 2) + (i * 2 * Math.PI / n);
      const x = cx + Math.cos(ang) * rr;
      const y = cy + Math.sin(ang) * rr;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  }

  // Linhas dos eixos
  for (let i = 0; i < n; i++) {
    const ang = (-Math.PI / 2) + (i * 2 * Math.PI / n);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(ang) * r, cy + Math.sin(ang) * r);
    ctx.stroke();
  }

  // Polígono do resultado
  ctx.beginPath();
  for (let i = 0; i < n; i++) {
    const ang = (-Math.PI / 2) + (i * 2 * Math.PI / n);
    const rr = r * values[i];
    const x = cx + Math.cos(ang) * rr;
    const y = cy + Math.sin(ang) * rr;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = polyFill;
  ctx.fill();
  ctx.strokeStyle = polyStroke;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Pontinhos (valores)
  for (let i = 0; i < n; i++) {
    const ang = (-Math.PI / 2) + (i * 2 * Math.PI / n);
    const rr = r * values[i];
    const x = cx + Math.cos(ang) * rr;
    const y = cy + Math.sin(ang) * rr;
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fillStyle = dotCol;
    ctx.fill();
  }

  // Labels (nomes dos eixos)
  ctx.fillStyle = textCol;
  ctx.font = "bold 16px 'Montserrat', system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let i = 0; i < n; i++) {
    const ang = (-Math.PI / 2) + (i * 2 * Math.PI / n);
    const lx = cx + Math.cos(ang) * (r + 40);
    const ly = cy + Math.sin(ang) * (r + 40);

    // Quebra em 2 linhas quando tem "vs" (fica mais legível)
    const parts = labels[i].split(" vs ");
    if (parts.length === 2) {
      ctx.fillText(parts[0], lx, ly - 12);
      ctx.fillText("vs " + parts[1], lx, ly + 12);
    } else {
      ctx.fillText(labels[i], lx, ly);
    }
  }

  // Marca simples de referência
  ctx.fillStyle = textCol;
  ctx.font = "bold 14px 'Montserrat', system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  ctx.fillText("0", cx, cy + r + 18);
}

function renderResults(result) {
  state.lastResult = result;
  renderAxisCards(result);
  renderProfileTags(result);
  renderRecommendations(result);
  renderHeaderTags();
  drawRadar(result);

  // Aviso simples: o resultado fica salvo localmente
  const hint = document.getElementById("savedHint");
  hint.textContent = "Resultado salvo localmente (opcional) para você ver depois.";
}

// ---------------------------
// Persistência (opcional)
// ---------------------------

function loadLastResult() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    if (!parsed.scores || !parsed.profileTags) return null;
    return parsed;
  } catch (_) {
    return null;
  }
}

function saveLastResult(result) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
  } catch (_) {
    // Sem drama: se falhar (quota, bloqueio etc.), o app segue normal.
  }
}

// ---------------------------
// Ações / navegação
// ---------------------------

function resetQuiz() {
  state.qIndex = 0;
  state.answers = {};
  state.lastResult = null;
}

function startQuiz() {
  resetQuiz();
  setScreen("quiz");
  renderQuiz();
}

function viewLast() {
  const last = loadLastResult();
  if (!last) {
    showToast("Nenhum resultado salvo.");
    return;
  }
  setScreen("results");
  renderResults(last);
}

function goNext() {
  const q = QUESTION_FLOW[state.qIndex];
  const hasAnswer = typeof state.answers[q.questionId] === "number";
  if (!hasAnswer) {
    document.getElementById("quizError").classList.add("show");
    return;
  }

  if (state.qIndex === QUESTION_FLOW.length - 1) {
    const result = computeResults();
    if (!result) {
      document.getElementById("quizError").classList.add("show");
      return;
    }
    saveLastResult(result);
    setScreen("results");
    renderResults(result);
    showToast("Teste finalizado.");
    return;
  }

  state.qIndex += 1;
  renderQuiz();
}

function goBack() {
  if (state.qIndex === 0) return;
  state.qIndex -= 1;
  renderQuiz();
}

async function copySummary() {
  if (!state.lastResult) return;
  const text = buildCopySummary(state.lastResult);
  try {
    await navigator.clipboard.writeText(text);
    showToast("Resumo copiado.");
  } catch (_) {
    // Fallback (navegadores antigos / restrição quando abre via file://)
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    ta.setAttribute("readonly", "");
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      showToast("Resumo copiado.");
    } catch (__) {
      showToast("Falha ao copiar. Selecione e copie manualmente.");
      window.prompt("Copie o texto:", text);
    } finally {
      document.body.removeChild(ta);
    }
  }
}

// ---------------------------
// Inicialização
// ---------------------------

function init() {
  const progress = document.querySelector("[role='progressbar']");
  progress.setAttribute("aria-valuemin", "1");
  progress.setAttribute("aria-valuemax", String(QUESTION_FLOW.length));
  progress.setAttribute("aria-valuenow", "1");
  progress.setAttribute("aria-valuetext", `Pergunta 1 de ${QUESTION_FLOW.length}`);

  // Se tiver um resultado salvo, habilita o botão "Ver último resultado"
  const last = loadLastResult();
  const btnViewLast = document.getElementById("btnViewLast");
  if (last) btnViewLast.style.display = "inline-flex";

  // Liga os botões nos handlers
  document.getElementById("btnStart").addEventListener("click", startQuiz);
  btnViewLast.addEventListener("click", viewLast);

  document.getElementById("btnNext").addEventListener("click", goNext);
  document.getElementById("btnBack").addEventListener("click", goBack);

  document.getElementById("btnRetry").addEventListener("click", () => {
    startQuiz();
  });

  document.getElementById("btnCopy").addEventListener("click", copySummary);

  // Redesenha o radar quando a tela muda de tamanho (só no resultado)
  window.addEventListener("resize", () => {
    if (state.screen === "results" && state.lastResult) drawRadar(state.lastResult);
  });

  // Atalho: Enter avança (desde que a pergunta já tenha resposta)
  document.addEventListener("keydown", (e) => {
    if (state.screen !== "quiz") return;
    if (e.key === "Enter") {
      e.preventDefault();
      goNext();
    }
  });

  setScreen("start");
}

// Sobe a aplicação quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", init);
