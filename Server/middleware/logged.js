const jwt = require('jsonwebtoken');
const logged = ()=>{
  return (req,res,next)=>{
    let key = process.env.tokenKey || "defaultKey";
    jwt.verify(req.cookies.token,key,(err,decoded)=>{
      if(err){
       res.status(401);
       return res.end('');
      }
      req.decoded = decoded;
      return next();
    });
  }
}
module.exports = logged;
