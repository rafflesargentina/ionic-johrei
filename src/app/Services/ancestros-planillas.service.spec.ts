import { TestBed } from "@angular/core/testing"

import { AncestrosPlanillasService } from "./ancestros-planillas.service"

describe("AncestrosPlanillasService", () => {
    let service: AncestrosPlanillasService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(AncestrosPlanillasService)
    })

    it("should be created", () => {
        expect(service).toBeTruthy()
    })
})
