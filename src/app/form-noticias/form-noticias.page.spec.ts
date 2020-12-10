import { async, ComponentFixture, TestBed } from "@angular/core/testing"
import { IonicModule } from "@ionic/angular"

import { FormNoticiasPage } from "./form-noticias.page"

describe("FormNoticiasPage", () => {
    let component: FormNoticiasPage
    let fixture: ComponentFixture<FormNoticiasPage>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ FormNoticiasPage ],
            imports: [IonicModule.forRoot()]
        }).compileComponents()

        fixture = TestBed.createComponent(FormNoticiasPage)
        component = fixture.componentInstance
        fixture.detectChanges()
    }))

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
