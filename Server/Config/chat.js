const chat = require('../chatservice.js');
const http = require('./server.js').http;

const chatservice = new chat(http);
chatservice.setDefaultRoom('generale');
chatservice.init();

module.exports = chatservice;
