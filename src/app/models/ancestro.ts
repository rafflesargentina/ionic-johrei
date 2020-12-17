export class Ancestro{
    public name ="";
    public relationship="";
    
    public asignarValores(init?: Partial<Ancestro>) {
        Object.assign(this, init)
    }
}