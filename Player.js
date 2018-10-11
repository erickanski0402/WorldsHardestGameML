class Player{
    constructor(posX, posXC, prevX, posY, posYC, prevY, numMoves, alive){
        this.posX = posX;
        this.posXC = posXC;
        this.prevX = prevX;

        this.posY = posY;
        this.posYC = posYC;
        this.prevY = prevY;

        this.maxMoves = numMoves;

        this.alive = alive;

        this.movesList = [];
        this.currentMove = 0;
    }

    movePlayerX(){
        this.posX += this.posXC;
        //this.posXC = 0;
    }

    movePlayerY(){
        this.posY += this.posYC
        //this.posYC = 0;
    }

    fillMoveList(numMoves){
      this.resetPlayer();
      for(let i = 0; i < numMoves; i++){
        this.movesList[i] = getMovementVector(floor(random(9)));
      }
    }

    getMovementVector(rand){
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

    resetPlayer(){
      print("reset");
      this.movesList = [];
      this.alive = true;
      this.posX = 130;
      this.posXC = 0;
      this.prevX = 130;
      this.posY = 200;
      this.posYC = 0;
      this.prevY = 200;
    }
}
