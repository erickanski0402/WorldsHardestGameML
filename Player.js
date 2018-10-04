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
        player.posX += player.posXC;
        player.posXC = 0;
    }

    movePlayerY(){
        player.posY += player.posYC
        player.posYC = 0;
    }
}
