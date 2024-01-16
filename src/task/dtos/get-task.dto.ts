import { IsDate, IsNumber, IsOptional, IsString } from "class-validator"
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

type SortOrder = "DESC" | "ASC";
export class GetTaskDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  q: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  status: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  deadline: "timestamp"

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sort_dir: SortOrder

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sort_field: string

  @ApiPropertyOptional()
  @IsOptional()
  // @IsNumber()
  page?: number;

  @ApiPropertyOptional()
  @IsOptional()
  // @IsNumber()
  pageSize?: number;
}