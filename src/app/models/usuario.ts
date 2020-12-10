import { Address } from "./address"

export class Usuario{

    public address:Address;
    public id  = "";
    public first_name = "";
    public last_name = "";
    public email = "";
    public document_number: number = null;
    public password = "";
    public password_confirmation = "";
    public member = false;
    public frequenter =false;
    public contact = {
        mobile: "",
        phone: ""
    }

    constructor(){
        this.address = new Address
    }
    
    public asignarValores(init?: Partial<Usuario>) {
        Object.assign(this, init)
    } 
}
