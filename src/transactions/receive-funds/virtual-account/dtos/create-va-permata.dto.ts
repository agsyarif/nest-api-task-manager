import { IsNotEmpty, ValidateIf } from "class-validator"

export class CreateVaPermataDto {
  @IsNotEmpty()
  expired: Date

  @IsNotEmpty()
  @ValidateIf((value) => value >= 9999)
  amount: number
  
  @IsNotEmpty()
  customer_id: number
  
  @IsNotEmpty()
  partner_reff: number 
  
  @IsNotEmpty()
  customer_phone: number

  @IsNotEmpty()
  customer_name: number
  
  @IsNotEmpty()
  customer_email: string
  
  @IsNotEmpty()
  username: string
  
  @IsNotEmpty()
  pin: string
  
  @IsNotEmpty()
  url_callback: string

}
