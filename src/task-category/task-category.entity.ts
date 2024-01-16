import { Tasks } from "src/task/Tasks"
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity({name: "taskCategories"})
export class TaskCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  // @CreateDateColumn({
  //   type: "timestamp",
  //   default: () => 'CURRENT_TIMESTAMP',
  // })
  // created_at: Date;

  // @UpdateDateColumn({
  //   type: "timestamp",
  //   default: () => 'CURRENT_TIMESTAMP',
  // })
  // updated_at: Date;

  @OneToMany(() => Tasks, (Task) => Task.taskCategory)
  Tasks: Tasks[]
}
