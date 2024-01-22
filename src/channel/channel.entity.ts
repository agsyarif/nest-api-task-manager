import { ChannelMethodEntity } from 'src/channel-method/channel-method.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({name: "channel"})
export class ChannelEntity {
  @PrimaryGeneratedColumn()
  channelId: number

  @Column()
  name: string

  @Column()
  notes: string

  @CreateDateColumn({
    name: 'createdAt',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string

  @UpdateDateColumn({
    name: 'updatedAt',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: string

  // @OneToMany(() => ChannelMethodEntity, (channelMethod) => channelMethod.channel, {
  //   eager: false,
  //   lazy: false,
  //   cascade: true,
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  // orphanedRowAction: 'delete',
  // })
  // channelMethod: []

  @OneToMany(() => ChannelMethodEntity, (channelMethod) => channelMethod.channel)
  channelMethod: ChannelMethodEntity[]
  
}
