class Population{
  constructor(numPlayers){
    this.players = [];

    for(var i = 0; i < numPlayers; i++){
      this.players[i] = new Player(130, 0, 0, 200, 0, 0, 5, true);
      this.players[i].fillMoveList(this.players[i].maxMoves);
    }
  }
}
