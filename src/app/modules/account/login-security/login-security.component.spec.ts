import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSecurityComponent } from './login-security.component';

describe('LoginSecurityComponent', () => {
  let component: LoginSecurityComponent;
  let fixture: ComponentFixture<LoginSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginSecurityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
