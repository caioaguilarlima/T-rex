/**
 * tipos de vari�veis:
 * var string = 'texto';
 * var numeric = numeros (inteiros, decimais) 10 ou 10.5
 * var bool = true ou false (verdadeiro ou falso)
 * var array = [false, true, false]; ["Caio", "Andressa"]; [10, 5, 8]; (vetor ou matriz)
 */


var trex, trex_running;
var ground, groundImg;
var edges;

function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImg = loadImage("ground2.png");
}

function setup(){
  createCanvas(600,200);
  edges = createEdgeSprites();

  //crie um sprite de trex
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;

  ground = createSprite(200, 180, 400, 10);
  ground.addImage("ground", groundImg);
  ground.x = ground.width/2;
}

function draw(){
  background("black");

  if (keyDown("space")) {
    trex.velocityY = -10;
  }
  if (ground.x < 0) {
    ground.x = ground.width/2;
  }
  ground.velocityX = -4; 
  trex.velocityY = trex.velocityY +0.5;
  trex.collide(edges[3]);
  
  
  
  
  drawSprites();
}