import { TestBed } from "@angular/core/testing"

import { RedirectIfAuthenticatedService } from "./redirect-if-authenticated.service"

describe("RedirectIfAuthenticatedService", () => {
    let service: RedirectIfAuthenticatedService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(RedirectIfAuthenticatedService)
    })

    it("should be created", () => {
        expect(service).toBeTruthy()
    })
})
