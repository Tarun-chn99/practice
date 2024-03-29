const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const http = require('http');
const {Server} = require('socket.io');
const path = require('path');

connectToMongo();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000','http://localhost:3001','http://localhost:3002'],  // Replace with the actual origin of your React app
    methods: ['GET', 'POST'],
  },
});


const port = 5000;
app.use(cors()); 
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/uploads/images', express.static(path.join(__dirname, 'uploads/images/')));

const userSockets={};

io.on('connection', socket => {

  socket.emit('user-connect','Connection Established',(response) => {
    console.log(response.status);
  });

  socket.on('client-connection', msg => {
    console.log(`Message from server : ${msg}`)
  });

  
  socket.on('setUserId', (userId) => {
    userSockets[userId] = socket.id;
    console.log(`User with ID ${userId} is associated with socket ID ${socket.id}`);
  });

  socket.on('messageFromSender', (type,msg,recieverId,name) => {
    console.log(`Message to ${name} : `,msg );
    console.log(`Reciever ID : ${recieverId}`)
    console.log("Current users : ",userSockets);
    socket.broadcast.emit("messageToReciever",type,msg);
    // socket.emit('messageToReciever',msg,name);
    // sendMessageToReciever(recieverId,msg,name,type);
  });
});

server.listen(port, () => {
  console.log(`AurApp app listening on port http://localhost:${port}`);
});


// function sendMessageToReciever(Id, message,name,type) {
//   const userSocketId = userSockets[Id];
//   console.log('Reciever Id in sendMessageToReciever : ',Id);
//   console.log('UserSocketID of Reciever : ',userSocketId);
//   console.log(io);
//   if (userSocketId) {
    
//     io.to(userSocketId).emit('messageToReciever', type,message);
//     console.log("inside if");
//   } else {
//     console.log(`User with ID ${Id} not found`);
//   }
// }


