let velocidadeMundo = 3;
let abelha, florInimigo, apicultor, homem, sol;
let imgBel, imgFlor, imgApi, imgHomem, imgSol, imgPlat;
let plataformas = [];
let larguraPlat = 1536;
let alturaPlat = 198;
let cameraX = 0;
let npcs = [];
let vidas = 3;
let maxVidas = 3;
let invencivel = false;
let tempoInvencivel = 0;
let estadoJogo = "jogando";

let colFlor = false, colApicultor = false, colHomem = false, abelhaCaiu = false;


function preload() {
  imgBel = loadImage("img/bel-sm.png");
  imgFlor = loadImage("img/flor.png");
  imgApi = loadImage("img/apicultor.png");
  imgHomem = loadImage("img/homi.png");
  imgSol = loadImage("img/sol.png");
  imgPlat = loadImage("img/plataforma.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  let topoPlat = height - imgPlat.height;

  let alturaFlor = imgFlor.height * 0.18;
  florInimigo = new Flor(700, topoPlat - alturaFlor, alturaFlor, 100, imgFlor, 2);

  let alturaApi = imgApi.height * 0.6;
  apicultor = new Apicultor(1000, topoPlat - alturaApi, 800, 60, 70, 2, imgApi);

  let alturaHomem = imgHomem.height * 0.6;
  homem = new Homem(1500, topoPlat - alturaHomem, 500, 60, 70, 2, imgHomem);

  sol = new Sol(1100, 50, 300, 150, 150, imgSol);
  abelha = new Abelha(120, 100, 0.5, 0, 10, imgBel, topoPlat);

  npcs = [
    florInimigo,
    apicultor,
    homem,
    new Flor(2000, topoPlat - alturaFlor, alturaFlor, 100, imgFlor, 2)
  ];

  let x = -800;
  while (x < windowWidth * 10) {
    plataformas.push(
      new Plataforma(x, topoPlat, 1, imgPlat.height, larguraPlat, imgPlat)
    );
    x += larguraPlat;
  }
}

function draw() {
  background("rgba(123, 204, 255, 1)");

  if (estadoJogo === "gameover") {
    telaGameOver();
    return;
  }

  sol.x -= velocidadeMundo * 0.2;
  sol.mostrar();

  abelha.moverVertical();
  abelhaCaiu = abelha.caiu();

  // plataformas
  for (let plat of plataformas) {
    plat.x -= velocidadeMundo;

    if (plat.x + plat.largura < 0) {
      plat.x += larguraPlat * plataformas.length;
    }
    plat.mostrar();
  }

  for (let i = npcs.length - 1; i >= 0; i--) {
    let npc = npcs[i];
    npc.x -= velocidadeMundo;
    npc.mostrar();

    if (abelha.colidiu(npc) && !invencivel) {
      vidas--;
      invencivel = true;
      tempoInvencivel = frameCount;

      if (npc instanceof Flor) colFlor = true;
      if (npc instanceof Apicultor) colApicultor = true;
      if (npc instanceof Homem) colHomem = true;

      npcs.splice(i, 1);
    }
  }


  if (invencivel && frameCount - tempoInvencivel > 60) {
    invencivel = false;
  }

  abelha.mostrar();
//aqui é os ajustes da posição dos corações
for (let i = 0; i < maxVidas; i++) {
  let cheio = i < vidas;
  desenharCoracao(40 + i * 50, 50, 0.6, cheio);
}

  desenharMostrador(10, height - 100);

    if (vidas <= 0) {
    estadoJogo = "gameover";
  }
}

function telaGameOver() {
  background("rgba(123, 204, 255, 1)");

  textAlign(CENTER, CENTER);
  fill(255);
  textSize(42);
  text("GAME OVER", width / 2, height / 2 - 50);
}

function desenharCoracao(x, y, tamanho, cheio) {
  push();
  translate(x, y);
  scale(tamanho);
  noStroke();

  if (cheio) {
    fill(255, 0, 0);
  } else {
    noFill();
    stroke(255, 0, 0);
    strokeWeight(3);
  }

  beginShape();
  vertex(0, 0);
  bezierVertex(-20, -20, -40, 10, 0, 40);
  bezierVertex(40, 10, 20, -20, 0, 0);
  endShape(CLOSE);

  pop();
}

// DEBUG
function desenharMostrador(x, y) {
  fill(0);
  noStroke();
  textSize(14);
  text(`Vidas: ${vidas}`, x, y);
  text(`Colidiu com flor: ${colFlor}`, x, y + 20);
  text(`Colidiu com apicultor: ${colApicultor}`, x, y + 40);
  text(`Colidiu com homem: ${colHomem}`, x, y + 60);
  text(`Caiu: ${abelhaCaiu}`, x, y + 80);
}

