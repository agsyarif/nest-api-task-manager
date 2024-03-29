import { Transform, TransformFnParams } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsString()
  status: string

  // @IsOptional()
  // @IsDate()
  // deadline: "timestamp"

  @IsOptional()
  @IsDate()
  @Transform(({ value }: TransformFnParams) => new Date(value))
  deadline: "timestamp";

  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => parseInt(value))
  taskCategoryId: number  
}