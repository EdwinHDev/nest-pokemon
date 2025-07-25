import { Injectable } from '@nestjs/common';
import { PokemonResponse } from './interfaces/pokemon-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter
  ) { }

  async runSeed() {

    await this.pokemonModel.deleteMany();

    const response = await this.http.get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon?limit=1000');
    
    const pokemonToInsert: {name: string, no: number}[] = [];

    const pokemonList = response.results.map(async pokemon => {
      pokemonToInsert.push({
        no: Number(pokemon.url.split("/")[6]),
        name: pokemon.name
      })
    })

    await this.pokemonModel.insertMany( pokemonToInsert );

    return {
      message: "Seed executed"
    }
  }
}
