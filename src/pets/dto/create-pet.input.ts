import { Field, InputType, Int } from "@nestjs/graphql"
import { IsAlpha } from "class-validator";
@InputType() //telling graphql that this is input type
export class CreatePetInput {
  @IsAlpha() //validation pipe ie. throw Bad Req Exception if name is not Alphabetic
  @Field()
  name: string;

  @Field({nullable: true})
  type?: string;

  @Field(type => Int, {nullable: false})
  ownerId: number;
}