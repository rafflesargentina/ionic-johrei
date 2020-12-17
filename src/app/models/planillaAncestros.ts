export class PlanillaAncestros {
    public id = "";
    public ancestors = [];
    public date ="";
    
    constructor(){
        let d = new Date();
        this.date = d.getFullYear()+"-"+(Number(d.getMonth())+1)+"-"+("0" + d.getDate()).slice(-2);
        console.log(this.date)
    }
    
    public asignarValores(init?: Partial<PlanillaAncestros>) {
        Object.assign(this, init)
    }
}