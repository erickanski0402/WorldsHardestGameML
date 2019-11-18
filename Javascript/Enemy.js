class Enemy{
    constructor(arr, posX, posY, iteration, destination){
        this.arr = arr;
        this.posX = posX;
        this.posY = posY;
        this.iteration = iteration;
        this.destination = destination;
    }

    enemyMovement(){
        let num = this.destination[0] - this.posX;
        if(num != 0){
            if(num > 0){
                this.posX += 5
            }else{
                this.posX -= 5;
            }
        }else{
            if(this.iteration + 1 < this.arr.length){
                this.iteration += 1;
                this.destination = this.arr[this.iteration];
            }else{
                this.iteration = 0;
                this.destination = this.arr[this.iteration];
            }
        }
    }
}
