export class Evento {
    public id = "";
    public user_id="";
    public title = "";
    public comment = "";
    public duration="";
    public date:Date = new Date();
    public hour?: Date = new Date();
    public guests = [];
    public photos = [];
    
    public asignarValores(init?: Partial<Evento>) {
        Object.assign(this, init)
    }
}
