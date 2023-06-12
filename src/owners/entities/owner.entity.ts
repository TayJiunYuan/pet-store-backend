import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { Pet } from '../../pets/pet.entity';

@Entity()
@ObjectType()
export class Owner {
  @PrimaryGeneratedColumn() //typeorm
  @Field(type => Int)
  id: number;

  @Column() //typeorm
  @Field()
  name: string;

  @OneToMany(()=> Pet, pet => pet.owner)  //relationship from owner to pet
  @Field(type => [Pet], {nullable: true})
  pets? : Pet[]
}

