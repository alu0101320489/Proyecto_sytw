import { Component } from '@angular/core';

enum Types {
    steel = 0,
    water = 1,
    bug = 2,
    dragon = 3,
    electric = 4,
    ghost = 5,
    fire = 6,
    fairy = 7,
    ice = 8,
    fighting = 9,
    normal = 10,
    grass = 11,
    psychic = 12,
    rock = 13,
    dark = 14,
    ground = 15,
    poison = 16,
    flying = 17
  }

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {


    fotoA = null;
    nombreA = "";
    urlA = null;
    nA = "";
    
    statsA = [];
    totalA = null;
    widthA = [];
    tipo1A = "";
    tipo2A = "";

    fotoD = null;
    nombreD = "";
    urlD = null;
    nD = "";
    
    statsD = [];
    totalD = null;
    widthD = [];
    tipo1D = "";
    tipo2D = "";

    n = "";
    url = null;
    moveName = "";
    power = 0;
    moveType = "";
    cat = "";
    dealDamage = 0;
    
    updateD(){
      this.nD = (<HTMLInputElement>document.getElementById("search_qD")).value;
      this.getPokemonDataD(this.nD)
    }

    updateA(){
        this.nA = (<HTMLInputElement>document.getElementById("search_qA")).value;
        this.getPokemonDataA(this.nA)
      }
    
    getPokemonDataD = async nD => {

      nD = nD.toLowerCase();
          
      this.urlA = `https://pokeapi.co/api/v2/pokemon/${nD}`;
      const response = await fetch(this.urlA)
    
      if(response.status == 404 || response.statusText == 'Not Found'){
        alert("Pokemon not found")
        return
      }
    
      const pokemon = await response.json()
      
      this.totalD = 0;
      this.nombreD = pokemon.name;
      this.tipo1D =  pokemon.types[0].type.name;
      if (pokemon.types.length == 2){
        this.tipo2D = pokemon.types[1].type.name;
      }
    
      for (let i = 0; i < 6; i++) {
        this.statsD[i] = pokemon.stats[i].base_stat;
        this.totalD = this.totalD + this.statsD[i];
      }
      for(let i = 0; i < 6; i++){
        this.widthD[i] = (this.statsD[i]/70) * 100;
      }
    
      (document.getElementById("update_imgD") as HTMLImageElement).src= pokemon.sprites.other.dream_world.front_default;
      
      (document.getElementById("tipo1D") as HTMLImageElement).src= 'assets/tipos/'+this.tipo1D+'.png';
      if (this.tipo2D != ""){
        (document.getElementById("tipo2D") as HTMLImageElement).src= 'assets/tipos/'+this.tipo2D+'.png';
      } else {
        (document.getElementById("tipo2D") as HTMLImageElement).src= "";
      }
      
    
      document.getElementById('ps').style.width = this.widthD[0] + "px";
      document.getElementById('atq').style.width = this.widthD[1] + "px";
      document.getElementById('def').style.width = this.widthD[2] + "px";
      document.getElementById('atqe').style.width = this.widthD[3] + "px";
      document.getElementById('defe').style.width = this.widthD[4] + "px";
      document.getElementById('vel').style.width = this.widthD[5] + "px";
      document.getElementById('total').style.width = (this.totalD/300)* 100 + "px";
    
    }

    getPokemonDataA = async nA => {
        //document.getElementById('show_error').classList.remove('show')
        //document.getElementById('show_error').classList.add('hidden')
        nA = nA.toLowerCase();
            
        this.urlA = `https://pokeapi.co/api/v2/pokemon/${nA}`;
        const response = await fetch(this.urlA)
      
        if(response.status == 404 || response.statusText == 'Not Found'){
          alert("Pokemon not found")
          return
        }
      
        const pokemon = await response.json()
        
        this.totalA = 0;
        this.nombreA = pokemon.name;
        this.tipo1A =  pokemon.types[0].type.name;
        if (pokemon.types.length == 2){
          this.tipo2A = pokemon.types[1].type.name;
        }
      
        for (let i = 0; i < 6; i++) {
          this.statsA[i] = pokemon.stats[i].base_stat;
          this.totalA = this.totalA + this.statsA[i];
        }
        for(let i = 0; i < 6; i++){
          this.widthA[i] = (this.statsA[i]/70) * 100;
        }
      
        (document.getElementById("update_imgA") as HTMLImageElement).src= pokemon.sprites.other.dream_world.front_default;
        
        (document.getElementById("tipo1A") as HTMLImageElement).src= 'assets/tipos/'+this.tipo1A+'.png';
        if (this.tipo2A != ""){
          (document.getElementById("tipo2A") as HTMLImageElement).src= 'assets/tipos/'+this.tipo2A+'.png';
        } else {
          (document.getElementById("tipo2A") as HTMLImageElement).src= "";
        }
        
      
        document.getElementById('ps').style.width = this.widthA[0] + "px";
        document.getElementById('atq').style.width = this.widthA[1] + "px";
        document.getElementById('def').style.width = this.widthA[2] + "px";
        document.getElementById('atqe').style.width = this.widthA[3] + "px";
        document.getElementById('defe').style.width = this.widthA[4] + "px";
        document.getElementById('vel').style.width = this.widthA[5] + "px";
        document.getElementById('total').style.width = (this.totalA/300)* 100 + "px";
      
      }

      search() {
        this.n = (<HTMLInputElement>document.getElementById("search_q")).value;
        this.damage(this.n)
      }

      damage = async n => {
        n = n.toLowerCase();
          
        this.url = `https://pokeapi.co/api/v2/move/${n}`;
        const response = await fetch(this.url)
    
        if(response.status == 404 || response.statusText == 'Not Found'){
          alert("Move not found")
          return
        }
    
        const move = await response.json()

        this.moveName = move.name;
        this.power = move.power;
        this.moveType = move.type.name;
        this.cat = move.damage_class.name;

        if (this.cat === "physical") {
            this.dealDamage = 10 * this.stab(this.tipo1A, this.tipo2A, this.moveType) * 
                        this.efectividad(this.moveType, this.tipo1D) * this.efectividad(this.moveType, this.tipo2D) *
                        (((0.2 * this.statsA[1] + 1)* this.power)/(25 * this.statsD[2]) + 2) ;
        } else {
            this.dealDamage = 10 * this.stab(this.tipo1A, this.tipo2A, this.moveType) * 
                        this.efectividad(this.moveType, this.tipo1D) * this.efectividad(this.moveType, this.tipo2D) *
                        (((0.2 * this.statsA[3] + 1)* this.power)/(25 * this.statsD[4]) + 2) ;
        }
        (document.getElementById("moveType") as HTMLImageElement).src= 'assets/tipos/'+this.moveType+'.png';
      }

      stab(t1 : string, t2 : string, tm : string) {
        if (t1 === tm || t2 === tm) {
            return 1.5;
        } else {
            return 1;
        }
      }

      efectividad(firstPokeType : string, secondPokeType : string) {
        let multiplicador = 1;
        switch (firstPokeType) {
          case Types[0]:
            if (secondPokeType === Types[0] || secondPokeType === Types[1] ||
              secondPokeType === Types[4] || secondPokeType === Types[6]) {
              multiplicador = 1/2;
            } else if (secondPokeType === Types[7] || secondPokeType === Types[8] ||
              secondPokeType === Types[13]) multiplicador = 2;
            break;
    
          case Types[1]:
            if (secondPokeType === Types[1] || secondPokeType === Types[3] ||
              secondPokeType === Types[11]) multiplicador = 1/2;
            else if (secondPokeType === Types[6] || secondPokeType === Types[13] ||
              secondPokeType === Types[15]) multiplicador = 2;
            break;
    
          case Types[2]:
            if (secondPokeType === Types[0] || secondPokeType === Types[5] ||
              secondPokeType === Types[6] || secondPokeType === Types[7] ||
              secondPokeType === Types[9] || secondPokeType === Types[16] ||
              secondPokeType === Types[17]) multiplicador = 1/2;
            else if (secondPokeType === Types[11] || secondPokeType === Types[12] ||
              secondPokeType === Types[14]) multiplicador = 2;
            break;
    
          case Types[3]:
            if (secondPokeType === Types[0]) multiplicador = 1/2;
            else if (secondPokeType === Types[3]) multiplicador = 2;
            else if (secondPokeType === Types[7]) multiplicador = 0;
            break;
    
          case Types[4]:
            if (secondPokeType === Types[3] || secondPokeType === Types[4] ||
              secondPokeType === Types[11]) multiplicador = 1/2;
            else if (secondPokeType === Types[1] || secondPokeType === Types[17]) {
              multiplicador = 2;
            } else if (secondPokeType === Types[15]) multiplicador = 0;
            break;
    
          case Types[5]:
            if (secondPokeType === Types[14]) multiplicador = 1/2;
            else if (secondPokeType === Types[5] || secondPokeType === Types[12]) {
              multiplicador = 2;
            } else if (secondPokeType === Types[10]) multiplicador = 0;
            break;
    
          case Types[6]:
            if (secondPokeType === Types[1] || secondPokeType === Types[3] ||
              secondPokeType === Types[6] || secondPokeType === Types[13]) {
              multiplicador = 1/2;
            } else if (secondPokeType === Types[0] || secondPokeType === Types[2] ||
              secondPokeType === Types[8] || secondPokeType === Types[11]) {
              multiplicador = 2;
            }
            break;
    
          case Types[7]:
            if (secondPokeType === Types[0] || secondPokeType === Types[6] ||
              secondPokeType === Types[16]) multiplicador = 1/2;
            else if (secondPokeType === Types[3] || secondPokeType === Types[9] ||
              secondPokeType === Types[14]) multiplicador = 2;
            break;
    
          case Types[8]:
            if (secondPokeType === Types[0] || secondPokeType === Types[1] ||
              secondPokeType === Types[6] || secondPokeType === Types[8]) {
              multiplicador = 1/2;
            } else if (secondPokeType === Types[3] || secondPokeType ===Types[11] ||
              secondPokeType === Types[15] || secondPokeType === Types[17]) {
              multiplicador = 2;
            }
            break;
    
          case Types[9]:
            if (secondPokeType === Types[2] || secondPokeType === Types[7] ||
              secondPokeType === Types[12] || secondPokeType === Types[16] ||
              secondPokeType === Types[17]) multiplicador = 1/2;
            else if (secondPokeType === Types[0] || secondPokeType === Types[8] ||
              secondPokeType === Types[10] || secondPokeType === Types[13] ||
              secondPokeType === Types[14]) multiplicador = 2;
            else if (secondPokeType === Types[5]) multiplicador = 0;
            break;
    
          case Types[10]:
            if (secondPokeType === Types[0] || secondPokeType === Types[13]) {
              multiplicador = 1/2;
            } else if (secondPokeType === Types[5]) multiplicador = 0;
            break;
    
          case Types[11]:
            if (secondPokeType === Types[0] || secondPokeType === Types[2] ||
              secondPokeType === Types[3] || secondPokeType === Types[6] ||
              secondPokeType === Types[11] || secondPokeType === Types[16] ||
              secondPokeType === Types[17]) multiplicador = 1/2;
            else if (secondPokeType === Types[1] || secondPokeType === Types[13] ||
              secondPokeType === Types[15]) multiplicador = 2;
            break;
    
          case Types[12]:
            if (secondPokeType === Types[0] || secondPokeType === Types[12]) {
              multiplicador = 1/2;
            } else if (secondPokeType === Types[9] || secondPokeType ===Types[16]) {
              multiplicador = 2;
            } else if (secondPokeType === Types[14]) multiplicador = 0;
            break;
    
          case Types[13]:
            if (secondPokeType === Types[0] || secondPokeType === Types[9] ||
              secondPokeType === Types[15]) multiplicador = 1/2;
            else if (secondPokeType === Types[2] || secondPokeType === Types[6] ||
              secondPokeType === Types[8] || secondPokeType === Types[17]) {
              multiplicador = 2;
            }
            break;
    
          case Types[14]:
            if (secondPokeType === Types[7] || secondPokeType === Types[9] ||
              secondPokeType === Types[14]) multiplicador = 1/2;
            else if (secondPokeType === Types[5] || secondPokeType === Types[12]) {
              multiplicador = 2;
            }
            break;
    
          case Types[15]:
            if (secondPokeType === Types[2] || secondPokeType === Types[11]) {
              multiplicador = 1/2;
            } else if (secondPokeType === Types[0] || secondPokeType === Types[4] ||
              secondPokeType === Types[6] || secondPokeType === Types[13] ||
              secondPokeType === Types[16]) multiplicador = 2;
            else if (secondPokeType === Types[17]) multiplicador = 0;
            break;
    
          case Types[16]:
            if (secondPokeType === Types[5] || secondPokeType === Types[13] ||
              secondPokeType === Types[15] || secondPokeType === Types[16]) {
              multiplicador = 1/2;
            } else if (secondPokeType === Types[7] || secondPokeType ===Types[11]) {
              multiplicador = 2;
            } else if (secondPokeType === Types[0]) multiplicador = 0;
            break;
    
          case Types[17]:
            if (secondPokeType === Types[0] || secondPokeType === Types[4] ||
              secondPokeType === Types[13]) multiplicador = 1/2;
            else if (secondPokeType === Types[2] || secondPokeType === Types[9] ||
              secondPokeType === Types[11]) multiplicador = 2;
            break;
        }
        return multiplicador;
      }
}