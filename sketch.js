var dog,sadDog,happyDog;
var feedPet, addFood;
var foodObj;
var foodStock;
var feedButton, addFood;
var stock = 0;
var fedTime, lastFed;
var petName;



function preload(){

    sadDog=loadImage("Images/Dog.png");
    happyDog=loadImage("Images/happy dog.png");

}

function setup() {

    database = firebase.database();

    createCanvas(1000,400);

    foodObj = new Food();
  
    dog = createSprite(800,200,150,150);
    dog.addImage(sadDog);
    dog.scale=0.15;

    feedButton = createButton("Feed the Dog");
    feedButton.position(400,125);

    addFood = createButton("Add Food");
    addFood.position(500,125);

    petName = createInput("Pet Name");
    petName.position(575,125);

    feedDog();
    addStock();
}

function draw() {

    background(46,139,87);
    
    foodObj.display();

    fedTime = database.ref('feedTime');
    fedTime.on("value",function(data){

        lastFed = data.val();

    });

    drawSprites();

    fill(255,255,254);
    textSize(15);

    if(lastFed >= 12){

        text("Last Feed : " + lastFed%12 + " PM", 200, 30);

    }

    else if(lastFed == 0){

        text("Last Feed: 12 AM", 200, 30);
        
    }

    else{

        text("Last Feed: " + lastFed + " AM", 200,30);

    }

}


function addStock(){

    addFood.mousePressed(() => {
        
        stock+=1;
        
        foodObj.updateFoodStock(stock);

    });

}

function feedDog(){

    feedButton.mousePressed(() => {

        if(foodObj.getFoodStock <= 0){

            foodObj.updateFoodStock(stock * 0);

        }

        else{
        
            stock = stock - 1;
            
            foodObj.updateFoodStock(stock);

            dog.addImage(happyDog);

        }

        database.ref('/').update({

            feedTime: hour()

        })

    });

}