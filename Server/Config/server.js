const express = require('express');
const app = express();
const http = require('http').createServer(app);

const start = (port)=>{
  http.listen(port,()=>{
    console.log('Server avviato sulla porta ' + port);
  });
}
module.exports ={
  app,
  http,
  start,
  express,
}
