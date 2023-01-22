import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

it('Debería llamar al método de autenticación', () => {
  const authServiceSpy = spyOn(component.authService, 'login');
  component.login();
  expect(authServiceSpy).toHaveBeenCalled();
});

it('Debería guardar las cookies correctamente', () => {
  const res = {id: 1, token: '123456', nombre: 'John Doe', equipo: 'Equipo A'};

  document.cookie = "id=" + res.id+";";
  document.cookie = "token=" + res.token+";";
  document.cookie = "username=" + res.nombre+";";
  document.cookie = "team=" + res.equipo+";";

  let cookies = document.cookie.split(';');

  expect(cookies[0]).toEqual('id=1');   // id=1;
  expect(cookies[1]).toEqual('token=123456');   // token=123456;
  expect(cookies[2]).toEqual('username=John Doe');   // username=John Doe;
  expect(cookies[3]).toEqual('team=Equipo A');   // team=Equipo A;  
});
});
