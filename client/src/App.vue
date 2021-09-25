<template>
  <div id="app">
    <GameBoard v-bind:style="{ display: activeDisplayBoard}" :socket="socket" :player="player"/>
    <Lobby v-bind:style="{ display: activeDisplayLobby}" :socket="socket" @newPlayer="getPlayer"/>
  </div>
</template>

<script>
import io from "socket.io-client";
import Lobby from './components/Lobby.vue';
import GameBoard from './components/GameBoard.vue';
import Player from './player.js';


export default {
  name: 'App',
    components: {
    Lobby,
    GameBoard
  },
  data(){
    return {
      player: '',
      socket: {},
      activeDisplayBoard: "none",
      activeDisplayLobby: "block"
    }
  },
  created() {
    this.socket = io("http://localhost:3000");
  },
  mounted (){
    //player1
    this.socket.on("newGame", () =>{
			this.activeDisplayBoard = "block";
      this.activeDisplayLobby = "none"; 
		});

    //player2
    this.socket.on("player2", () =>{
			this.activeDisplayBoard = "block";
      this.activeDisplayLobby = "none";
		});
    
  },
  methods:{
    getPlayer(val){
      //get Player instance from child(Lobby)
      this.player = val;
      let player = new Player("temp","temp");
      player = this.player;
      console.log(player.getPlayerType());
    }

  }
 
}
</script>

<style>
@import '../node_modules/skeleton-css/css/skeleton.css';
.isActive{
  display: block;
}
.tile{
	width: 80px;
	height: 80px;
	font-size: 60px;
	font-family: Helvetica;
}
.center{
	margin: 0 auto;
}
</style>
