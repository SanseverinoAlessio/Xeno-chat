import { TestBed } from '@angular/core/testing';

import { AuthLoginService } from './auth-login.service';

describe('AuthLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthLoginService = TestBed.get(AuthLoginService);
    expect(service).toBeTruthy();
  });
});
