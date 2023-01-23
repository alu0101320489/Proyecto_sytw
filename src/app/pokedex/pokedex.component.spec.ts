import { ComponentFixture, TestBed,  } from '@angular/core/testing';
import { PokedexComponent } from './pokedex.component';
import { expect } from '@jest/globals';

describe('PokedexComponent', () => {
  let component: PokedexComponent;
  let fixture: ComponentFixture<PokedexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokedexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokedexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
});
