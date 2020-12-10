import { Archivo } from "./archivo"

export class Article {
    public id = "";
    public title = "";
    public body?: string = "";
    public featured_photo?: string = "";
    public media?: Archivo[] = null;
    public updated_at?: Date = new Date();
    public videos = [];
    public audios =[];
    public documents =[];
    public photos = [];
    public date = new Date();
    
    public asignarValores(init?: Partial<Article>) {
        Object.assign(this, init)
    }
}
