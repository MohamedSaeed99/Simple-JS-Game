let player = {
    x: 100,
    y: 100,
    image: document.getElementById("player")
}

let harm = {
    x: 0,
    y: 0,
    image: document.getElementById("harm")
}

let good = {
    x: 0,
    y: 0,
    image: document.getElementById("good")
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

let randomHeight = (maxWidth, collision) =>{
    var randVal = Math.floor(Math.random() * Math.floor(maxWidth))
    console.log(randVal - collision);
    return randVal;
}

window.onload = function() {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.drawImage(player.image, c.width/2, c.height-20, 50, 20);
    player.x = c.width/2;
    player.y = c.height-20;

    //call this once
    movement();

    //use requestAnimation window.requestanimationframe("Function to run")
    var game = () => {
        ctx.clearRect(0, 0, c.width, c.height);

        if(good.y == 0){

        }

        good.y+=1;
        harm.y+=1;

        ctx.drawImage(harm.image, harm.x, harm.y, 50, 20);
        ctx.drawImage(good.image, good.x, good.y, 50, 20);

        if(good.y >= (c.height-20)){
            good.y = 0;
        }
        if(harm.y >= (c.height-20)){
            harm.y = 0;
        }
        ctx.drawImage(player.image, player.x, player.y, 50, 20);

        window.requestAnimationFrame(game);
    }

    window.requestAnimationFrame(game);

}
