// Adaptação para dificuldade
function getTextosPorDificuldade(dificuldade) {
  if (dificuldade === "facil") {
    return [
      `A arte é expressão.`,
      `O quadro é bonito.`,
      `A escultura é antiga.`,
      `O teatro encanta.`,
      `A música alegra.`,
      `O artista pinta com paixão.`,
      `O museu é silencioso.`,
      `O desenho é simples.`,
      `A cor é vibrante.`,
      `O papel está em branco.`,
      `O pincel desliza fácil.`,
      `O retrato é famoso.`,
      `A dança é leve.`,
      `O palco está iluminado.`,
      `O som é suave.`,
    ];
  } else if (dificuldade === "medio") {
    return [
      `A arte é uma linguagem universal que permite ao ser humano expressar sentimentos, ideias e visões de mundo.`,
      `O Renascimento marcou uma revolução artística e cultural na Europa, trazendo inovações como a perspectiva e o realismo.`,
      `A escultura clássica grega influenciou profundamente a arte ocidental, buscando representar o corpo humano com perfeição.`,
      `No século XIX, movimentos como o Impressionismo desafiaram as convenções acadêmicas, explorando a luz e a cor.`,
      `A música, a dança e o teatro também são formas de arte que emocionam e conectam pessoas ao redor do mundo.`,
      `O cubismo, liderado por Picasso e Braque, fragmentou as formas e revolucionou a pintura moderna.`,
      `O expressionismo buscava transmitir emoções intensas por meio de cores fortes e traços marcantes.`,
      `O barroco destacou-se pelo uso dramático da luz e sombra, criando cenas de grande impacto visual.`,
      `A arte abstrata rompeu com a representação figurativa, focando em formas, cores e sensações.`,
      `O grafite urbano é uma manifestação artística contemporânea que colore as cidades e provoca reflexões.`,
    ];
  } else {
    // difícil
    return [
      `A arte é uma linguagem universal que permite ao ser humano expressar sentimentos, ideias e visões de mundo. Desde as pinturas rupestres até as instalações contemporâneas, a arte acompanha a evolução da sociedade, refletindo seus valores, conflitos e sonhos.`,
      `O Renascimento marcou uma revolução artística e cultural na Europa, trazendo inovações como a perspectiva, o realismo e o estudo anatômico. Artistas como Leonardo da Vinci, Michelangelo e Rafael transformaram a maneira como a arte era produzida e apreciada.`,
      `A escultura clássica grega influenciou profundamente a arte ocidental, buscando representar o corpo humano com perfeição e harmonia. Obras como o Discóbolo e a Vênus de Milo são exemplos do ideal de beleza da época.`,
      `No século XIX, movimentos como o Impressionismo desafiaram as convenções acadêmicas, explorando a luz, a cor e a percepção visual. Monet, Renoir e Degas capturaram cenas do cotidiano com pinceladas soltas e vibrantes.`,
      `A arte moderna e contemporânea rompeu com padrões tradicionais, abrindo espaço para a experimentação e a diversidade de linguagens. O abstracionismo, o cubismo e o surrealismo são exemplos de movimentos que expandiram os limites da criatividade.`,
      `O Surrealismo, liderado por Salvador Dalí e René Magritte, explorou o inconsciente e o mundo dos sonhos, criando imagens inusitadas e simbólicas que desafiam a lógica tradicional.`,
      `O movimento Bauhaus, surgido na Alemanha, integrou arte, design e arquitetura, influenciando profundamente a estética do século XX.`,
      `A Pop Art, representada por Andy Warhol e Roy Lichtenstein, utilizou elementos da cultura de massa e publicidade para questionar o consumo e a sociedade contemporânea.`,
      `A performance art rompeu as barreiras entre artista e público, utilizando o corpo e a ação como meios de expressão efêmera e provocativa.`,
      `A arte digital, impulsionada pela tecnologia, abriu novas possibilidades criativas, permitindo a criação de obras interativas, animações e experiências imersivas em ambientes virtuais.`,
    ];
  }
}

// Detecta dificuldade pela URL
let dificuldade = "medio";
const params = new URLSearchParams(window.location.search);
if (params.has("dificuldade")) {
  dificuldade = params.get("dificuldade");
}
const textos = getTextosPorDificuldade(dificuldade);

// Embaralha o array de textos
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffleArray(textos);

let textoAtual = 0;
let timerInterval = null;
let tempo = 0;
let timerAtivo = false;
let totalTeclas = 0;
let acertos = 0;
let tempoFinal = 0;
let erroBloqueado = false;

const textDisplay = document.getElementById("text-display");
const textInput = document.getElementById("text-input");
const finalizarBtn = document.getElementById("finalizar-btn");
const nextBtn = document.getElementById("next-btn");
const timerDiv = document.getElementById("timer");
const alertaDiv = document.getElementById("alerta");
const typingArea = document.getElementById("typing-area");
const resultadosDiv = document.getElementById("resultados");

function formatarTempo(segundos) {
  const min = String(Math.floor(segundos / 60)).padStart(2, "0");
  const sec = String(segundos % 60).padStart(2, "0");
  return `${min}:${sec}`;
}

function iniciarTimer() {
  if (timerAtivo) return;
  timerAtivo = true;
  timerInterval = setInterval(() => {
    tempo++;
    const tpm = tempo > 0 ? Math.round((totalTeclas / tempo) * 60) : 0;
    timerDiv.innerHTML = `<span style='font-size:1.5rem;'>⌨️</span> <b>${tpm}</b> teclas por minuto`;
  }, 1000);
}

function pararTimer() {
  clearInterval(timerInterval);
  timerAtivo = false;
}

function resetarTimer() {
  pararTimer();
  tempo = 0;
  timerDiv.innerHTML = `<span style='font-size:1.5rem;'>⌨️</span> <b>0</b> teclas por minuto`;
}

function carregarTexto() {
  // Mostra o texto de referência apagado no typing-area
  let html = "";
  const textoRef = textos[textoAtual];
  for (let i = 0; i < textoRef.length; i++) {
    html += `<span style=\"color:#bbb;\">${
      textoRef[i] === " " ? "&nbsp;" : textoRef[i]
    }</span>`;
  }
  typingArea.innerHTML = html;
  textInput.value = "";
  textInput.style.borderColor = "#ccc";
  textInput.style.background = "#18191a";
  alertaDiv.style.display = "none";
  resetarTimer();
  textInput.disabled = false;
  nextBtn.disabled = false;
  finalizarBtn.style.display = "inline-block";
  totalTeclas = 0;
  acertos = 0;
  tempoFinal = 0;
  resultadosDiv.style.display = "none";
  textInput.focus();
}

textInput.addEventListener("input", () => {
  if (!timerAtivo && textInput.value.length > 0) iniciarTimer();
  const textoRef = textos[textoAtual];
  const digitado = textInput.value;
  totalTeclas = digitado.length;
  let html = "";
  acertos = 0;
  erroBloqueado = false;
  for (let i = 0; i < textoRef.length; i++) {
    if (i < digitado.length) {
      if (digitado[i] === textoRef[i]) {
        acertos++;
        html += `<span style=\"color:#fff;text-shadow:0 2px 8px #000,0 0 6px #000;font-weight:bold;\">${
          textoRef[i] === " " ? "&nbsp;" : textoRef[i]
        }</span>`;
      } else {
        html += `<span style=\"color:#e53935;background:#222;border-radius:2px;\">${
          textoRef[i] === " " ? "&nbsp;" : textoRef[i]
        }</span>`;
        if (!erroBloqueado) erroBloqueado = true;
      }
    } else {
      html += `<span style=\"color:#bbb;\">${
        textoRef[i] === " " ? "&nbsp;" : textoRef[i]
      }</span>`;
    }
  }
  typingArea.innerHTML = html;
  if (digitado === textoRef) {
    textInput.style.borderColor = "#4CAF50";
    textInput.style.background = "#263238";
    alertaDiv.style.display = "none";
    pararTimer();
    textInput.disabled = true;
    nextBtn.disabled = false;
    finalizarBtn.style.display = "inline-block";
    tempoFinal = tempo;
  } else if (erroBloqueado) {
    textInput.style.borderColor = "#e53935";
    textInput.style.background = "#18191a";
    alertaDiv.textContent = "Corrija o erro antes de continuar digitando!";
    alertaDiv.style.display = "block";
  } else {
    textInput.style.borderColor = "#e53935";
    textInput.style.background = "#18191a";
    alertaDiv.style.display = "none";
    nextBtn.disabled = false;
  }
});

textInput.addEventListener("beforeinput", function (e) {
  if (!erroBloqueado) return;
  // Só permite apagar se houver erro
  if (e.inputType !== "deleteContentBackward") {
    e.preventDefault();
  }
});

finalizarBtn.addEventListener("click", () => {
  if (textInput.value !== textos[textoAtual]) {
    alertaDiv.textContent =
      "Digite o texto exatamente igual ao exibido para finalizar!";
    alertaDiv.style.display = "block";
    textInput.focus();
    return;
  }
  pararTimer();
  textInput.disabled = true;
  tempoFinal = tempo;
  const tpm = tempoFinal > 0 ? Math.round((totalTeclas / tempoFinal) * 60) : 0;
  // Define rank por TPM
  let rank = "",
    rankClass = "",
    rankIcon = "";
  if (tpm < 100) {
    rank = "Ferro";
    rankClass = "ferro";
    rankIcon = "🥉";
  } else if (tpm < 160) {
    rank = "Bronze";
    rankClass = "bronze";
    rankIcon = "🥉";
  } else if (tpm < 220) {
    rank = "Ouro";
    rankClass = "ouro";
    rankIcon = "🥇";
  } else if (tpm < 270) {
    rank = "Platina";
    rankClass = "platina";
    rankIcon = "🏅";
  } else if (tpm < 320) {
    rank = "Esmeralda";
    rankClass = "esmeralda";
    rankIcon = "💚";
  } else if (tpm < 400) {
    rank = "Diamante";
    rankClass = "diamante";
    rankIcon = "💎";
  } else {
    rank = "Mestre";
    rankClass = "mestre";
    rankIcon = "🏆";
  }

  resultadosDiv.innerHTML = `
        <div style='font-size:1.5rem;margin-bottom:10px;'>Seu desempenho:</div>
        <div class='rank ${rankClass}' style='display:flex;align-items:center;justify-content:center;gap:12px;'>
          <span style='font-size:2.2rem;'>${rankIcon}</span> ${rank}
        </div>
        <div style='margin:18px 0 8px 0;'>⏩ <b>${tpm}</b> teclas por minuto</div>
        <div style='margin-bottom:8px;'>⏱️ Tempo: <b>${formatarTempo(
          tempoFinal
        )}</b></div>
        <div style='margin-bottom:8px;'>✔️ Acertos: <b>${acertos} / ${
    textos[textoAtual].length
  }</b></div>
      `;
  resultadosDiv.style.display = "block";
  finalizarBtn.style.display = "none";
  nextBtn.style.display = "inline-block";
});

nextBtn.addEventListener("click", () => {
  textoAtual = (textoAtual + 1) % textos.length;
  carregarTexto();
  resultadosDiv.style.display = "none";
  nextBtn.style.display = "none";
  finalizarBtn.style.display = "inline-block";
});

// Carrega o primeiro texto ao iniciar
carregarTexto();
