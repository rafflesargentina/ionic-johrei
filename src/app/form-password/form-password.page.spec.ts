import { async, ComponentFixture, TestBed } from "@angular/core/testing"
import { IonicModule } from "@ionic/angular"

import { FormPasswordPage } from "./form-password.page"

describe("FormPasswordPage", () => {
    let component: FormPasswordPage
    let fixture: ComponentFixture<FormPasswordPage>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ FormPasswordPage ],
            imports: [IonicModule.forRoot()]
        }).compileComponents()

        fixture = TestBed.createComponent(FormPasswordPage)
        component = fixture.componentInstance
        fixture.detectChanges()
    }))

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
