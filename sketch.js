//Create variables here
var database, canvas;
var dog;
var foodObj;
var dogimg,happyDog,foodS,foodStock;
var sadDog,fedTime,lastFed,feed,addFood;

function preload()
{
	//load images here
  sadDog= loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
  

}

function setup() {
 canvas = createCanvas(1000,400);
database = firebase.database();

foodObj = new Food();


  dog = createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  foodStock = database.ref("Food");
  foodStock.on("value",readStock);

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog)

  addFood = createButton("add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods)
}


function draw() {  
background(46,139,87);
foodObj.display();

fedTime = database.ref("FeedTime");
fedTime.on("value",function(data){
lastFed = data.val();
})
fill(255,255,254);
textSize(15);
if(lastFed == 0){
  text("Last Feed: 12AM ", 350,30);
  }
  else if(lastFed >= 12){
text("Last Feed: " + lastFed%12 + "PM",350,30)
  }
  else{
    text("Last Feed: " + lastFed + "AM",350,30);

  }

/*if (keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDogimg);
}
*/

  drawSprites();
  /*(255,255,254);
  stroke("black")
  textSize(25);
  text("Food available: " + foodS,120,160);
  textSize(20);
  text("NOTE: Press UP Arrow Key to feed Harry!")
*/
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()- 1);
  database.ref("/").update({
      Food: foodObj.getFoodStock(),
      FeedTime:hour()
  })
}
/*function writeStock (x){
  if(x<=0){
    x = 0;

  }
  else{x = x- 1}
  database.ref('/').update({
    Food:x
  })*/

//}
function addFoods(){
  foodS++;
  database.ref("/").update({
    Food: foodS
  })
}
