import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Owner } from "src/owners/entities/owner.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"

//decorators to tell the schema what this object type is
//additional decorators for typeorm database

@Entity()  //decorator for typeorm to let it know that this is a database entity
@ObjectType()
export class Pet {
  @PrimaryGeneratedColumn() //typeorm
  @Field(type => Int)
  id: number;

  @Column() //typeorm
  @Field()
  name: string;

  @Column() //typeorm
  @Field(type => Int)
  ownerId: number;

  @Column({nullable: true}) //typeorm
  @Field({nullable: true})
  type?: string;


  @ManyToOne(()=> Owner, owner => owner.pets)   //relationship from pet to owner
  @Field(type => Owner)
  owner: Owner;

 }

