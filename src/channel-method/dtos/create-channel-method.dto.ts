import { Transform } from "class-transformer"
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateChannelMethodDto {

  @IsString()
  @IsNotEmpty()
  channelMethodName: string

  @IsString()
  @IsNotEmpty()
  bankCode: string

  @IsString()
  @IsNotEmpty()
  channelMethodCategory: string

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsNotEmpty()
  adminFee: number

  @IsBoolean()
  inActive: boolean

  @IsString()
  imageUrl: string

  @IsNumber()
  channelId: number

}