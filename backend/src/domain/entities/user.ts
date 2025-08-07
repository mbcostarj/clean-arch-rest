const crypto = require('crypto');

export type UserProps = {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string
}

export class User {

  private constructor(private props: UserProps){}

  public static create(name: string, email: string, password: string, phone: string){
    return new User({
      id: crypto.randomUUID().toString(),
      name,
      email,
      password,
      phone
    });
  }

  public static with(props: UserProps) {
    return new User(props);
  }

  public get id(){
    return this.props.id;
  }

  public get name(){
    return this.props.name;
  }

  public get email(){
    return this.props.email;
  }

  public get password(){
    return this.props.password;
  }

  public get phone(){
    return this.props.phone;
  }
}