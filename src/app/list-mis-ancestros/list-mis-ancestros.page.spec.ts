import { async, ComponentFixture, TestBed } from "@angular/core/testing"
import { IonicModule } from "@ionic/angular"

import { ListMisAncestrosPage } from "./list-mis-ancestros.page"

describe("ListMisAncestrosPage", () => {
    let component: ListMisAncestrosPage
    let fixture: ComponentFixture<ListMisAncestrosPage>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ListMisAncestrosPage ],
            imports: [IonicModule.forRoot()]
        }).compileComponents()

        fixture = TestBed.createComponent(ListMisAncestrosPage)
        component = fixture.componentInstance
        fixture.detectChanges()
    }))

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
