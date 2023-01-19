import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

nombre1 = "";
nombre2 = "";
nombre3 = "";
nombre4 = "";
nombre5 = "";
nombre6 = "";
url = null;
n = "";

update(){
    this.n = (<HTMLInputElement>document.getElementById("search_q")).value;
    this.getPokemonData(this.n)
  }

getPokemonData = async n => {

    n = n.toLowerCase();
        
    this.url = `https://pokeapi.co/api/v2/pokemon/${n}`;
    const response = await fetch(this.url)
  
    if(response.status == 404 || response.statusText == 'Not Found'){
        alert("Pokemon not found")
        return
    }
  
    const pokemon = await response.json()
    
    let valorSelect = (<HTMLSelectElement>document.getElementById("slot")).value;

    switch (valorSelect) {
        case "1": 
            this.nombre1 = pokemon.name;
            (document.getElementById("update_img1") as HTMLImageElement).src= pokemon.sprites.other.dream_world.front_default;
            break;
    
        case "2": 
            this.nombre2 = pokemon.name;
            (document.getElementById("update_img2") as HTMLImageElement).src= pokemon.sprites.other.dream_world.front_default;
            break;
    
        case "3": 
            this.nombre3 = pokemon.name;
            (document.getElementById("update_img3") as HTMLImageElement).src= pokemon.sprites.other.dream_world.front_default;
            break;
    
        case "4": 
            this.nombre4 = pokemon.name;
            (document.getElementById("update_img4") as HTMLImageElement).src= pokemon.sprites.other.dream_world.front_default;
            break;
    
        case "5": 
            this.nombre5 = pokemon.name;
            (document.getElementById("update_img5") as HTMLImageElement).src= pokemon.sprites.other.dream_world.front_default;
            break;
    
        case "6": 
            this.nombre6 = pokemon.name;
            (document.getElementById("update_img6") as HTMLImageElement).src= pokemon.sprites.other.dream_world.front_default;
            break;
    
        default: 
            break;      
    }
  
    
  }
}