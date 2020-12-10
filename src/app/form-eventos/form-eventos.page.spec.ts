import { async, ComponentFixture, TestBed } from "@angular/core/testing"
import { IonicModule } from "@ionic/angular"

import { FormEventosPage } from "./form-eventos.page"

describe("FormEventosPage", () => {
    let component: FormEventosPage
    let fixture: ComponentFixture<FormEventosPage>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ FormEventosPage ],
            imports: [IonicModule.forRoot()]
        }).compileComponents()

        fixture = TestBed.createComponent(FormEventosPage)
        component = fixture.componentInstance
        fixture.detectChanges()
    }))

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
