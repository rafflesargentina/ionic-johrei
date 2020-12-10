import { async, ComponentFixture, TestBed } from "@angular/core/testing"
import { IonicModule } from "@ionic/angular"

import { SeleccionarArchivoComponent } from "./seleccionar-archivo.component"

describe("SeleccionarArchivoComponent", () => {
    let component: SeleccionarArchivoComponent
    let fixture: ComponentFixture<SeleccionarArchivoComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SeleccionarArchivoComponent ],
            imports: [IonicModule.forRoot()]
        }).compileComponents()

        fixture = TestBed.createComponent(SeleccionarArchivoComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    }))

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
