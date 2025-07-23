import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';

import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { CreatePokemonDto } from './dto/create-pokemon.dto';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const newPokemon = await this.pokemonModel.create( createPokemonDto );
      return {
        message: 'Pokemon created!',
        pokemon: newPokemon
      };
      
    } catch (error) {
      this.handleExceptions( error );
    }
  }

  findAll() {
    return this.pokemonModel.find();
  }

  async findOne(value: string) {

    let pokemon: Pokemon | null = null;

    if( !isNaN( +value ) ) {
      pokemon = await this.pokemonModel.findOne({ no: value });
    }

    if( !pokemon && isValidObjectId( value )) {
      pokemon = await this.pokemonModel.findById( value );
    }

    if( !pokemon ) {
      pokemon = await this.pokemonModel.findOne({ name: value.toLowerCase().trim() });
    }

    if( !pokemon ) throw new NotFoundException('Pokemon not found');

    return pokemon;

  }

  async update(value: string, updatePokemonDto: UpdatePokemonDto) {
    
    const existPokemon = await this.findOne( value );

    if( updatePokemonDto.name ) updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

    try {
      await existPokemon.updateOne( updatePokemonDto );

      return {
        message: 'Pokemon updated successfully',
        pokemon: {
          ...existPokemon.toJSON(),
          ...updatePokemonDto
        }
      }
    } catch (error) {
      this.handleExceptions( error );
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if( deletedCount === 0 ) throw new BadRequestException(`Pokemon with id ${ id } not found`);
    return {
      message: "Pokemon delete successfully"
    };
  }

  private handleExceptions( error: any ) {
    if( error.code === 11000 ) {
      throw new BadRequestException(`Pokemon exist in db ${ JSON.stringify( error.keyValue ) }`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);
  }
}
