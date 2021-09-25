const express = require("express");
const path = require('path');

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {    
    origin: "http://localhost:8080"
  }
});

let rooms = 0; //increment starter

io.on('connection', (socket) => {
  // Create a new game room and notify the creator of game.
  socket.on('createGame', (data) => {
    socket.join(`room-${++rooms}`);
    socket.emit('newGame', { name: data.name, room: `room-${rooms}` });
    console.log(socket.rooms)
  });

  // Connect the Player 2 to the room he requested. Send error if room full.
  socket.on('joinGame', (data) => {
    const room = data.room;
    let clients = io.sockets.adapter.rooms.get(data.room);
    const numClients = clients ? clients.size : 0;    

    if (room && numClients === 1) {
      socket.join(data.room);
      socket.broadcast.to(data.room).emit('player1', {});
      socket.emit('player2', { name: data.name, room: data.room });
      console.log(io.sockets.adapter.rooms.get(data.room));
    } else {
      socket.emit('err', { message: 'Sorry, The room is full! or does not exist!' });
    }
  });

  //Handle the turn played by either player and notify the other.
  socket.on('playTurn', (data) => {
    socket.broadcast.to(data.room).emit('turnPlayed', {
      tile: data.tile,
      room: data.room,
      type: data.type
    });
  });

  
    //Notify the players about the victor.
    socket.on('gameEnded', (data) => {
      console.log('received winner');
      //send message to room
      io.to(data.room).emit('gameEnd', data);
    });
  });
  
  http.listen(process.env.PORT || 3000);
