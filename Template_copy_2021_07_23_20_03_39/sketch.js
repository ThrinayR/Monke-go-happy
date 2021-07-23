
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup
var obstaclegroup
var floor
var score = 0;
var survivaltime
var gamestate
function preload(){
  
  
monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
bananaImage = loadImage("banana.png");
obstaceImage = loadImage("obstacle.png");

}


function setup(){
createCanvas(400, 400);
monkey = createSprite(50,260,20,50);
monkey.addAnimation("running", monkey_running);
monkey.scale = 0.1
FoodGroup = new Group();
obstaclegroup = new Group();
gamestate = "play"
score = 0
survivaltime = 0
floor = createSprite(200,295,500,10);
}
  
function draw() {
background("white");
spawnObstacles();
spawnBananas();
text(mouseX+","+mouseY,mouseX,mouseY)
createEdgeSprites();
  
if(keyDown("space")&& monkey.y >= 255) {
monkey.velocityY = -11 ;
}
monkey.velocityY = monkey.velocityY + 0.8
  
  
monkey.collide(floor);   

if (gamestate == "play")
{
 
  

if(monkey.isTouching(FoodGroup))
 {
 FoodGroup.destroyEach();
 score = score+1; 
 }

  
 if(monkey.isTouching(obstaclegroup)&& gamestate == "start")
 {
 obstaclegroup.destroyEach();
 gamestate = "end";
 } 
}
  
 
if(gamestate=="end")  
  {
   obstaclegroup.destroyEach(); 
   FoodGroup.destroyEach();
   FoodGroup.velocityX = 0;
   obstaclegroup.velocityX = 0;
   score = 0;
   textSize(20);
   fill("black");
   text("game over press r to restart!",100,200);
   
   if(keyDown("r") && gamestate == "end")
    {
     gamestate="start";
      }
    
  }
  
  
  
  
  
  
  
drawSprites();  
text("Score:" + score, 50, 100 )
}

function spawnBananas() {
  if(frameCount%60==0) 
  {
 banana = createSprite(500,169,20,20);
 banana.addImage("rock",bananaImage); 
 banana.scale = 0.1;
 banana.velocityX = -10;
 FoodGroup.add(banana);
 banana.lifetime=260;
  }
}

function spawnObstacles() {
  if(frameCount%190==0) 
  {
 obstacle = createSprite(500,269,20,20);
 obstacle.addImage("banana",obstaceImage); 
 obstacle.velocityX = -4;
 obstacle.scale = 0.1;
 obstaclegroup.add(obstacle);
 obstacle.lifetime=260;
  }
}