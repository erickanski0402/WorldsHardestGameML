var keyState = {};
window.addEventListener('keydown',function(e){
    keyState[e.keyCode || e.which] = true;
},true);
window.addEventListener('keyup',function(e){
    keyState[e.keyCode || e.which] = false;
},true);

var iteration;
var img;

let dots = [];
let player;
let enemyRadius = 20;
let popSize = 500;
let rand = 0;
let vector = [];
let maxMoves = 5;
let currentMove = 0;
let generation = 0;

function setup(){
    //Creates canvas by which everything may be drawn on
    createCanvas(1100, 500);

    //Creates a new instance of enemy at these coordinates
    dots.push(new Enemy([[325,225],[775, 225]], 325, 225, 0, [775,225]));
    dots.push(new Enemy([[775,275],[325, 275]], 775, 275, 0, [325,275]));
    dots.push(new Enemy([[325,325],[775, 325]], 325, 325, 0, [775,325]));
    dots.push(new Enemy([[775,375],[325, 375]], 775, 375, 0, [325,375]));

    //Creates a new population of a specified size and initial max moves
    population = new Population(popSize, maxMoves);

    //Instantiates the iteration of draws
    iteration = 0;
}

function draw(){
    //Draws everything about the map
    background(100, 140, 200);
    drawStartGoalAreas();
    drawDangerAreas();
    drawMapFrame();
    drawEnemies();
    //counts the number of times draw is updated
    iteration++;

    //Debug information
    textSize(32);
    fill(255,0,0);
    text("Iteration number: " + iteration, 10, 50);
    text("Current Move: " + currentMove, 500, 50);
    text("Generation: " + (generation + 1), 10, 80);
    text("Max Moves: " + maxMoves, 10, 110);

    //Moves the position of the enemies per the iteration
    for(let i = 0; i < 4; i++){
        dots[i].enemyMovement();
    }

    //For every player still living, checks to see if they have collided with an enemy or whether they have hit a goal
    for(let i = 0; i < population.players.length; i++){
      if(population.players[i].alive){
        population.players[i].alive = checkForEnemyCollisions(population.players[i]);
        checkGoal(population.players[i]);
      }
    }

    // if(checkForWinCondition()){
    //     // image(img, 325, 10, img.width*2, img.height*2);
    //     img = document.createElement('img');
    //     img.src = 'http://pm1.narvii.com/6363/d22dd64c9b16e4fd3d9fc16a188ea2cafc7433b1_00.jpg';
    //     // document.body.appendChild(img)
    //     ctx = canvas.getContext('2d');
    //     ctx.drawImage(img, 300, 20);
    // }

    //If the population has exhausted its movelist then a new generation is spawned
    if(currentMove == maxMoves){
      currentMove = 0;
      generation++;

      //Every five generations the number of moves per generation is increased
      if(generation % 5 == 0){
        maxMoves += 5;
      }

      //At the end of each generation the players are reset and the move lists filled
      for(let i = 0; i < population.players.length; i++){
        population.players[i].resetPlayer();
        population.players[i].fillMoveList(maxMoves);
      }
    }

    //drawing the player
    for(let i = 0; i < population.players.length; i++){
      if(population.players[i].alive && population.players[i].movesList.length > 0){
          //Unused(?)
          // population.players[i].prevX = population.players[i].posX;
          // population.players[i].prevY = population.players[i].posY;

          //Every 10th draw the players move on to the next move in the list of moves
          if(iteration % 10 == 0){
            population.players[i].posXC = population.players[i].movesList[currentMove][0];
            population.players[i].posYC = population.players[i].movesList[currentMove][1];
          }

          //Checks to make sure they havent collided with a wall in the X-axis
          if(checkForWallCollisions(population.players[i].posX + population.players[i].posXC, population.players[i].posY)){
              population.players[i].movePlayerX();
          }
          //Checks to make sure the player hasnt collided with a wall in the Y-axis
          if(checkForWallCollisions(population.players[i].posX, population.players[i].posY + population.players[i].posYC)){
              population.players[i].movePlayerY();
          }
      }
    }

    //Every 10h draw the current move shifts to the next in the list
    if(iteration % 10 == 0){
      currentMove++;
    }

    //Draws each of the players in the population
    rectMode("center");
    for(let i = 0; i < population.players.length; i++){
      drawPlayer(population.players[i]);
    }
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

    // Draws each of the enemies in the list
    for(let i = 0; i < 4; i++){
        ellipse(dots[i].posX, dots[i].posY, enemyRadius, enemyRadius);
    }
}

function drawPlayer(player){
    //Draws the player at their safe location
    if(player.alive){
      rectMode(CENTER);
      strokeWeight(5);
      fill(255, 0, 0);
      rect(player.posX, player.posY, 30, 30);
      rectMode(CORNER);
    }
}

function checkForEnemyCollisions(player){
    //If a move would cause the player to collide with an enemy the function returns false
    //Indicating they are dead
    for(let i = 0; i < 4; i++){
        DeltaX = dots[i].posX - Math.max(player.posX, Math.min(dots[i].posX, player.posX - 30));
        DeltaY = dots[i].posY - Math.max(player.posY, Math.min(dots[i].posY, player.posY - 30));
        if((DeltaX * DeltaX + DeltaY * DeltaY) < 600){
            //console.log("Player X pos: " + player.posX + " Player Y position: " + player.posY + " Enemy X pos:" + dots[i].posX + " Enemy Y pos: " + dots[i].posY)
            return false;
        }
    }
    //Otherwise it returns true indicating they are still living
    return true;
}

function checkForWinCondition(player){
  //Not used at the moment
    if(player.posX > 850){
        return true;
    }

    return false;
}

function checkForWallCollisions(tempX, tempY){
  //Wall collision logic....
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

function getRandomInt(max){
  //Random number generator
  return Math.floor(Math.random() * Math.floor(max));
}

function getMovementVector(rand){
  //Given a random value between 0 and 8 (inclusive)
  //A certain movement vector is returned
  switch(rand){
    case 0: return [0,0]
    case 1: return [2,0]
    case 2: return [2,-2]
    case 3: return [2,2]
    case 4: return [0,2]
    case 5: return [-2,2]
    case 6: return [-2,0]
    case 7: return [0,-2]
    case 8: return [-2,-2]
  }
}

function checkGoal(player){
  //Checks a given players coordinates to see whether or not their location is within one of the short term goals
  //If it is then the current goal moves to the next
  switch(player.currentGoal){
    case 0:
      if((player.posX > 250 && player.posX < 300) && (player.posY > 400 && player.posY < 450)){
        console.log("Player has reached first goal");
        player.currentGoal += 1;
      }
      break;
    case 1:
      if((player.posX > 300 && player.posX < 350) && (player.posY > 400 && player.posY < 450)){
        console.log("Player has reached second goal");
        player.currentGoal += 1;
      }
      break;
    case 2:
      break;
    case 3:
      break;
    default: return -1;
  }
}
