# WorldsHardestGameML
Project testing environment to develop ML algorithms to clear levels


Ideas to implement fitness and mutation:

  Start N players with a list of 5 moves before the next generation starts. 
  The list of moves is randomly generated for the first generation. 
  Every generation thereafter, the most 'fit' player is brought forward, its list of moves kept in tact
  The list of moves is then copied to every other player (N-1) with a function that goes through each move and has a % chance to reroll its direction
  Every 5 generations the list of total moves increases by 5
