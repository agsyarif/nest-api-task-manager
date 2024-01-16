import { IsNotEmpty, IsString } from "class-validator";

export class CreateTaskCategoryDto {
  @IsNotEmpty()
  @IsString()
  title: string
}