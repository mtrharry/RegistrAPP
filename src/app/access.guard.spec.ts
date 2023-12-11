import { TestBed } from '@angular/core/testing';
import { AccessGuard } from './access.guard';
import { Storage } from '@ionic/storage';

describe('AccessGuard', () => {
  let guard: AccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AccessGuard,
        Storage, 
      ],
    });
    guard = TestBed.inject(AccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });


  
});