const mongoose = require('../db.js');
const schema = mongoose.Schema;


const userSchema = new schema({
  nome: {
    type: String,
    unique: "Il nome è già stato utilizzato",
  },
  password: String,
  email: {
    type: String,
    unique: "L'email è già stata utilizzata",
  },
});



module.exports = mongoose.model('users',userSchema);
