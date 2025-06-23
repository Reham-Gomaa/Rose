import { TestBed } from "@angular/core/testing";

import { OccasionsService } from "./occasions.service";

describe("OccasionsService", () => {
  let service: OccasionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OccasionsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
