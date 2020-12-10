import { async, ComponentFixture, TestBed } from "@angular/core/testing"
import { IonicModule } from "@ionic/angular"

import { DetailEsencialPage } from "./detail-esencial.page"

describe("DetailEsencialPage", () => {
    let component: DetailEsencialPage
    let fixture: ComponentFixture<DetailEsencialPage>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ DetailEsencialPage ],
            imports: [IonicModule.forRoot()]
        }).compileComponents()

        fixture = TestBed.createComponent(DetailEsencialPage)
        component = fixture.componentInstance
        fixture.detectChanges()
    }))

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
