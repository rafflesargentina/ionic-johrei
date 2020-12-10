import { TestBed } from "@angular/core/testing"

import { RedirectIfNotAuthenticatedService } from "./redirect-if-not-authenticated.service"

describe("RedirectIfNotAuthenticatedService", () => {
    let service: RedirectIfNotAuthenticatedService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(RedirectIfNotAuthenticatedService)
    })

    it("should be created", () => {
        expect(service).toBeTruthy()
    })
})
