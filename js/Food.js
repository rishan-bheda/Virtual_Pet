class Food{

    constructor(){

        this.image = loadImage("Images/Milk.png");

    }

    getFoodStock(){

        var foodStockRef = database.ref('foodStock');

        foodStockRef.on("value",function(data){

            foodStock = data.val();

        })

    }

    updateFoodStock(count){

        database.ref('/').update({

            foodStock: count

        });
    }

    display(){

        var x = 80, y = 100;

        imageMode(CENTER);
        image(this.image, 720, 220, 70, 70);

        if(stock != 0){

            for(var i = 0; i < stock; i++){

                if(i % 10 == 0){

                    x = 80;
                    y = y + 50;

                }

                image(this.image, x, y, 50, 50);
                x = x + 30;

            }

        }

    }

}