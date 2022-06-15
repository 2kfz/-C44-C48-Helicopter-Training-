let character;
let characterB
let characterImg;
let brokenheliImg;
let obstacleImg;
let backgroundImg;
let obstaclesGroup, obstacle, obstacle2, ground
let gameover;
let gameoverImg;
let info;
let infoImg;
let score;

let PLAY = 0;
let END = 1;
let gameState = PLAY;





function preload() {
  characterImg = loadImage("heli.png");
  backgroundImg = loadImage("background.png");
  brokenheliImg = loadImage("brokenheli.png")
  gameoverImg = loadImage("gameover.png")
  infoImg = loadImage("instruction.png")
  restartImg = loadImage("restart-button.png")
}





function setup() {
  createCanvas(800, 800);
  character = createSprite(190, 150, 10, 10);

  character.addImage(characterImg);
  character.scale = 0.5;
  character.debug = false;
  character.setCollider("rectangle", 0, 0, 550, 150)
  obstaclesGroup = createGroup();
  gameover = createSprite(350, 400, 10, 10);
  gameover.addImage(gameoverImg)
  gameover.scale = 2;
  gameover.visible = false;

  info = createSprite(700, 150, 10, 10);
  info.addImage(infoImg)
  info.scale = 0.3;
  info.visible = true;
  character.addImage("broken", brokenheliImg);
  
  
  score = 0;
}




function draw() {
  background(81, 63, 43)
  image(backgroundImg, 0, 0, windowWidth, windowHeight)
 

  if (gameState === PLAY) {
    makeObstacles()

    if (frameCount % 60 == 0) {
      score = score + Math.round(getFrameRate() / 60);

    }
    info.velocityX = -3
    character.velocityY += 0.3;
    character.velocityY += 1;



    if (obstaclesGroup.isTouching(character)) {
      gameState = END;

    }
  }

  if (gameState === END) {
    character.changeImage("broken", brokenheliImg);
    gameover.visible = true;
    
    character.velocityY = 0;
    obstacle.velocityX = 0;
    obstacle2.velocityX = 0;
  }

  
    drawSprites();
    fill("white");
    textSize(25);
    text("Score: " + score, 500, 50);
    
    
}



function keyPressed() {
  if (keyCode === 32 && gameState == PLAY) {
    character.velocityY = -15;
  }
}

function makeObstacles() {
  if (frameCount % 140 === 0) {
    var rand = Math.round(random(1, 6));
    obstacle = createSprite(width + (rand * 60), 700, 90, 360);
    obstacle.shapeColor = "red";
    obstacle.velocityX = -5;

    obstacle2 = createSprite(width + (rand * 40), 100, 90, 360);
    obstacle2.shapeColor = "red";
    obstacle2.velocityX = -5;

    ground = createSprite(800, 800, 10000000)
    ground.shapeColor = "brown"
    obstaclesGroup.add(obstacle);
    obstaclesGroup.add(obstacle2);
    obstaclesGroup.add(ground);
  }
}


