let player = {
    x: 100,
    y: 100,
    image: document.getElementById("player")
}

let game = {
    score: 0,
    lives: 7
}


//check for holding down the arrow button
let movement =() =>{
    document.addEventListener('keydown', function(logKey){
        if(logKey.keyCode == 38){
            player.y-=7;
        }
        else if(logKey.keyCode == 40){
            player.y+=7;
        }
        else if(logKey.keyCode == 39){
            player.x+=7;
        }
        else if(logKey.keyCode == 37){
            player.x-=7;
        }
    });
}

let randomWidth = (maxWidth, items, current) =>{
    var randVal = Math.floor(Math.random() * Math.floor(maxWidth))
    for(var i = 0; i < items.length; i++){
        if(current == i){
            continue;
        }
        if(Math.abs(randVal-items[i].x) <= 25){
            i = 0;
            randVal = Math.floor(Math.random() * Math.floor(maxWidth));
        }
    }
    return randVal;
}

let randomHeight = () => {
    var randVal = Math.floor(Math.random() * Math.floor(-50))
    return randVal;
}

let items = [{
    good: false,
    x: 0,
    y: randomHeight(),
    image: document.getElementById("harm")
}, {
    good: false,
    x: 0,
    y: randomHeight(),
    image: document.getElementById("harm")
},{
    good: false,
    x: 0,
    y: randomHeight(),
    image: document.getElementById("harm")
},{
    good: false,
    x: 0,
    y: randomHeight(),
    image: document.getElementById("harm")
},{
    good: false,
    x: 0,
    y: randomHeight(),
    image: document.getElementById("harm")
}, {
    good: true,
    x: 0,
    y: randomHeight(),
    image: document.getElementById("good")
},{
    good: true,
    x: 0,
    y: randomHeight(),
    image: document.getElementById("good")
}]

let collision = (items, current) =>{
    if(player.x < items[current].x + 25 && 25 + player.x > items[current].x
        && player.y < items[current].y + 15 && 15 + player.y > items[current].y){
        if(items[current].good){
            items.splice(current, 1);
            items.push({
                good: true,
                x: 0,
                y: randomHeight(),
                image: document.getElementById("good")
            })
            console.log('good');
            game.score += 100;
        }
        else{
            items.splice(current, 1);
            items.push({
                good: false,
                x: 0,
                y: randomHeight(),
                image: document.getElementById("harm")
            })
            console.log(game.lives);
            game.lives -= 1;

        }
    }
}


window.onload = function() {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.drawImage(player.image, c.width/2, c.height-20, 25, 15);
    player.x = c.width/2;
    player.y = c.height-20;


    //call this once
    movement();

    //use requestAnimation window.requestanimationframe("Function to run")
    var game = () => {
        ctx.clearRect(0, 0, c.width, c.height);

        //sets game boundaries for player
        if(player.x > c.width-25){
            player.x = c.width-25;
        }
        else if(player.x < 0){
            player.x = 0
        }
        if(player.y < 0){
            player.y = 0;
        }
        else if(player.y > c.height-15){
            player.y = c.height-15;
        }

        //draws updated items
        for(var i = 0; i < items.length; i++){
            //sets boundaries of items
            if(items[i].y >= (c.height-15)){
                items[i].y = randomHeight();
            }
            
            if(items[i].y < -15){
                // items[i].x = Math.floor(Math.random() * Math.floor(c.width-25))
                items[i].x = randomWidth(c.width-25, items, i);
            }
            //moves the items
            items[i].y += 1

            collision(items, i)

            ctx.drawImage(items[i].image, items[i].x, items[i].y, 25, 15);
        }

        ctx.drawImage(player.image, player.x, player.y, 25, 15);

        if(game.lives <= 0 ){
            this.console.log("Game Over")
        }
        else{
        window.requestAnimationFrame(game);
        }
    }

    window.requestAnimationFrame(game);

}
