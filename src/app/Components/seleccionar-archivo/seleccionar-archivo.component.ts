import { Component, OnInit, Output, EventEmitter } from "@angular/core"
import { FileChooser } from "@ionic-native/file-chooser/ngx"

@Component({
    selector: "app-seleccionar-archivo",
    templateUrl: "./seleccionar-archivo.component.html",
    styleUrls: ["./seleccionar-archivo.component.scss"],
})
export class SeleccionarArchivoComponent implements OnInit {

  
  @Output() onSelectValue = new EventEmitter<any>();

  public archivo:any;

  constructor(
    private fileChooser: FileChooser
  ) { }

  ngOnInit() {}

  seleccionarArchivoWeb(event){
      console.log(event)    
      this.archivo = event.target.files[0]
      this.onSelectValue.emit(this.archivo)
  }

  seleccionarArchivo(){
      this.fileChooser.open()
          .then(uri => console.log(uri))
          .catch(e => console.log(e))
  }

  get IsMobile() {
      return true
  }
}
