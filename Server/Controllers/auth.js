const jwt = require('jsonwebtoken');
const userModel = require('../Models/userModel.js');
const bcrypt = require('bcrypt');
const chatservice = require("../Config/chat.js");

const logout = (req,res)=>{
  chatservice.logout(req.cookies.io).then(()=>{
    res.clearCookie('token');
    res.status(200).end('');
  }).catch((err) => {
    res.clearCookie('token');
    res.status(200).end('');
  });
}
const getSessionUsername = (req,res)=>{
  res.status(200);
  res.json({
    nome: req.decoded.User,
  });
  res.end('');
}
const islogged = (req,res)=>{
  res.status(200).end('');
}
module.exports  = {
  logout,
  getSessionUsername,
  islogged
}
