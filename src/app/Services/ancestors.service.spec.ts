import { TestBed } from "@angular/core/testing"

import { AncestorsService } from "./ancestors.service"

describe("AncestorsService", () => {
    let service: AncestorsService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(AncestorsService)
    })

    it("should be created", () => {
        expect(service).toBeTruthy()
    })
})
