import { IsDate, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from "class-validator"
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
  @ValidateIf((obj) => obj.page !== undefined)
  @Transform(({ value }) => parseInt(value))
  @IsInt({ message: 'Page must be an integer' })
  @IsNotEmpty({ message: 'PageSize is required when Page is provided' })
  // @IsNumber()
  pageSize?: number;
}