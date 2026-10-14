function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  // prato
  background(200, 225, 200);

  let numeroGlifi = 30; //numero di pecore
  let numeroColonne = ceil(sqrt(numeroGlifi));
  let numeroRighe = ceil(numeroGlifi / numeroColonne);

  let dimColonna = windowWidth / numeroColonne;
  let dimRiga = windowHeight / numeroRighe;

  let xCorrente = 0;
  let yCorrente = 0;

  // griglia
  for (let g = 0; g < numeroGlifi; g++) {
    mioGlifo(xCorrente + dimColonna / 2, yCorrente + dimRiga / 2, min(dimColonna, dimRiga) * 0.85);

    xCorrente = xCorrente + dimColonna;

    if (xCorrente >= windowWidth) {
      xCorrente = 0;
      yCorrente = yCorrente + dimRiga;
    }
  }
}

function draw() {

}

// PECORA
function mioGlifo(_x, _y, _size) {
  push();
  translate(_x, _y); // al centro della cella

  stroke(35);
  strokeWeight(2.5);

  // colori
  let tipoColore = round(random(1, 3));
  let coloreLana;
  let coloreMuso;

  if (tipoColore == 1) {
    // pelo bianco, muso nero
    coloreLana = color(250, 250, 245);
    coloreMuso = color(70, 70, 75);
  } else if (tipoColore == 2) {
    // pelo scuro, muso rosa
    coloreLana = color(50, 50, 50);
    coloreMuso = color(250, 210, 210);
  } else {
    // pelo beige, muso marrone 
    coloreLana = color(200, 190, 180);
    coloreMuso = color(90, 70, 60);
  }

  // altre funzioni
  disegnaLana(_size, coloreLana);
  disegnaOrecchie(_size, coloreMuso);
  disegnaMusetto(_size, coloreMuso, coloreLana);
  disegnaOcchi(_size, coloreMuso);

  pop();
}

// corpo
function disegnaLana(_size, coloreLana) {
  fill(coloreLana);

  // cerchio centrale base
  circle(0, 0, _size * 0.65);

  // boccoli di lana radiali
  let numeroBoccoli = round(random(7, 13)); //variabile da 7 a 13 cerchi
  let raggioBoccolo = _size * random(0.24, 0.32);

  for (let i = 0; i < numeroBoccoli; i++) {
    push();
    let rotazione = (360 / numeroBoccoli) * i;
    rotate(rotazione);
    translate(_size * 0.30, 0);
    circle(0, 0, raggioBoccolo);
    pop();
    
  }
  
}

// orecchie
function disegnaOrecchie(_size, coloreMuso) {
  fill(coloreMuso);

  // rotazione casuale
  let angoloOrecchie = random(-25, 35);

  // orecchio sx
  push();
  translate(-_size * 0.22, -_size * 0.05);
  rotate(-30 + angoloOrecchie);
  ellipse(0, 0, _size * 0.30, _size * 0.13);
  pop();

  // orecchio dx
  push();
  translate(_size * 0.22, -_size * 0.05);
  rotate(30 - angoloOrecchie);
  ellipse(0, 0, _size * 0.30, _size * 0.13);
  pop();
}

// muso e ciuffo
function disegnaMusetto(_size, coloreMuso, coloreLana) {
  // forma del muso
  fill(coloreMuso);
  ellipse(0, _size * 0.05, _size * 0.42, _size * 0.46);

  // ciuffetto di lana in testa tra le orecchie
  fill(coloreLana);
  let dimCiuffo = _size * random(0.12, 0.16);
  circle(-_size * 0.07, -_size * 0.15, dimCiuffo);
  circle(_size * 0.07, -_size * 0.15, dimCiuffo);
  circle(0, -_size * 0.19, dimCiuffo * 1.15);

  // naso e bocca
  line(0, _size * 0.13, 0, _size * 0.19);
  line(0, _size * 0.19, -_size * 0.04, _size * 0.22);
  line(0, _size * 0.19, _size * 0.04, _size * 0.22);
}

// occhi
function disegnaOcchi(_size, coloreMuso) {

  noStroke();
  
  let tipoEspressione = round(random(1, 3));
  let distOcchi = _size * 0.10;
  let altezzaOcchi = 0;

  if (tipoEspressione == 1) {
    // occhi spalancati
    fill(255);
    circle(-distOcchi, altezzaOcchi, _size * 0.12);
    circle(distOcchi, altezzaOcchi, _size * 0.12);

    fill(20);
    circle(-distOcchi, altezzaOcchi, _size * 0.06);
    circle(distOcchi, altezzaOcchi, _size * 0.06);

  } else if (tipoEspressione == 2) {
    // occhi laterali
    fill(255);
    circle(-distOcchi, altezzaOcchi, _size * 0.12);
    circle(distOcchi, altezzaOcchi, _size * 0.12);

    fill(20);
    let spostaPupilla = _size * random(-0.03, 0.03);
    circle(-distOcchi + spostaPupilla, altezzaOcchi, _size * 0.06);
    circle(distOcchi + spostaPupilla, altezzaOcchi, _size * 0.06);

  } else {
    // occhi addormentati
    noFill();
    // se il muso è rosa uso nero, se il muso è scuro uso bianco
    if (red(coloreMuso) > 150) {
      stroke(35);
    } else {
      stroke(255);
    }
    strokeWeight(3);
    arc(-distOcchi, altezzaOcchi, _size * 0.10, _size * 0.08, 0, 180);
    arc(distOcchi, altezzaOcchi, _size * 0.10, _size * 0.08, 0, 180);

  }
}