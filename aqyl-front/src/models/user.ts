export class User{
  name: String;
  email: String;
  password: String;

  constructor(name?: String, email?: String, password?: String) {

    this.name = "";
    this.email = ""
    this.password = ""

    if(name && email && password){
      this.name = name;
      this.email = email
      this.password = password
    }
  }
}


export class UserProfile{
  name: String;
  email: String;

  constructor(name?: String, email?: String) {

    this.name = "";
    this.email = ""

    if(name && email){
      this.name = name;
      this.email = email
    }
  }
}
