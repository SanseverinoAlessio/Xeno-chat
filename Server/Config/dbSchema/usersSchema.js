const mongoose = require('../db.js');
const schema = mongoose.Schema;


const userSchema = new schema({
  nome: {
    type: String,
    unique: true,
  },
  password: String,
  email: {
    type: String,
    unique: true,
  },
});



module.exports = mongoose.model('users',userSchema);
