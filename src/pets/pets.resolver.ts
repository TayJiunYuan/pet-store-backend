import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './pet.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { Owner } from 'src/owners/entities/owner.entity';

@Resolver(of => Pet)  //specify what class this resolver is for 
export class PetsResolver {
  constructor(private petsService: PetsService) {} //nest will create and instance of petsService and inject it 

  @Query(returns => [Pet])  //specify the return type
  pets(): Promise<Pet[]> {
    return this.petsService.findAll();
  }

  @Query(returns => Pet)
  getPet(@Args('id', {type: ()=> Int}) id: number): Promise<Pet>{  //why does all these return a promise of pet instead of pet
    return this.petsService.findOne(id);
  } 

  @ResolveField (returns => Owner)    //resolve the owner field for pet
  owner(@Parent() pet: Pet): Promise<Owner> {     //reference to the parent of the owner field, which is the pet
    return this.petsService.getOwner(pet.ownerId)
  }

  @Mutation(returns => Pet)
  createPet(@Args('createPetInput')createPetInput: CreatePetInput) : Promise<Pet> {  //create pet mutation. @Args gives the name for the argument, how to @Args multiple arguments tho?
    return this.petsService.createPet(createPetInput)
  }
}
