let velocidadeMundo = 3;
let abelha, florInimigo, apicultor, homem, sol;
let imgBel, imgFlor, imgApi, imgHomem, imgSol, imgPlat;
let plataformas = [];
let larguraPlat = 1536;
let alturaPlat = 198;
let florAltura = 100; 
let florLargura = 80;
let cameraX = 0;
let npcs = [];

// variáveis para debug
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


  npcs = [florInimigo, apicultor, homem, new Flor(2000, topoPlat - alturaFlor, alturaFlor, 100, imgFlor, 2)];
 
  let x = -800;
  let y = topoPlat;
  while (x < windowWidth * 10) {
  plataformas.push(new Plataforma(x, topoPlat, 1, imgPlat.height, larguraPlat, imgPlat));
  x += larguraPlat;
  }
  }

  
function draw() {
  background("rgba(123, 204, 255, 1)");

  
  sol.x -= velocidadeMundo * 0.2;
  sol.mostrar();

  abelha.moverVertical();
  abelhaCaiu = abelha.caiu();

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

    if (abelha.colidiu(npc)) {

  if (npc instanceof Flor) colFlor = true;
  if (npc instanceof Apicultor) colApicultor = true;
  if (npc instanceof Homem) colHomem = true;

  npcs.splice(i, 1);
}

  }


  abelha.mostrar();


  desenharMostrador(10, height - 100);

  //Debug
    fill(0);
  text(`Abelha (tela): (${abelha.x.toFixed(0)}, ${abelha.y.toFixed(0)})`, 10, 30);
  text(`Velocidade: ${velocidadeMundo}`, 10, 50);
  text(`NPCs: ${npcs.length}`, 10, 70);
  text(`Plataformas: ${plataformas.length}`, 10, 90);

}




/*
function draw() {
  background("rgba(123, 204, 255, 1)");
  push();
  translate(cameraX, 0); //usamos o translate para que tudo apos ele seja deslocado junto a nossa camera
  abelha.mostrar();
  abelha.moverHorizontal();
  abelha.moverVertical();
  abelhaCaiu = abelha.caiu();

  
  for (let plat of plataformas) {
    plat.mostrar();
   
    line(0, windowHeight - 1, width, height - 1);
  }

  for(let i = npcs.length - 1; i >= 0; i--){
    let npc = npcs[i];

    npc.mostrar();
    
    if (abelha.colidiu(npc)) {
      npcs.splice(i, 1)
    }

  }

  cameraX = -abelha.x + 120;
 // abelha.gravidadeAbelha();



  sol.mostrar();
  

  
  pop();
  desenharMostrador(10, height - 100);
  
}
*/
function desenharMostrador(x, y) {
  fill(0);            
  noStroke();
  textSize(14)
  text(`Colidiu com flor: ${colFlor}`, x, y);
  text(`Colidiu com apicultor: ${colApicultor}`, x, y + 20);
  text(`Colidiu com homem: ${colHomem}`, x, y + 40);
  text(`Caiu: ${abelhaCaiu}`, x, y + 60);
  text(`velY: ${abelha.velY}`, x, y + 80);
}





/* IMPORTANTE
Se:
topoPlat = windowHeight - alturaPlat   // topo da imagem da plataforma

e se a borda decorativa tem bordaDecorativa px contados do topo para baixo,
então:

pisoReal = topoPlat + bordaDecorativa
posY_personagem = pisoReal - alturaPersonagem
*/