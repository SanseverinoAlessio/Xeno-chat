function server(port){
  this.port = process.env.PORT || port;
  const express = require('express');
  const app = express();
  const validate = require("./validate.js");
  const http = require('http').createServer(app);
  const bodyParser = require('body-parser');
  const urlencodedParser = bodyParser.urlencoded({ extended: true })
  const cors = require('cors');
  const passwordhash = require('./passwordhash.js');
  var users = require('./user.js');
  var jwt = require('jsonwebtoken');
  var cookieParser = require('cookie-parser');
  var cookie = require('cookie');
  const chat = require('./chatservice.js');
  const chatservice = new chat(http);
  const {resolve} = require('path');
  const path = require('path');
  const secure = require('express-force-https');
  this.Start = ()=>{
    chatservice.setDefaultRoom('generale');
    chatservice.init();
    app.use(cookieParser());
    this.routes();
    http.listen(this.port,()=>{
      console.log('Server avviato sulla porta ' + this.port);
    });
  }
  this.routes = ()=>{
    app.use(bodyParser.json());
    app.use(cors({
      credentials: true,
      origin:process.env.origin,
    }));
    console.log('mode: ' + process.env.Mode);

    if(process.env.Mode == 'production'){
      app.use(secure);
      console.log('production mode abilitata');
      app.use(express.static(path.join(__dirname, '../../dist/chat')));
      app.use((req,res,next)=>{
        let accept  = req.get('accept').indexOf('application/json');
        if(accept !== -1){
          next();
        }else {
          res.sendFile(path.join(__dirname, '../../dist/chat/index.html'));
          next();
        }
      });
    }

    app.get('/islogged', (req,res)=>{
      jwt.verify(req.cookies.sessionId, process.env.token_Key,(err,decoded)=>{
        if(err){
          console.log("Utente non loggato");
          res.status(200).send(false);
        }
        else{
          res.status(200).send(true);

        }
        res.end('');
      });
    });

    app.post('/register',urlencodedParser,(req,res)=>{
      let nome = req.body.nome;
      let email = req.body.email;
      let pass = new passwordhash(10);
      let errors = [];
      validate.name(nome,errors,()=>{
        validate.email(email,errors,()=>{
          validate.password(req.body.password,errors);
          console.log(errors);
          console.log(errors.length);


          if(errors.length == 0)
          {
            console.log('password: ' + req.body.password);
            pass.hashPassword(req.body.password).then((password) => {
              let user = new users(nome,email,password);
              user.adduser().then((resol) => {
                res.status(200).json({
                  "success": "L'account è stato creato!"
                });
                res.end('');
                console.log(resol);
              }).catch((rej) => {
                res.status(500).json({
                  "error": "C'è stato un errore durante la creazione"
                });
                res.end('');
                console.log(rej);
              });
            }).catch((err) => {
              res.status(500).json({
                "error": "C'è stato un errore durante la creazione"
              });
              console.log(err);
              res.end('');
            })

          }
          else{
            console.log('errore con la registrazione');
            let jsonErrors = JSON.stringify(errors);
            res.json(jsonErrors);
            res.end('');
          }
        });
      });
    });
    app.get('/user/:username',urlencodedParser,(req,res)=>{
      users.findName(req.params.username).then((val) => {
        if(val){
          let user = val.toObject();
          console.log(user.nome);
          res.status(200).json({nome:user.nome});
        }
        else{
          res.status(200).send('');
        }
        res.end('');
      });
    });
    app.get("/email/:emailparam",(req,res)=>{
      users.findEmail(req.params.emailparam).then((val) => {
        if(val.length <= 0){
          res.status(200).json({
            exist: false
          });
        }else{
          res.status(200).json({
            exist: true
          });
        }
      });
    });

    app.get('/getUsername',(req,res)=>{
      jwt.verify(req.cookies.sessionId, process.env.token_Key,(err,decoded)=>{
        if(err){

        }
        else{
          res.status(200).send({nome:decoded.User});
        }
        res.end('');
      });
    });

    app.get('/logout',(req,res)=>{
      console.log(req.cookies.io);
      chatservice.logout(req.cookies.io).then(()=>{
        res.clearCookie('sessionId');
        res.status(200).end('');
      }).catch((err) => {
        res.clearCookie('sessionId');
        res.status(200).end('');
      });
    });

    app.post('/login',urlencodedParser,(req,res)=>{
      users.login(req.body.nome,req.body.password).then((val) => {
        console.log(val.condition);
        console.log(val.user.nome);
        if(val.condition == true){
          jwt.sign({ //Crea un Json Web Token
            User:val.user.nome,
          },
          process.env.token_Key, //Token Key
          {algorithm: 'HS256'},
          (err,validToken)=>{
            if(err){
              console.log(err);
              res.status(500).send('');
            }
            else{
              let date = new Date(Date.now() + (30 * 24 * 60 * 60 * 1000));
              let token = validToken;
              res.cookie('sessionId',validToken,{HttpOnly: true, secure:false,expires: date });
              console.log(req.body.nome  +  ' Si è connesso!');
              res.status(200).json({
                access:true
              });
              res.end('');
            }
          });
        }
        else{
          res.json({
            access:false
          });
          res.end('');
        }
      }).catch((err) => {
        res.json({
          error: err
        });
        res.end('');
      });
    });
    app.get('*', (req,res)=>{
      if(process.env.Mode == 'production'){
        res.sendFile(path.join(__dirname, '../../dist/chat/index.html'));
      }
      else{
        res.status(404).send('404');
        res.end('');
      }
    });
  }
}
module.exports = server;
