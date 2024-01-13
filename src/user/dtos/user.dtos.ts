import { Expose, Transform } from "class-transformer"

export class UserDto {
  @Expose()
  id: number
  
  @Expose()
  name: string
  
  @Expose()
  email: string
  
  @Expose()
  created_at: Date
  
  @Expose()
  // @Transform(value => value instanceof Date ? value.toISOString().replace('T', ' ').replace('Z', '') : value)

  updated_at: Date
}