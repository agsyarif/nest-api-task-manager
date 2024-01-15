import { IsDate, IsOptional, IsString } from "class-validator"

type SortOrder = "DESC" | "ASC";
export class GetTaskDto {
  @IsOptional()
  @IsString()
  q: string

  @IsOptional()
  @IsString()
  status: string

  @IsOptional()
  @IsDate()
  deadline: "timestamp"

  @IsOptional()
  @IsString()
  sort_dir: SortOrder

  @IsOptional()
  @IsString()
  sort_field: string
}