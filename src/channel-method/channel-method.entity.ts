import { ChannelEntity } from 'src/channel/channel.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({name: "channelMethod"})
export class ChannelMethodEntity {
  @PrimaryGeneratedColumn()
  channelMethodId: number

  @Column()
  channelMethodName: string

  @Column()
  bankCode: string

  @Column()
  channelMethodCategory: string

  @Column()
  adminFee: number

  @Column()
  inActive: boolean

  @Column()
  imageUrl: string

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

  // @ManyToOne(() => ChannelEntity, (channel) => channel.channelMethod, {
  //   eager: true,
  //   lazy: false,
  //   cascade: true,
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  //   orphanedRowAction: 'delete',
  // })
  // channel: any

  @ManyToOne(() => ChannelEntity, (ChannelEntity) => ChannelEntity.channelMethod)
  @JoinColumn({name: 'channelId'})
  channel: ChannelEntity

//   @ManyToOne(()=> ChannelEntity, channel => channel.channelId)
//   @JoinColumn({name: 'channelId',})
//   channel: ChannelEntity;
}
