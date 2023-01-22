import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

it('Debe devolver un mensaje de error si no hay equipo', () => {
    document.cookie = "team=";
    component.load_team();
    expect(console.log).toHaveBeenCalledWith("No tienes equipo");
});

it('Debe llamar a la función getPokemonData con los parámetros correctos', () => {
    document.cookie = "team=1,2,3";
    let spy = spyOn(component.load_team.prototype, 'getPokemonData');

    component.load_team();

    expect(spy).toHaveBeenCalledWith(["1","1"]);  // Primer pokemon en el equipo 
    expect(spy).toHaveBeenCalledWith(["2","2"]);  // Segundo pokemon en el equipo 
    expect(spy).toHaveBeenCalledWith(["3","3"]);  // Tercer pokemon en el equipo 
});
it('Debería actualizar el valor de n[0] con el valor del elemento HTML', () => {

    const element = document.createElement('input');
    element.id = 'search_q';
    element.value = 'Pikachu';

    document.body.appendChild(element);

    component.update();

    expect(component.n[0]).toBe('Pikachu');

  });

  it('Debería llamar a la función getPokemonData con el valor de n', () => {

   const spy = spyOn(component, 'getPokemonData');    
   //creamos un espía para verificar si se llama a la función getPokemonData con el parámetro n correcto   
   const element = document.createElement('input');   
   element.id = 'search_q';  
   element.value = 'Pikachu';   
   document.body.appendChild(element);  
   component.update();   
   expect(spy).toHaveBeenCalledWith(['Pikachu']);
  });

it('Debería obtener el ID del usuario a partir de las cookies', () => {
    let cookies = document.cookie.split(';');
    let id = cookies.find(cookie => cookie.startsWith(" id="));

    expect(id).toBeDefined();
});

it('Debería obtener el equipo del usuario', () => {
    let team = [component.nombre1, component.nombre2, component.nombre3, component.nombre4, component.nombre5, component.nombre6];

    expect(team).toBeDefined();
});

it('Debe devolver un error cuando el pokemon no existe', async () => {
    const n = ['pikachu', 'none'];
    const response = await fetch(component.url);
    expect(response.status).toBe(404);
});

it('Debe devolver el nombre del pokemon correcto', async () => {
    const n = ['pikachu', 'none'];
    const response = await fetch(component.url);
    const pokemon = await response.json(); 
    expect(pokemon.name).toBe('pikachu'); 
}); 

it('Debe devolver la imagen del pokemon correcta', async () => { 
    const n = ['pikachu', 'none']; 
    const response = await fetch(component.url);
    const pokemon = await response.json(); 
    
    (document.getElementById("update_img1") as HTMLImageElement).src= pokemon.sprites.other.dream_world.front_default;

    expect((document.getElementById("update_img1") as HTMLImageElement).src).toBe(pokemon.sprites.other.dream_world.front_default); 
});
})