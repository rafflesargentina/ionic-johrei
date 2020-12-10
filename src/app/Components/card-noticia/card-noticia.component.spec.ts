import { async, ComponentFixture, TestBed } from "@angular/core/testing"
import { IonicModule } from "@ionic/angular"

import { CardNoticiaComponent } from "./card-noticia.component"

describe("CardNoticiaComponent", () => {
    let component: CardNoticiaComponent
    let fixture: ComponentFixture<CardNoticiaComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ CardNoticiaComponent ],
            imports: [IonicModule.forRoot()]
        }).compileComponents()

        fixture = TestBed.createComponent(CardNoticiaComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    }))

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
