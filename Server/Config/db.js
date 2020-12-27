const mongoose = require('mongoose');
mongoose.connect( process.env.mongodb ||'mongodb://localhost:27017/Xeno',{
}).catch((err)=>{
handleError(err);

});
module.exports = mongoose;
