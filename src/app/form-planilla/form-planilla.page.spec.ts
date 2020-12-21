import { async, ComponentFixture, TestBed } from "@angular/core/testing"
import { IonicModule } from "@ionic/angular"

import { FormPlanillaPage } from "./form-planilla.page"

describe("FormPlanillaPage", () => {
    let component: FormPlanillaPage
    let fixture: ComponentFixture<FormPlanillaPage>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ FormPlanillaPage ],
            imports: [IonicModule.forRoot()]
        }).compileComponents()

        fixture = TestBed.createComponent(FormPlanillaPage)
        component = fixture.componentInstance
        fixture.detectChanges()
    }))

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
