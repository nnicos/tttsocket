//let player;
//let socket;

class Game {
    constructor(roomId, socket) {
      this.roomId = roomId;
      this.board = [];
      this.moves = 0;
      this.socket= socket;
    }
      
      tileClickHandler(player, clickedTile) {
        const row = parseInt(clickedTile.split('_')[1][0], 10);
        const col = parseInt(clickedTile.split('_')[1][1], 10);

        // Update moves after your turn. need for tieCheck
        this.moves++;

        player.setCurrentTurn(false);
        player.updatePlaysArr(1 << ((row * 3) + col));
        
        // Send an update to the opponent to update their UI's tile
         // Emit an event to update other player that you've played your turn.
        this.socket.emit('playTurn', {
          tile: clickedTile,
          room: this.getRoomId(),
          type: player.getPlayerType()
        });

        this.checkWinner(player);
      }

    getRoomId() {
      return this.roomId;
    }
 
    checkWinner(player) {
      const currentPlayerPositions = player.getPlaysArr();

      player.wins.forEach((winningPosition) => {
        if ((winningPosition & currentPlayerPositions) === winningPosition) {
          this.announceWinner(player);
        }
      });

      
      if (this.checkTie()) {
        const tieMessage = 'Game Tied!!';
        this.socket.emit('gameEnded', {
          room: this.getRoomId(),
          message: tieMessage,
        });
      }
    }

    checkTie() {
      return this.moves >= 9;
    }

    // Announce the winner if the current client has won.
    // Broadcast this on the room to let both know.
    announceWinner(player) {
      const message = `${player.getPlayerName()} wins!`;
      this.socket.emit('gameEnded', {
        room: this.getRoomId(),
        message: message
      });
    }

    // End the game.
    endGame(message) {
      alert(message);
      location.reload();
    }
  }


   /**
     *
     * To determine a win condition, each square is "tagged" from left
     * to right, top to bottom, with successive powers of 2.  Each cell
     * thus represents an individual bit in a 9-bit string, and a
     * player's squares at any given time can be represented as a
     * unique 9-bit value. A winner can thus be easily determined by
     * checking whether the player's current 9 bits have covered any
     * of the eight "three-in-a-row" combinations.
     *
     *     273                 84
     *        \               /
     *          1 |   2 |   4  = 7
     *       -----+-----+-----
     *          8 |  16 |  32  = 56
     *       -----+-----+-----
     *         64 | 128 | 256  = 448
     *       =================
     *         73   146   292
     *
     *  We have these numbers in the Player.wins array and for the current
     *  player, we've stored this information in playsArr.
     */

  
  module.exports = Game;