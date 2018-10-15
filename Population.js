class Population{
  constructor(numPlayers, numMoves){
    this.players = [];
    this.numMoves = numMoves;

    for(var i = 0; i < numPlayers; i++){
      this.players[i] = new Player(130, 0, 0, 200, 0, 0, this.numMoves, true);
      this.players[i].fillMoveList(this.players[i].maxMoves);
    }
  }
}
