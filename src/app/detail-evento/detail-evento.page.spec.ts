import { async, ComponentFixture, TestBed } from "@angular/core/testing"
import { IonicModule } from "@ionic/angular"

import { DetailEventoPage } from "./detail-evento.page"

describe("DetailEventoPage", () => {
    let component: DetailEventoPage
    let fixture: ComponentFixture<DetailEventoPage>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ DetailEventoPage ],
            imports: [IonicModule.forRoot()]
        }).compileComponents()

        fixture = TestBed.createComponent(DetailEventoPage)
        component = fixture.componentInstance
        fixture.detectChanges()
    }))

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
