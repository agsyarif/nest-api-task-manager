import { Exclude } from "class-transformer"
import { TaskCategoryEntity } from "src/task-category/task-category.entity"
import { Users } from "src/user/User"
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Tasks {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  status: string

  @Column()
  deadline: "timestamp"

  @CreateDateColumn({
    type: "timestamp",
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @ManyToOne(() => Users, (User) => User.Tasks)
  user: Users;

  @ManyToOne(() => TaskCategoryEntity, (TaskCategoryEntity) => TaskCategoryEntity.Tasks)
  taskCategory: TaskCategoryEntity
}
