import { async, ComponentFixture, TestBed } from "@angular/core/testing"
import { IonicModule } from "@ionic/angular"

import { FormEventoPage } from "./form-evento.page"

describe("FormEventoPage", () => {
    let component: FormEventoPage
    let fixture: ComponentFixture<FormEventoPage>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ FormEventoPage ],
            imports: [IonicModule.forRoot()]
        }).compileComponents()

        fixture = TestBed.createComponent(FormEventoPage)
        component = fixture.componentInstance
        fixture.detectChanges()
    }))

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
