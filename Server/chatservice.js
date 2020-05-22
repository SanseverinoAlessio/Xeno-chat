function chat(http){
  const io = require('socket.io')(http);
  const jwt = require('jsonwebtoken');
  var cookie = require('cookie');
  var dotenv = require('dotenv');
  var defaultRoom = '';
  var rooms = [
  ];
  var connection = [];
  this.verifyRooms = ()=>{
    rooms = rooms.filter((room) => {
      if(room.online > 0 || room.nome == defaultRoom){
        return room;
      }
    });
  }
  this.decrementOnline =(currentRoom)=>{
    rooms.map((item,index)=>{
      if(item.nome == currentRoom && item.online !== 0){
        rooms[index].online -= 1;
      }
    });
  }
  this.updateSocketId = (username,socketid)=>{
    connection.map((user,index)=>{
      if(user.username == username){
        connection[index].socketId = socketid;
      }
    });
  }
  this.changeUserRoom= (room,username)=>{
    connection.map((user,index)=>{
      if(user.username == username){
        connection[index].room = room;
      }
    });
  }
  this.removeUser = (arr,username)=>{
    arr = arr.filter((user) => {
      if(user.username !== username){
        return user;
      }
      else{
        this.decrementOnline(user.room);
      }
    });
    this.verifyRooms();
    return arr;
  }
  this.addUser = (name,socket)=>{
    connection.push({
      username: name,
      room:defaultRoom,
      socketId:socket,
    });
  }
  this.addRoom = (room)=>{
    if(room !== 'generale'){
      rooms.push({
        nome: room,
        online: +1,
      });
    }
  }

  this.findUsersInRoom = (room)=>{
    let arr = connection.filter((user) => {
      if(user.room == room){
        return user;
      }
    });
    return arr;
  }
  this.getRooms = ()=>{
    return rooms;
  }
  this.getUsers=()=>{
    return connection;
  }
  this.incrementRoom = (name)=>{
    rooms.map((room,index)=>{
      if(room.nome == name){
        rooms[index].online = 0;
        connection.map((user)=>{
          if(user.room == name){
            rooms[index].online += 1;
          }
        });
      }
    });
  }
  this.setDefaultRoom = (name)=>{
    if(typeof name == 'string'){
      if(rooms.length > 0){
        throw "Questo metodo deve essere utilizzato per generare una room principale";
      }
      else{
        rooms.push({
          nome:name,
          online:0
        });
        defaultRoom = name;
      }
    }
  }
  this.logout = (socket)=>{
    let prom = new Promise((resolve,reject)=>{
      let connections = io.sockets.connected;
      for(let c in connections ){
        let socketId = connections[c].id;
        if(socket == socketId){
          connections[c].disconnect();
          resolve(true);
        }
        else{
          reject(false);
        }
      }
    });
    return prom;
  }
  this.deleteOtherSession = (username,currentSocketId)=>{
    let connections = io.sockets.connected;
    for(let c in connections ){
      if(currentSocketId !== connections[c].id){
        if(username == connections[c].username){
          connections[c].emit('otherConnection',currentSocketId);
        }
      }
    }
  }

  this.init= ()=>{
    if(defaultRoom.length > 0) {
      io.on('connection',(socket)=>{
        let cookies = socket.handshake.headers.cookie;
        let tokenId = cookie.parse(cookies).sessionId;
        let socketId = socket.id;
        let reconnected = false;
        let newSocket = '';

        let currentRoom = '';
        jwt.verify(tokenId,process.env.token_Key,(err,decode)=>{
          if(err){
            return null;
            console.log('errore token');

          }
          else{
            console.log(decode.User);
            if(connection.length !== 0){
              let find = false;
              for(let i =0;i<connection.length; i++){
                if(decode.User == connection[i].username){
                  find = true
                }
                if(find == true){
                  find = false;
                  socket.emit('connected');

                  break;
                }
                else if(find == false && i + 1 == connection.length){
                  this.addUser(decode.User,socketId);
                  socket.emit('connected');
                  break;
                }
              }
            }
            else{
              this.addUser(decode.User,socketId);
              socket.emit('connected');
            }
            socket.on('connectToDefaultRoom',()=>{
              currentRoom = defaultRoom;
              socket.join(defaultRoom);
              let onlineinroom = this.findUsersInRoom(currentRoom);
              io.to(currentRoom).emit('online',{online:onlineinroom});
              this.incrementRoom(defaultRoom);
              socket.emit('currentRoom', currentRoom);
              socket.to(currentRoom).emit('onlinemsg',{greeting:decode.User + ' si è connesso'});
              io.emit('allRooms',{rooms:rooms});
              io.sockets.connected[socketId].username = decode.User;
              setTimeout(()=>{
                this.deleteOtherSession(decode.User,socketId);
              },0);


            });
            socket.on('room',(room)=>{ //Connessione ad una stanza
              if(rooms.length > 0){
                io.to(currentRoom).emit('left',{username: decode.User});
                socket.leave(currentRoom);
                this.decrementOnline(currentRoom);
                let find = false;
                for(let i=0; i < rooms.length; i++){
                  if(rooms[i].nome == room){
                    find = true;
                  }
                  if(find == true){
                    currentRoom = room;
                    this.changeUserRoom(currentRoom,decode.User);
                    socket.emit('currentRoom', currentRoom);
                    this.incrementRoom(room);
                    this.verifyRooms();
                    socket.join(currentRoom);
                    io.emit('allRooms',{rooms:rooms});
                    find = false;
                    break;
                  }
                  if (find == false && i + 1 == rooms.length && room !== defaultRoom){
                    currentRoom = room;
                    this.changeUserRoom(currentRoom,decode.User);
                    socket.emit('currentRoom', currentRoom);
                    this.addRoom(room);
                    this.incrementRoom(room);
                    this.verifyRooms();
                    socket.join(currentRoom);
                    io.emit('allRooms',{rooms:rooms});
                    break;
                  }
                }
                let onlineinroom = this.findUsersInRoom(currentRoom);

                io.to(currentRoom).emit('online',{online:onlineinroom });
                socket.to(currentRoom).emit('onlinemsg',{greeting:decode.User + ' si è connesso'});
              }

            });
            socket.on('msg',(msg)=>{
              let date = new Date();
              io.to(currentRoom).emit('msg',{
                username:decode.User,
                msg:msg,
                time: date ,
              });
            });
            socket.on('typing',(val)=>{
              if(val == true){
                io.to(currentRoom).emit('userTyping',{username:decode.User, typing:val});
              }
              else{
                io.to(currentRoom).emit('userTyping',{username:decode.User, typing:val});
              }
            });
            socket.on('sameAccount',(newsocket)=>{
              reconnected = true;
              newSocket = newsocket;
              socket.disconnect();
            });
            socket.on('disconnect',()=>{
              if(reconnected == true){
                if(currentRoom !== defaultRoom){
                  this.decrementOnline(currentRoom);
                  this.changeUserRoom(defaultRoom,decode.User);
                  socket.to(currentRoom).emit('left',{username: decode.User});
                  socket.to(currentRoom).emit('userleft',{msg: decode.User + ' si è disconnesso'});
                  this.verifyRooms();
                  let onlineinroom = this.findUsersInRoom(defaultRoom);
                  this.incrementRoom(defaultRoom);
                  io.to(defaultRoom).emit('online',{online:onlineinroom});
                  io.emit('allRooms',{rooms:rooms});

                }
                reconnected = false;
              }
              else{
                connection = this.removeUser(connection,decode.User);
                socket.to(currentRoom).emit('left',{username: decode.User});
                socket.to(currentRoom).emit('userleft',{msg: decode.User + ' si è disconnesso'});
                io.emit('allRooms',{rooms:rooms});
              }
            });
          }
        });
      });
    }
    else{
      throw 'Devi prima impostare una room principale';
    }
  }
}
module.exports = chat;
