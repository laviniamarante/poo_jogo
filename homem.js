class Homem extends Base {
  constructor(x, y, tamanho, altura, largura, vel, img) {
    super(x, y, altura, largura, img);
    this.tamanho = tamanho;
    this.vel = vel;
    this.img.resize(0, this.img.height * 0.6);
  }
mostrar() {
  const margemX = 45; // diminui dos lados
  const margemY = 35; // diminui em cima e embaixo

  image(this.img, this.x - 15, this.y + 25);

  noFill();
  stroke("red");
  rect(
    this.x - 15 + margemX / 2,
    this.y + 25 + margemY / 2,
    this.img.width - margemX,
    this.img.height - margemY
  );
}
}











/*class Homem {
    constructor(x, y, tamanho, altura, largura, vel, img){
        this.x = x;
        this.y = y;
        this.tamanho = tamanho;
        this.altura = altura;
        this.largura = largura;
        this.vel = vel;
        this.img = img;

        this.img.resize(0, this.img.height * 0.6);
    }

    mostrar(){
    image(this.img, this.x - 15, this.y + 25);
    noFill();
    stroke("red");
    rect(this.x, this.y, this.largura, this.altura);
    }

    
}
    */