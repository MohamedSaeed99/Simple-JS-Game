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

let movement =() =>{
    var pressed = false
    document.addEventListener('keydown', function(logKey){
        if(!pressed){
            if(logKey.keyCode == 38){
                player.y--;
            }
            else if(logKey.keyCode == 40){
                player.y++;
            }
            else if(logKey.keyCode == 39){
                player.x++;
            }
            else if(logKey.keyCode == 37){
                player.x--;
            }
            console.log(logKey.keyCode)
            pressed = true;
        }
    });
    document.addEventListener('keyup', function(){
        pressed = false;
    });
}
window.onload = function() {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    // ctx.drawImage(harm.image, 10, 10, 50, 20);
    // ctx.drawImage(good.image, 10, 30, 50, 20);
    ctx.drawImage(player.image, c.width/2, c.height, 50, 20);
    player.x = c.width/2;
    player.y = c.height;

    window.setInterval(() => {
        // ctx.clearRect(harm.x, 10, 50, 20);
        // ctx.clearRect(good.x, 30, 50, 20);
        ctx.clearRect(player.x, player.y, 50, 20);

        movement();

        // good.x++;
        // harm.x++;
        // ctx.drawImage(harm.image, harm.x, 10, 50, 20);
        // ctx.drawImage(good.image, good.x, 30, 50, 20);
        ctx.drawImage(player.image, player.x, player.y, 50, 20);

    }, 10000 / 60);

}
