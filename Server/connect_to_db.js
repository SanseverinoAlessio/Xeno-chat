var mongoose = require('mongoose');
mongoose.connect(process.env.mongodb,{
});
module.exports = mongoose;
