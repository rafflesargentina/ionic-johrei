export class Archivo{
    public id ="";
    public url="";
    public name="";
    public format="";
    public createdAt={seconds: 1597627191, nanoseconds: 876000000};
    
    public asignarValores(init?: Partial<Archivo>) {
        Object.assign(this, init)
    }
}
