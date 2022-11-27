import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyecto';

foto = null;
nombre = "";
url = null;
n = "";

update(){
  this.n = (<HTMLInputElement>document.getElementById("search_q")).value;
  this.getPokemonData(this.n)
}

getPokemonData = async n => {
  //document.getElementById('show_error').classList.remove('show')
  //document.getElementById('show_error').classList.add('hidden')
      
  this.url = `https://pokeapi.co/api/v2/pokemon/${n}`;
  const response = await fetch(this.url)

  if(response.status == 404 || response.statusText == 'Not Found'){
      //document.getElementById('show_error').classList.add('show')
      //document.getElementById('show_error').classList.remove('hidden')
      return
  }

  const pokemon = await response.json()
  //debugger
  this.nombre = pokemon.name;
  (document.getElementById("update_img") as HTMLImageElement).src= pokemon.sprites.other.dream_world.front_default;
  console.log(pokemon.sprites.other.dream_world.front_default)
  
}
//search_btn.addEventListener('click', () => getPokemonData(search_term.value))

}
