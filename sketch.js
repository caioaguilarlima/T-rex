/**
 * tipos de variï¿½veis:
 * var string = 'texto';
 * var numeric = numeros (inteiros, decimais) 10 ou 10.5
 * var bool = true ou false (verdadeiro ou falso)
 * var array = [false, true, false]; ["Caio", "Andressa"]; [10, 5, 8]; (vetor ou matriz)
 */


var trex, trex_running, trex_collided;
var ground, groundImg, invisibleGround;
var cloud, cloudImg;
var cacto1, cacto2, cacto3, cacto4, cacto5, cacto6;
var cactoGroup, cloudGroup;
var restart, restartImg, gameOver, gameOverImg;
var score = 0;
const PLAY = 1;
const END = 0;
var gameState = PLAY;
var dieSound, jumpSound, checkSound;

function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  groundImg = loadImage("ground2.png");
  cloudImg = loadImage("cloud.png");

  cacto1 = loadImage("obstacle1.png");
  cacto2 = loadImage("obstacle2.png");
  cacto3 = loadImage("obstacle3.png");
  cacto4 = loadImage("obstacle4.png");
  cacto5 = loadImage("obstacle5.png");
  cacto6 = loadImage("obstacle6.png");

  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");

  dieSound = loadSound("collided.wav");
  jumpSound = loadSound("jump.mp3");
  checkSound = loadSound("checkpoint.wav");
}

function setup(){
  createCanvas(windowWidth,windowHeight);

  //crie um sprite de trex
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;

  ground = createSprite(200, 180, 400, 10);
  ground.addImage("ground", groundImg);
  ground.x = ground.width/2;

  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

  cactoGroup = new Group();
  cloudGroup = new Group();

  restart = createSprite(width/2, 150);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  gameOver = createSprite(width/2, 100);
  gameOver.addImage(gameOverImg);
  
}

function draw(){
  background("black");
  text("score: "+ score, width - 100, 50);


  if (gameState === PLAY){
    // jogando
    trex.changeAnimation("running");
    restart.visible = false;
    gameOver.visible = false;
    score += Math.round(frameRate() / 60);

    // adicionar condicao corrigir pulo duplicado
    if (keyDown("space") && trex.y >= 150 || touches.length > 0) {
      trex.velocityY = -10;
      jumpSound.play();
      touches = [];
    }

    if (score > 0 && score % 100 === 0) {
      checkSound.play();
    }

    if (ground.x < 0) {
      ground.x = ground.width/2;
    }

    // faz o chao andar
    ground.velocityX = -4; 

    // efeito da gravidade
    trex.velocityY = trex.velocityY +0.5;

    createClouds();
    createCactos();

    if (cactoGroup.isTouching(trex)) {
      gameState = END;
      dieSound.play();
    }

  } else if (gameState === END) {
    // game over
    ground.velocityX = 0;
    trex.changeAnimation("collided");
    cloudGroup.setVelocityXEach(0);
    cactoGroup.setVelocityXEach(0);

    cloudGroup.setLifetimeEach(-1);
    cactoGroup.setLifetimeEach(-1);

    restart.visible = true;
    gameOver.visible = true;
    if (mousePressedOver(restart)) {
      reset();
    }
  }
    

  trex.collide(invisibleGround);
  drawSprites();
}

function reset()
{
  gameState = PLAY;
  cloudGroup.destroyEach();
  cactoGroup.destroyEach();
  score = 0;
}

function createClouds()
{
  if (frameCount % 60 == 0) { // ele cria o espaço entre uma nuvem e outra
    var randNumber = Math.round(random(10, 60));
    cloud = createSprite(width, 100, 40, 10);
    cloud.addImage(cloudImg);
    cloud.velocityX = -3;
    cloud.y = randNumber;
    cloud.scale = 0.4; 
    cloud.lifetime = width/3;
    cloudGroup.add(cloud);
  }
}

function createCactos()
{
  if (frameCount % 60 == 0) {
    var cacto = createSprite(width, 165, 10, 40);
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
    cacto.lifetime = width/3;
    cactoGroup.add(cacto);
  }
}