<template>
    <div class="gameBoard">
				<h2 id="userHello">{{ GameMessage }}</h2>
				<h3 id="turn">{{ turnMessage }}</h3>
				<table class="center">
					<tr>
						<td><button @click="tileClicked($event)" class="tile" id="button_00" ref="button_00"></button></td>
						<td><button @click="tileClicked($event)" class="tile" id="button_01" ref="button_01"></button></td>
						<td><button @click="tileClicked($event)" class="tile" id="button_02" ref="button_02"></button></td>
					</tr>
					<tr>
						<td><button @click="tileClicked($event)" class="tile" id="button_10" ref="button_10"></button></td>
						<td><button @click="tileClicked($event)" class="tile" id="button_11" ref="button_11"></button></td>
						<td><button @click="tileClicked($event)" class="tile" id="button_12" ref="button_12"></button></td>
					</tr>
					<tr>
						<td><button @click="tileClicked($event)" class="tile" id="button_20" ref="button_20"></button></td>
						<td><button @click="tileClicked($event)" class="tile" id="button_21" ref="button_21"></button></td>
						<td><button @click="tileClicked($event)" class="tile" id="button_22" ref="button_22"></button></td>
					</tr>
				</table>
			</div>
</template>

<script>
import Game from '../board.js';

export default {
	name: "GameBoard",
	data(){
		return {
			GameMessage:'',
			turnMessage: '',
			tile: '',
			game: '',
		}
	},
	props:["player","socket"],
	mounted(){
		//player1 connect to room
		this.socket.on("newGame", data =>{
			this.GameMessage = `Hello, ${data.name}. Please ask your friend to enter Game ID: ${data.room}. Waiting for player 2...`;
			this.game = new Game(data.room, this.socket);
		});
		this.socket.on("player1", () =>{
			this.GameMessage = `Hello, ${this.player.getPlayerName()}`;
			this.turnMessage = "Your turn!";
		});

		//player2 connect to room
		this.socket.on("player2", data =>{
			this.GameMessage = `Hello, ${data.name}`;
			this.game = new Game(data.room, this.socket);
			this.turnMessage = "Opponents turn!";
		});

		//update after turn played
		this.socket.on('turnPlayed', (data) => {
			this.game.moves++;
			this.player.setCurrentTurn(true);
			this.turnMessage = "Your turn!";
			this.$refs[data.tile].setAttribute("disabled", "disabled");
			this.$refs[data.tile].innerHTML = data.type;
		});

		//WinnerMessage
		this.socket.on('gameEnd', (data) => {
			this.game.endGame(data.message);
		});
	},
	methods: {
		tileClicked(event){
			this.tile = event.target.id;
			if(event.target.innerHTML != "") {
				alert('This tile has already been played on!');
			} else if(!this.player.getCurrentTurn()){
				alert('Not your TURN!');
			} else {
				event.target.innerHTML = this.player.getPlayerType();
				event.target.setAttribute("disabled", "disabled");
				this.turnMessage = "Opponents turn!";
				this.game.tileClickHandler(this.player, this.tile);
			}
		},
	}
}
</script>

<style>

</style>