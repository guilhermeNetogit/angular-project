import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

interface Pokemon {
  value: string;
  viewValue: string;
}

interface PokemonGroup {
  disabled?: boolean;
  name: string;
  pokemon: Pokemon[];
}

@Component({
  selector: 'app-segundo',
  standalone: true,
  imports: [MatSelectModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './segundo.html',
  styleUrls: ['./segundo.scss'],
})
export class SegundoComponent {
  pokemonControl = new FormControl('none');
  pokemonGroups: PokemonGroup[] = [
    {
      name: 'Grass',
      pokemon: [
        { value: '1', viewValue: 'Bulbasaur' },
        { value: '43', viewValue: 'Oddish' },
        { value: '69', viewValue: 'Bellsprout' },
      ],
    },
    {
      name: 'Water',
      pokemon: [
        { value: '7', viewValue: 'Squirtle' },
        { value: '54', viewValue: 'Psyduck' },
        { value: '116', viewValue: 'Horsea' },
        { value: '230', viewValue: 'Kindra' },
        { value: '748', viewValue: 'Toxapex' },
      ],
    },
    {
      name: 'Fire',
      disabled: true,
      pokemon: [
        { value: '4', viewValue: 'Charmander' },
        { value: '37', viewValue: 'Vulpix' },
        { value: '136', viewValue: 'Flareon' },
        { value: '6', viewValue: 'Charizard' },
      ],
    },
    {
      name: 'Psychic',
      pokemon: [
        { value: '65', viewValue: 'Alakazam' },
        { value: '151', viewValue: 'Mew' },
        { value: '150', viewValue: 'Mewtwo' },
        { value: '178', viewValue: 'Xato' },
      ],
    },
    {
      name: 'Eletric',
      pokemon: [
        { value: '25', viewValue: 'Pikachu' },
        { value: '82', viewValue: 'Magneton' },
        { value: '100', viewValue: 'Voltorb' },
        { value: '145', viewValue: 'Zapdos' },
      ],
    },
  ];

  // Retorna o objeto do pokemon e do grupo selecionado
  get selecaoAtual() {
    const id = this.pokemonControl.value;
    if (!id || id === 'none') return null;

    for (const group of this.pokemonGroups) {
      const pokemon = group.pokemon.find((p) => p.value === id);
      if (pokemon) {
        return { pokemon, groupName: group.name.toLowerCase(), groupType: group.name };
      }
    }
    return null;
  }

  // URL da Imagem em HD
  get imagemPokemonAtual(): string {
    const id = this.pokemonControl.value;
    if (!id || id === 'none') {
      return 'assets/pokemon-logo.png';
    }

    const idPokedexFormatado = id.padStart(3, '0');
    return `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${idPokedexFormatado}.png`;
  }

  cursoAngular: boolean = true;
  getValor() {
    return 2 ** 3;
  }
  getCurtir() {
    return true;
  }
  urlImg = 'https://picsum.photos/id/237/200/300';
  urlImg2 = 'https://picsum.photos/id/15/200/300';
  urlImg3 = 'https://picsum.photos/id/17/200/300';
}
