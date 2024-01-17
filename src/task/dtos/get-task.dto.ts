import { IsDate, IsInt, IsNumber, IsOptional, IsString } from "class-validator"
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DefaultValuePipe } from "@nestjs/common";
import { Transform } from "class-transformer";

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
  @Transform(({ value }) => parseInt(value))
  @IsInt({ message: 'Page must be an integer' })
  // @IsNumber()
  page?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt({ message: 'Page must be an integer' })
  // @IsNumber()
  pageSize?: number;
}