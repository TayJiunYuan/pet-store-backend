import { Injectable,  } from '@nestjs/common';
import { Pet } from './pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { OwnersService } from 'src/owners/owners.service';
import { Owner } from 'src/owners/entities/owner.entity';


@Injectable()  //injected into the resolver
export class PetsService {
  constructor(@InjectRepository(Pet) private petsRepository: Repository<Pet>, private ownersService: OwnersService) {}  //typeorm: communication to database, import ownersService from owners

  createPet(createPetInput: CreatePetInput): Promise<Pet>{ //create pet function
    const newPet = this.petsRepository.create(createPetInput); //create new pet
    return this.petsRepository.save(newPet); //typeorm: insert into database
}

  async findAll(): Promise<Pet[]>{    //find function what returns promise of a pet
    return this.petsRepository.find();
  }

  findOne(petID: number): Promise<Pet>{
    return this.petsRepository.findOneOrFail({where: {id: petID}});
  }

  getOwner(ownerId: number): Promise<Owner>{
    return this.ownersService.findOne(ownerId);
  }

}


