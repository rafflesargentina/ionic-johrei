export class Document {
    public created_at? = null;
    public updated_at? = null;
    public documentable_type? = "";
    public documentable_id? = "";
    public description?:string = "";
    public featured = false;
    public id = "";
    public location = "";
    public name = "";
    
    public asignarValores(init?: Partial<Document>) {
        Object.assign(this, init)
    }
}
