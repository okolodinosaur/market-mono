import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from 'src/users/entities/user.entity';
import { Item } from 'src/items/entities/item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column({ default: true })
  active: boolean;

  @Column({ default: null, nullable: true })
  closeDate: Date;

  @ManyToOne(() => User, (bayer) => bayer.id, { nullable: true })
  bayer: User;
  @Column({ nullable: true })
  bayerId: number;

  @ManyToOne(() => User, (seller) => seller.id)
  seller: User;
  @Column()
  sellerId: number;

  @OneToOne(() => Item, (item) => item.id)
  @JoinColumn()
  item: Item;
  @Column()
  itemId: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}
