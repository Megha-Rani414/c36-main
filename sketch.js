var dog,dogImage,dogHappyImage;
var dataBase;
var fedTime,lastFed;
var feed,addFood;
var foodObj,position,dogRef;

function preload(){

  dogImage = loadImage("dogImg.png");
  dogHappyImage = loadImage("dogImg1.png");

}

function setup(){

  dataBase = firebase.database();

  createCanvas(1000,500);

  foodObj = new Food();
  
  dog = createSprite(650,250,20,20);
  dog.addImage(dogImage);
  dog.scale = 0.2;

   dogRef = dataBase.ref('Food');
  dogRef.on("value",readStock);

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
}

function draw(){  

  background("lavender");
  drawSprites();

  foodObj.display();

  fedTime = dataBase.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

}

function readStock(data){
  position = data.val();
  foodObj.updateFood(position);
  
}

function feedDog(){

  dog.addImage(dogHappyImage);

  foodObj.updateFood(foodObj.getFood()-1);
  dataBase.ref('/').update({
    Food:foodObj.getFood(),
    FeedTime:hour()
    
  })

}

function addFoods(){
  position++;
  //you need to update the food that position holds
  dataBase.ref('/').update({
    Food:position
  })
}

