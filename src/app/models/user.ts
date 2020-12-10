import { Address } from "./address"

export class User{
  public address;

  public contact = {
      mobile: "",
  };

  public avatar = {
      small: ""
  };

  public id = "";
  public email = "";
  public foto = "";
  public name = "";
  public member = false;
  public frequenter = true;
    
  constructor() {
      this.address = new Address
  }
    
  public asignarValores(init?: Partial<User>) {
      Object.assign(this, init)
  }
}
