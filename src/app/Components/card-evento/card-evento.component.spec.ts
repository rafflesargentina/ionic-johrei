import { async, ComponentFixture, TestBed } from "@angular/core/testing"
import { IonicModule } from "@ionic/angular"

import { CardEventoComponent } from "./card-evento.component"

describe("CardEventoComponent", () => {
    let component: CardEventoComponent
    let fixture: ComponentFixture<CardEventoComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ CardEventoComponent ],
            imports: [IonicModule.forRoot()]
        }).compileComponents()

        fixture = TestBed.createComponent(CardEventoComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    }))

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
