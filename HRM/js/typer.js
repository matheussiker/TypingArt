const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const dificuldadeSelect = document.getElementById("dificuldade");

const words = [
  "cubismo", "realismo", "surrealismo", "impressionismo", "expressionismo", "modernismo", "romantismo", "barroco", "rococo", "maneirismo",
  "vangogh", "picasso", "monet", "dali", "portinari", "tarsila", "michelangelo", "leonardo", "rembrandt", "goya",
  "guernica", "girassois", "monalisa", "noiteestrelada", "abaporu", "osretirantes", "guache", "aquarela", "oleo", "lápis",
  "pincel", "tinta", "tela", "escultura", "desenho", "pintura", "grafite", "colagem", "xilogravura", "litografia",
  "mosaico", "forma", "linha", "cor", "volume", "textura", "sombra", "luz", "paleta", "proporcao",
  "composicao", "esboco", "croqui", "autorretrato", "paisagem", "naturezamorta", "retrato", "abstrato", "figurativo", "simbolismo",
  "harmonia", "contraste", "ritmo", "movimento", "equilibrio", "estetica", "observacao", "perspectiva", "montagem", "tecnica",
  "modelo", "cenografia", "ilustracao", "grafismo", "coresprimarias", "coressecundarias", "formasgeometricas", "formasorganicas", "estilo", "detalhe",
  "projeto", "experimento", "criatividade", "artebrasileira", "artemoderna", "artecontemporanea", "performance", "oficina", "exposicao", "galeria",
  "atelier", "artista", "pintor", "escultor", "cenografo", "ilustrador", "arteeducacao", "criacao", "desenholivre", "observador"
];

let randomWord;
let score = 0;
let time = 10;
let timerAtivo = false;
let timeInterval;

let dificuldade =
  localStorage.getItem("dificuldade") !== null
    ? localStorage.getItem("dificuldade")
    : "medio";

dificuldadeSelect.value = dificuldade;

text.focus();

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}


function displayWord(input) {
  word.innerHTML = "";

  [...randomWord].forEach((letra, i) => {
    const span2 = document.createElement("span2");
    span2.classList.add("letra");

    if (i < input.length) {
      if (input[i] === letra) {
        span2.classList.add("correto");
      } else {
        span2.classList.add("errado");
      }
    }

    span2.textContent = letra;
    word.appendChild(span2);
  });
}

function addWord() {
  randomWord = getRandomWord();
  displayWord("");
}

function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

function gameOver() {
  endgameEl.innerHTML = `
    <div class="pos-game">
      <h1>O tempo acabou</h1>
      <p>Você obteve <span>${score} pontos!</span></p>
      <p>Modo: ${dificuldade}</p>
      <button onclick="location.reload()">Reiniciar</button>
    </div>
  `;
  endgameEl.style.display = "flex";
}

addWord();

text.addEventListener("input", (e) => {
  if (!timerAtivo) {
    timerAtivo = true;
    timeInterval = setInterval(updateTime, 1000);
  }

  const insertedText = e.target.value;

  displayWord(insertedText);

  if (insertedText === randomWord) {
    addWord();
    updateScore();
    e.target.value = "";

    if (dificuldade === "dificil") {
      time += 2;
    } else if (dificuldade === "medio") {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

settingsForm.addEventListener("change", (e) => {
  dificuldade = e.target.value;
  localStorage.setItem("dificuldade", dificuldade);
});
