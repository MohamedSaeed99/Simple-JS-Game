let player = {
    x: 100,
    y: 100,
    image: document.getElementById("player")
};

let gameStat = {
    score: 0,
    lives: [document.getElementById("heart"), document.getElementById("heart"), document.getElementById("heart")]
};

let level = 0;

let left = () => {
    player.x -=20;
}
let mobileMovement = () => {
    $(".left").on('mousedown', function(){
        player.x -=20;
    });
    $(".up").on('click', function(){
        player.y -=20;
    });
    $(".right").on('click', function(){
        player.x +=20;
    });
    $(".down").on('click', function(){
        player.y +=20;
    });
}
//check for holding down the arrow button
let movement =() =>{
    document.addEventListener('keydown', function(logKey){
        if(logKey.keyCode == 38){
            player.y-=20;
        }
        else if(logKey.keyCode == 40){
            player.y+=20;
        }
        else if(logKey.keyCode == 39){
            player.x+=20;
        }
        else if(logKey.keyCode == 37){
            player.x-=20;
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
    var randVal = Math.floor(Math.random() * Math.floor(-100) + -70)
    return randVal;
}
let randomSpeed = (val) => {
    var randVal = Math.floor(Math.random() * Math.floor(val)+2)
    return randVal;
}


let items = [{
    good: false,
    x: 0,
    y: randomHeight(),
    speed: randomSpeed(level),
    image: document.getElementById("harm")
}, {
    good: false,
    x: 0,
    y: randomHeight(),
    speed: randomSpeed(level),
    image: document.getElementById("harm")
},{
    good: false,
    x: 0,
    y: randomHeight(),
    speed: randomSpeed(level),
    image: document.getElementById("harm")
},{
    good: false,
    x: 0,
    y: randomHeight(),
    speed: randomSpeed(level),
    image: document.getElementById("harm")
},{
    good: false,
    x: 0,
    y: randomHeight(),
    speed: randomSpeed(level),
    image: document.getElementById("harm")
},{
    good: false,
    x: 0,
    y: randomHeight(),
    speed: randomSpeed(level),
    image: document.getElementById("harm")
},{
    good: false,
    x: 0,
    y: randomHeight(),
    speed: randomSpeed(level),
    image: document.getElementById("harm")
},{
    good: true,
    x: 0,
    y: randomHeight(),
    speed: randomSpeed(level),
    image: document.getElementById("good")
},{
    good: true,
    x: 0,
    y: randomHeight(),
    speed: randomSpeed(level),
    image: document.getElementById("good")
},{
    good: true,
    x: 0,
    y: randomHeight(),
    speed: randomSpeed(level),
    image: document.getElementById("good")
}]


let levelComplete = (items)=>{
    for(var i = 0; i < items.length; i++){
        if(items[i].good){
            return false;
        }
    }
    return true;
}

let collision = (items, current) =>{
    if(player.x < items[current].x + 40 && 15 + player.x > items[current].x
        && player.y < items[current].y + 40 && 15 + player.y > items[current].y){
        if(items[current].good){
            items.splice(current, 1);
            gameStat.score += 100;
        }
        else{
            items.splice(current, 1);
            items.push({
                good: false,
                x: 0,
                y: randomHeight(),
                speed: randomSpeed(level),
                image: document.getElementById("harm")
            })
            gameStat.lives.pop();
        }
        return true;
    }
    return false;
}

window.onload = function() {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    ctx.font = "30px Arial";

    player.x = c.width/2;
    player.y = c.height-50;

    //call this once
    movement();
    mobileMovement();

    //use requestAnimation window.requestanimationframe("Function to run")
    var game = () => {
        ctx.clearRect(0, 0, c.width, c.height);

        //fillBackground(ctx);

        ctx.fillText('Score: ' + gameStat.score, c.width-200, 30);
        ctx.fillText('Level: ' + level, c.width-200, 60);

        //sets game boundaries for player
        if(player.x > c.width-50){
            player.x = c.width-50;
        }
        else if(player.x < 0){
            player.x = 0
        }
        if(player.y < 0){
            player.y = 0;
        }
        else if(player.y > c.height-50){
            player.y = c.height-50;
        }
        var j = 1
        for(var i = 0; i < gameStat.lives.length; i++){
            ctx.drawImage(gameStat.lives[i], j*30, 5, 30, 30);
            j++;
        }

        //draws updated items
        for(var i = 0; i < items.length; i++){

            //sets boundaries of items
            if(items[i].y >= (c.height-15)){
                items[i].y = randomHeight();
            }
            
            if(items[i].y < -70){
                items[i].x = randomWidth(c.width-100, items, i);
                items[i].speed = randomSpeed(level)
            }
            //moves the items
            items[i].y += items[i].speed

            if(!collision(items, i)){
                if(items[i].good){
                    ctx.drawImage(items[i].image, items[i].x, items[i].y, 100, 100);
                }
                else
                    ctx.drawImage(items[i].image, items[i].x, items[i].y, 40, 40);
            }
        }

        //Checks if level is complete and moves to next level with increased speed
        if(levelComplete(items)){
            level++; 
            for(var w = 0; w < 3; w++){  
                items.push({
                    good: true,
                    x: 0,
                    y: randomHeight(),
                    speed: randomSpeed(level),
                    image: document.getElementById("good")
                })
            }
            livesMissing = Math.abs(gameStat.lives.length-3)
            for(var i = 0; i< livesMissing; i++){
                gameStat.lives.push(document.getElementById("heart"))
            }
        }

        ctx.drawImage(player.image, player.x, player.y, 50, 50);

        //checks end game
        if(gameStat.lives.length == 0){
            ctx.textBaseline = "top"
            ctx.font = "70px Arial";
            ctx.fillText('GAME OVER', c.width/2-200, c.height/2-20);
        }
        else{
            window.requestAnimationFrame(game);
        }
    }
    var animation = requestAnimationFrame(game);
}
