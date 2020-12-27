const server = require('./Config/server.js');
const app = server.app;
const bodyParser = require('body-parser');
const cors = require('cors');
var cookieParser = require('cookie-parser');
var cookie = require('cookie');
const {resolve} = require('path');
const path = require('path');
const secure = require('express-force-https');
const mode = process.env.Mode || "development";
const logged = require('./middleware/logged.js');
const port = process.env.PORT || 3000;
const origin = process.env.origin || "http://localhost:4200";
const chat = require('./Config/chat.js');

server.start(port);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({
  credentials: true,
  origin:origin,
}));
if(mode == 'production'){
  //app.use(secure);
  console.log('production mode abilitata');
  app.use(server.express.static(path.join(__dirname, '../../dist/chat')));
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

app.get('/',()=>{
  res.end('');
});
app.use('/user',require('./Routes/userRoutes.js'));
app.use('/auth',logged(),require('./Routes/authRoutes.js'));
app.get('*', (req,res)=>{
  if(process.env.Mode == 'production'){
    res.sendFile(path.join(__dirname, '../../dist/chat/index.html'));
  }
  else{
    res.status(404).send('404');
    res.end('');
  }
});
