const users = require('../Config/dbSchema/usersSchema.js');
const addUser = (data)=>{
  let user = new users({
    nome: data.username,
    password: data.password,
    email: data.email,
  });
  return user.save();
}
const emailExist = async (email)=>{
  let result = await users.findOne({email: email}).exec();
  return result == null ? false : true;
}
const findUserByName = async (username)=>{
  let result = await users.findOne({nome:new RegExp("^" + username +  "$" ,"i")});
  return result == null ? false : result.toObject();
}
module.exports = {
  addUser,
  emailExist,
  findUserByName
}
