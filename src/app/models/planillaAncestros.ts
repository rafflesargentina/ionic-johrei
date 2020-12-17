export class PlanillaAncestros {
    public id = "";
    public ancestors = [];
    public date:Date = new Date();
    
    
    public asignarValores(init?: Partial<PlanillaAncestros>) {
        Object.assign(this, init)
    }
}