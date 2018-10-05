class Player{
    constructor(posX, posXC, prevX, posY, posYC, prevY, alive){
        this.posX = posX;
        this.posXC = posXC;
        this.prevX = prevX;

        this.posY = posY;
        this.posYC = posYC;
        this.prevY = prevY;

        this.alive = alive;
    }

    movePlayerX(){
        this.posX += this.posXC;
        this.posXC = 0;
    }

    movePlayerY(){
        this.posY += this.posYC
        this.posYC = 0;
    }
}
