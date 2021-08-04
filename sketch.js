var dog,sadDog,happyDog, database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;
var hungrydog,foodStockref,currentTime,milk,input,name;
var gameState="hungry"
var gameStateref
var bedroomImg,GardenImg,washroomImg,sleepImg,runImg;
var feed,addFood,input,button;
function preload(){
sadDog=loadImage("images/dogImg1.png");
happyDog=loadImage("images/dogImg2.png");
bedroomImg=loadImage("images/bedroomImg.png")
GardenImg=loadImage("images/Garden.png")
washroomImg=loadImage("images/washroomImg.png")
sleepImgrunImg=loadImage("images/Lazy.png")
runImg=loadImage("images/running.png")
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

   input=createInput("Pet name")
   input.position(950,120)

   button=createButton("Confirm")
   buttom.position(100,145)
   button.mousePressed(createName);
  }

function draw() {
currentTime=hour();
if(currentTime===lastFed+1){
gameState="playing";
updateGameState()
foodObj.Garden()
}
else if(currentTime===lastFed+2){
  gameState="sleeping"
  updateGameState()
  foodObj.bedroomImg
}else if(currentTime>lastFed+2 && currentTime<=lastFed+4){
  gameState="bathing"
  updateGameState()
  foodObj.washroomImg
}else {
  gameState="hungry"
  updateGameState()
  foodObj.display()
}
//console.log(foodStock)
getGameState()

fedTime=database.ref('feedTime')
fedTime.on("value",function(data){
  lastFed=data.val();
})

if(gameState==="hungry"){
  feed.show()
  addFood.show();
  dog.addAnimation("hungry",hungryDog);
}else{
  feed.hide()
  addFood.hide()
  dog.remove();
}

drawSprites()
textSize(32)
fill("red")
textSize(20)
text("Last fed :"+lastFed+":00",300,95)
text("Time since last fed:"+(currentTime-lastFed),300,125)

}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}
function feedDog(){
  foodObj.dedectFood()
  foodObj.updateFoodStock();
  dog.changeAnimation("happy",happyDog)
  gameState="happy"
  updateGameState()
}

function addFoods(){
  foodObj.addFood()
  foodObj.updateFoodStock
}
async function hour(){
  var site =await fetch("")
  var siteJSON=await site.jons()
  var dateTime=siteJson.datetime
  var hourTime=dateTime=datetime.slice(11,13)
  return hourTime
}
function createName(){
  input.hide()
  buttpn.hide()

Name=input.value()
var greeting=createElement('h3')
greeting.html("Pet's name:"+Name)
greeting.position(width/2+850,height/2+200)

}
function getGameState(){
  database.ref('/').update({
    gameState:gameState
  })
}
function updategameState(){
  database.ref('/').update({
    gameState:gameState
  })
}