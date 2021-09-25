<template>
  <div>
      <h1>TIC TAC TOE LOBBY</h1>
      <h2>Create new GAME</h2>
      <input v-model="playerNameX" name="playerNameX" type="text" placeholder="Your Name" />
      <button @click="newGame" class="btn">Create Game</button>
       <div v-if="errorMessageNewGame">
        {{errorMessageNewGame}}
      </div>
      <hr>
      <h2>Join existing game room</h2>
      <input v-model="playerNameO" name="playerNameO" type="text" placeholder="Your Name" />
      <input v-model="room" name="room" type="text" placeholder="Room ID" />
      <button @click="joinGame" class="btn">Join Game</button>
      <div v-if="errorMessageJoinGame">
        {{errorMessageJoinGame}}
      </div>
  </div>
</template>

<script>
import Player from '../player.js';



export default {
    name: "Lobby",
    props:["socket"],
    data(){
        return {
            playerNameX: '',
            playerNameO: '',
            room:'',
            errorMessageJoinGame: false,
            errorMessageNewGame: false,
        }
    },
    mounted(){
        this.socket.on('err', data => {
             this.errorMessageJoinGame = data.message;
        });
    }, 
    methods: {
        newGame(){
            if(!this.playerNameX){
                this.errorMessageNewGame = "Please enter a Name!";
            } else {
                //create player1
                const player = new Player(this.playerNameX, "X", true);
                const name = this.playerNameX;
                this.socket.emit('createGame', {name});
                this.$emit('newPlayer', player)
                console.log(player.getPlayerName());
            }
        },
        joinGame(){
            //create player2
            const player = new Player(this.playerNameO, "O", false);
            const room = this.room;
            const name = this.playerNameO;
            this.socket.emit('joinGame', {room, name});
            this.$emit('newPlayer', player)
            console.log(player.getPlayerName());
        }
    }
}
</script>

<style>

</style>