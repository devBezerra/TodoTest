import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationRegisterFormComponent } from './authentication-register-form.component';

describe('AuthenticationRegisterFormComponent', () => {
  let component: AuthenticationRegisterFormComponent;
  let fixture: ComponentFixture<AuthenticationRegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticationRegisterFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticationRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
