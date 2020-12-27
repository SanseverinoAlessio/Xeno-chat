class rules{
  static require(input){
    if(input.value.length <= 0){
      input.errors['require'] = "Aggiungi un valore";
    }
    return input;
  }
  static password(input){
    let regex = new RegExp("^(.*)(?=.*[a-z]+)(?=.*[A-Z]{1,})(?=.*\\d{2,}).*");
    if(!regex.test(input.value)){
      input.errors['validPassword']="La password non è valida";
    }
    return input;
  }
  static email(input){
    let regex = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
    if(!regex.test(input.value)){
      input.errors['validEmail']="L'email non è valida";
    }
    return input;
  }
  static minLenght(input,min){
    if(min == null){
      throw "Impostare una lunghezza";
    }
    if(input.value.length < min){
      input.errors['minLenght'] = "La lunghezza non è sufficiente";
    }
    return input;
  }
  static maxLenght(input,max){
    if(input.value.length > max){
      input.errors['maxLenght'] = "La lunghezza supera i caratteri massimi consentiti";
    }
    return input;
  }
}


module.exports = rules;
