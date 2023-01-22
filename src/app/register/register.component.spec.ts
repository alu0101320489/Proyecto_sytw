import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../_services/auth.service';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test 1
  it('should call the register method', () => {
    const authServiceSpy = spyOn(component.authService, 'register').and.callThrough();

    component.register();

    expect(authServiceSpy).toHaveBeenCalled();
  });

  // Test 2
  it('should log the user', () => {
    const consoleSpy = spyOn(console, 'log');

    component.register();

    expect(consoleSpy).toHaveBeenCalledWith(component.user);
  });

  // Test 3
  it('should navigate to the login page', () => {
    const routerSpy = spyOn(component.router, 'navigate');

    component.register();

    expect(routerSpy).toHaveBeenCalledWith(['/login']);
  });
});
