export class User{
  name: String;
  email: String;
  password: String;
  recaptcha: String

  constructor(name?: String, email?: String, password?: String, recaptcha?: String ) {

    this.name = ""
    this.email = ""
    this.password = ""
    this.recaptcha = ""

    if(name && email && password && recaptcha){
      this.name = name;
      this.email = email
      this.password = password
      this.recaptcha = recaptcha
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

export class AdminPanelUser{
  id: number
  name: String;
  email: String;
  role: String

  constructor(id? : number, name?: String, email?: String, role?: String ) {
    this.id = 0
    this.name = "";
    this.email = ""
    this.role = ""

    if(id && name && email && role) {
      this.id = id
      this.name = name;
      this.email = email
      this.role = role
    }
  }
}
