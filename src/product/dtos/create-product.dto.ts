import { Transform } from "class-transformer";
import { IsNumber, IsString, isString } from "class-validator";

export class CreateProductDto {
  @IsString()
  name: string;

  @Transform(({value}) => parseInt(value))
  @IsNumber()
  price: number
  
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  stock: number
}
