

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [CalculatorComponent],
   //   providers: [AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;

  }));

  it('should create the calculator component', () => {
    expect(component).toBeTruthy();
  });

  it('Debería actualizar el valor de n[0] con el valor del elemento HTML', () => {

    const element = document.createElement('input');
    element.id = 'search_q';
    element.value = 'Pikachu';

    document.body.appendChild(element);

    component.updateA();

    expect(component.n[0]).toBe('Pikachu');

  });

  it('Debería actualizar el valor de n[0] con el valor del elemento HTML', () => {

    const element = document.createElement('input');
    element.id = 'search_q';
    element.value = 'Pikachu';

    document.body.appendChild(element);

    component.updateD();

    expect(component.n[0]).toBe('Pikachu');

  });

  it('Debería llamar a la función getPokemonData con el valor de n', () => {

    const spy = spyOn(component, 'getPokemonDataA');    
    //creamos un espía para verificar si se llama a la función getPokemonData con el parámetro n correcto   
    const element = document.createElement('input');   
    element.id = 'search_q';  
    element.value = 'Pikachu';   
    document.body.appendChild(element);  
    component.updateA();   
    expect(spy).toHaveBeenCalledWith(['Pikachu']);
   });

   it('Debería llamar a la función getPokemonData con el valor de n', () => {

    const spy = spyOn(component, 'getPokemonDataD');    
    //creamos un espía para verificar si se llama a la función getPokemonData con el parámetro n correcto   
    const element = document.createElement('input');   
    element.id = 'search_q';  
    element.value = 'Pikachu';   
    document.body.appendChild(element);  
    component.updateD();   
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


it('should call the authService.cal_dmg correctly', () => {
  const spy = spyOn(component.authService, 'cal_dmg').and.callThrough();

  component.calculate();

  expect(spy).toHaveBeenCalledWith(component.tipo1A, component.tipo2A, component.tipo1D, component.tipo2D, component.power,component.moveType, component.statsA, component.statsD, component.cat);
});



    it('should set the correct URL', () => {
        const n = 'fire-blast';
        const expectedURL = `https://pokeapi.co/api/v2/move/${n}`;

        component.damage(n);

        expect(component.url).toBe(expectedURL);
    });
    
    it('should show an alert when the move does not exist', async () => {
        const n = 'non-existent-move';

        spyOn(window, 'alert');

        await component.damage(n);

        expect(window.alert).toHaveBeenCalledWith('Move not found');
    });
    
    it('should get the move name correctly', async () => {
        const n = 'fire-blast';

        await component.damage(n);

        expect(component.moveName).toBe('Fire Blast');   // or whatever the name of the move is supposed to be 
    });

});