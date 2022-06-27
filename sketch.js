/**
 * tipos de variï¿½veis:
 * var string = 'texto';
 * var numeric = numeros (inteiros, decimais) 10 ou 10.5
 * var bool = true ou false (verdadeiro ou falso)
 * var array = [false, true, false]; ["Caio", "Andressa"]; [10, 5, 8]; (vetor ou matriz)
 */


var trex, trex_running;
var ground, groundImg, invisibleGround;
var cloud, cloudImg;
var cacto1, cacto2, cacto3, cacto4, cacto5, cacto6;
var cactoGroup, cloudGroup;
var score = 0;
const PLAY = 1;
const END = 0;
var gameState = PLAY;

function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImg = loadImage("ground2.png");
  cloudImg = loadImage("cloud.png");

  cacto1 = loadImage("obstacle1.png");
  cacto2 = loadImage("obstacle2.png");
  cacto3 = loadImage("obstacle3.png");
  cacto4 = loadImage("obstacle4.png");
  cacto5 = loadImage("obstacle5.png");
  cacto6 = loadImage("obstacle6.png");
}

function setup(){
  createCanvas(600,200);

  //crie um sprite de trex
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;

  ground = createSprite(200, 180, 400, 10);
  ground.addImage("ground", groundImg);
  ground.x = ground.width/2;

  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

  cactoGroup = new Group();
  cloudGroup = new Group();
}

function draw(){
  background("black");
  text("score: "+ score, 500, 50);
  score += Math.round(frameCount / 60);

  if (gameState === PLAY){
    // jogando
    // adicionar condicao corrigir pulo duplicado
    if (keyDown("space") && trex.y >= 150) {
      trex.velocityY = -10;
    }

    if (ground.x < 0) {
      ground.x = ground.width/2;
    }

    // faz o chao andar
    ground.velocityX = -4; 

    // efeito da gravidade
    trex.velocityY = trex.velocityY +0.5;

    trex.collide(invisibleGround);
    createClouds();
    createCactos();

    if (cactoGroup.isTouching(trex)) {
      gameState = END;
    }

  } else if (gameState === END) {
    // game over
    ground.velocityX = 0;
    cloudGroup.setVelocityXEach(0);
    cactoGroup.setVelocityXEach(0);
  }

  drawSprites();
}

function createClouds()
{
  if (frameCount % 60 == 0) { // ele cria o espaço entre uma nuvem e outra
    var randNumber = Math.round(random(10, 60));
    cloud = createSprite(600, 100, 40, 10);
    cloud.addImage(cloudImg);
    cloud.velocityX = -3;
    cloud.y = randNumber;
    cloud.scale = 0.4; 
    cloud.lifetime = 200;
    cloudGroup.add(cloud);
  }
}

function createCactos()
{
  if (frameCount % 60 == 0) {
    var cacto = createSprite(600, 165, 10, 40);
    cacto.velocityX = -6;
    var randNumber = Math.round(random(1, 6));

    switch (randNumber) {
      case 1: cacto.addImage(cacto1);
        break;
      case 2: cacto.addImage(cacto2);
        break;
      case 3: cacto.addImage(cacto3);
        break;
      case 4: cacto.addImage(cacto4);
        break; 
      case 5: cacto.addImage(cacto5);
        break;
      case 6: cacto.addImage(cacto6);
        break;
    }

    cacto.scale = 0.5;
    cacto.lifetime = 150;
    cactoGroup.add(cacto);
  }
}