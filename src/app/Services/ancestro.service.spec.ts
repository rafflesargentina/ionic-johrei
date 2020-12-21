import { TestBed } from "@angular/core/testing"

import { AncestroService } from "./ancestro.service"

describe("AncestroService", () => {
    let service: AncestroService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(AncestroService)
    })

    it("should be created", () => {
        expect(service).toBeTruthy()
    })
})
