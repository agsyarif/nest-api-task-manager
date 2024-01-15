import { Expose, Transform, Type, plainToClass } from "class-transformer"
import { format } from "date-fns"
import * as dayjs from 'dayjs';
import { UserDto } from "src/user/dtos/user.dto"
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone')

export class TaskDto {
  @Expose()
  id: number
  
  @Expose()
  title: string
  
  @Expose()
  description: string
  
  @Expose()
  status: string
  
  @Transform(({value}) => {
    if(!value){
      return null
    }
    return format(value, "Y-MM-d H:m:s");
  })
  @Expose()
  deadline: string
  
  @Transform(({value}) => {
    return format(value, "Y-MM-d H:m:s");
  })
  @Expose()
  created_at: Date;
  
  @Transform(({value}) => {
    // menggunakan method format dari date-fns
    const date = format(value, "Y-MM-d h:m:s");

    // menggunakan dayjs
    const datetime = dayjs(value).format('YYYY-MM-DD h:m:s');

    return date;
    
  })
  @Expose()
  updated_at: Date

  @Transform(({ obj }) => {
    return plainToClass(UserDto, obj.user, { excludeExtraneousValues: true });
  })
  @Expose()
  user: UserDto;
}