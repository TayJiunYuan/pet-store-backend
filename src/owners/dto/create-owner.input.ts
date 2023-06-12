import { InputType, Int, Field } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';

@InputType()
export class CreateOwnerInput {
  @IsAlpha() //validation pipe ie. throw Bad Req Exception if name is not Alphabetic
  @Field()
  name: string;

}
