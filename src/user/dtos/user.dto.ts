import { Expose, Transform, plainToClass } from "class-transformer"
import { format } from "date-fns"
import { TaskDto } from "src/task/dtos/task.dto"

export class UserDto {
  @Expose()
  id: number
  
  @Expose()
  name: string
  
  @Expose()
  email: string
  
  @Transform(({value}) => {
    return format(value, "Y-MM-d h:m:s");
  })
  @Expose()
  created_at: Date

  @Transform(({value}) => {
    return format(value, "Y-MM-d h:m:s");
  })
  @Expose() 
  updated_at: Date

  @Transform(({ obj }) => {
    console.log( obj );
    return plainToClass(UserDto, obj.tasks, { excludeExtraneousValues: true });
    
  })
  @Expose()
  tasks: TaskDto
}