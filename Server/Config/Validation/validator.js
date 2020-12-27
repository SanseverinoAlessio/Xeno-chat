class validator{
  constructor(obj){
    this.rules = require('./rules.js');
    this.inputs = obj;
    this.errors = {};
  }
  validate(){
    for(const property in this.inputs)
    {
      let input = this.inputs[property];
      let inputRules = input.rules;
      let value = input.value;
      for(let i = 0; i < inputRules.length; i++){
        try{
          let currentRule = inputRules[i];
          let findParam = new RegExp("^(\\w+).([0-9]+).+$");
          let  ruleFunc = findParam.exec(currentRule);
          if(ruleFunc != null){
            this.rules[ruleFunc[1]](input,ruleFunc[2]);
          }
          else{
            this.rules[currentRule](input);
          }
        }
        catch(e){
          throw e;
          return;
        }
      }
      if(Object.keys(input.errors).length > 0){
        this.errors[property] = input.errors;
      }
    }
    return Object.keys(this.errors).length > 0 ? false : true;
  }
  getErrors(){
    return this.errors;
  }
}

module.exports = validator;
