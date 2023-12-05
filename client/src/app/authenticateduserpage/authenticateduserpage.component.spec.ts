import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticateduserpageComponent } from './authenticateduserpage.component';

describe('AuthenticateduserpageComponent', () => {
  let component: AuthenticateduserpageComponent;
  let fixture: ComponentFixture<AuthenticateduserpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticateduserpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthenticateduserpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
