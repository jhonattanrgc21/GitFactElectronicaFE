import { TestBed, inject } from "@angular/core/testing";
import { AuthService } from "./auth.service";

describe("Service: Login", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
    });
  });

  it("should ...", inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
