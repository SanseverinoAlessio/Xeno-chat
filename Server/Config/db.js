const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Xeno',{
}).catch((err)=>{
handleError(err);

});
module.exports = mongoose;
