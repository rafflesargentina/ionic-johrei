export class Ancestro{
    public id="";
    public name ="";
    public relationship="";
    
    public asignarValores(init?: Partial<Ancestro>) {
        Object.assign(this, init)
    }
}