class Player {
    constructor(name, type, currentTurn) {
      this.name = name;
      this.type = type;
      this.currentTurn = currentTurn;
      this.playsArr = 0;
      this.wins = [7, 56, 448, 73, 146, 292, 273, 84];
    }

    // Set the bit of the move played by the player
    // tileValue - Bitmask used to set the recently played move.
    updatePlaysArr(tileValue) {
      this.playsArr += tileValue;
    }

    getPlaysArr() {
      return this.playsArr;
    }

    // Set the currentTurn for player to turn and update UI to reflect the same.
    setCurrentTurn(turn) {
      this.currentTurn = turn;
      //const message = turn ? 'Your turn' : 'Waiting for Opponent';
    }

    getPlayerName() {
      return this.name;
    }

    getPlayerType() {
      return this.type;
    }

    getCurrentTurn() {
      return this.currentTurn;
    }   
}

module.exports = Player;

