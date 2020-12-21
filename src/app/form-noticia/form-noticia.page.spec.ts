import { async, ComponentFixture, TestBed } from "@angular/core/testing"
import { IonicModule } from "@ionic/angular"

import { FormNoticiaPage } from "./form-noticia.page"

describe("FormNoticiaPage", () => {
    let component: FormNoticiaPage
    let fixture: ComponentFixture<FormNoticiaPage>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ FormNoticiaPage ],
            imports: [IonicModule.forRoot()]
        }).compileComponents()

        fixture = TestBed.createComponent(FormNoticiaPage)
        component = fixture.componentInstance
        fixture.detectChanges()
    }))

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
