const mongoose = require("./connect_to_db");
var schema = mongoose.Schema;
var userSchema = new schema({
nome: String,
password: String,
email: String,
});
module.exports = mongoose.model('user',userSchema);
