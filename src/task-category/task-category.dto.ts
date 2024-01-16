import { Expose } from "class-transformer";

export class taskCategoryDto {
  @Expose()
  id: number

  @Expose()
  title: string
}