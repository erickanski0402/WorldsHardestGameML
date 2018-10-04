var keyState = {};
window.addEventListener('keydown',function(e){
    keyState[e.keyCode || e.which] = true;
},true);
window.addEventListener('keyup',function(e){
    keyState[e.keyCode || e.which] = false;
},true);

var iteration;
let dots = [];
let player;
let enemyRadius = 20;
var img;

function setup(){
    createCanvas(1100, 500);

    dots.push(new Enemy([[325,225],[775, 225]], 325, 225, 0, [775,225]));
    dots.push(new Enemy([[775,275],[325, 275]], 775, 275, 0, [325,275]));
    dots.push(new Enemy([[325,325],[775, 325]], 325, 325, 0, [775,325]));
    dots.push(new Enemy([[775,375],[325, 375]], 775, 375, 0, [325,375]));

    player = new Player(130, 0, 0, 200, 0, 0, true);

    iteration = 0;
}

function draw(){
    background(100, 140, 200);
    drawStartGoalAreas();
    drawDangerAreas();
    drawMapFrame();
    drawEnemies();
    //counts the number of times draw is updated
    iteration++;

    for(let i = 0; i < 4; i++){
        dots[i].enemyMovement();
    }

    player.alive = checkForEnemyCollisions();
    if(checkForWinCondition()){
        // image(img, 325, 10, img.width*2, img.height*2);
        img = document.createElement('img');
        img.src = 'http://pm1.narvii.com/6363/d22dd64c9b16e4fd3d9fc16a188ea2cafc7433b1_00.jpg';
        // document.body.appendChild(img)
        ctx = canvas.getContext('2d');
        ctx.drawImage(img, 300, 20);
    }

    //drawing the player
    if(player.alive){
        player.prevX = player.posX;
        player.prevY = player.posY;

        if(keyState[38]){
            //up arrow
            player.posYC = -2;
        }
        if(keyState[40]){
            //down arrow
            player.posYC = 2;
        }
        if(keyState[37]){
            //left arrow
            player.posXC = -2;
        }
        if(keyState[39]){
            //right arrow
            player.posXC = 2;
        }

        if(checkForWallCollisions(player.posX + player.posXC, player.posY)){
            player.movePlayerX();
        }
        if(checkForWallCollisions(player.posX, player.posY + player.posYC)){
            player.movePlayerY();
        }
    }else{
        player.posX = 130;
        player.posY = 200;
    }

    rectMode("center");
    drawPlayer();
}

function drawStartGoalAreas(){
    noStroke(); //removes lines from shapes
    fill(100, 200, 140);    //pastel green?
    rect(50, 150, 200, 300);    //starting area
    rect(850, 150, 200, 300);   //goal area
}

function drawDangerAreas(){
    fill(200, 200, 200);    //pastel gray?
    rect(250, 400, 100, 50);    //leaving the starting area
    rect(750, 150, 100, 50);    //Leading to the goal area
    rect(300, 200, 500, 200);   //Danger area
}

function drawMapFrame(){
    //  Frame for the map
    stroke(50);
    strokeWeight(4);
    line(50, 150, 50, 450);
    line(50, 450, 350, 450);
    line(350, 450, 350, 400);
    line(350, 400, 800, 400);
    line(800, 400, 800, 200);
    line(800, 200, 850, 200);
    line(850, 200, 850, 450);
    line(850, 450, 1050, 450);
    line(1050, 450, 1050, 150);
    line(1050, 150, 750, 150);
    line(750, 150, 750, 200);
    line(750, 200, 300, 200);
    line(300, 200, 300, 400);
    line(300, 400, 250, 400);
    line(250, 400, 250, 150);
    line(250, 150, 50, 150);
}

function drawEnemies(){
    fill(0, 0, 255);
    strokeWeight(2);

    for(let i = 0; i < 4; i++){
        ellipse(dots[i].posX, dots[i].posY, enemyRadius, enemyRadius);
    }
}

function drawPlayer(){
    rectMode(CENTER);
    strokeWeight(5);
    fill(255, 0, 0);
    rect(player.posX, player.posY, 30, 30);
    rectMode(CORNER);
}

function checkForEnemyCollisions(){
    for(let i = 0; i < 4; i++){
        DeltaX = dots[i].posX - Math.max(player.posX, Math.min(dots[i].posX, player.posX - 30));
        DeltaY = dots[i].posY - Math.max(player.posY, Math.min(dots[i].posY, player.posY - 30));
        if((DeltaX * DeltaX + DeltaY * DeltaY) < 600){
            console.log("Player X pos: " + player.posX + " Player Y position: " + player.posY + " Enemy X pos:" + dots[i].posX + " Enemy Y pos: " + dots[i].posY)
            return false;
        }
    }
    return true;
}

function checkForWinCondition(){
    if(player.posX > 850){
        return true;
    }

    return false;
}

function checkForWallCollisions(tempX, tempY){
    //console.log("X: " + tempX + "   Y: " + tempY);
    if(tempX < 65 || tempX > 1035){
        //player.posX = player.prevX;
        return false;
    }

    if(tempY < 165 || tempY > 435){
        //player.posY = player.prevY;
        return false;
    }

    if((tempX > 235 && tempX < 315) && (tempY > 135 && tempY < 415)){
        //player.posX = player.prevX;
        //player.posY = player.prevY;
        return false;
    }

    if((tempX > 235 && tempX < 765) && (tempY > 135 && tempY < 215)){
        //player.posX = player.prevX;
        //player.posY = player.prevY;
        return false;
    }

    if((tempX > 335 && tempX < 865) && (tempY > 385 && tempY < 465)){
        //player.posX = player.prevX;
        //player.posY = player.prevY;
        return false;
    }

    if((tempX > 785 && tempX < 865) && (tempY > 185 && tempY < 465)){
        //player.posX = player.prevX;
        //player.posY = player.prevY;
        return false;
    }

    return true;
}
