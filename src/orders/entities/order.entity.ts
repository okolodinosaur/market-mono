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

  @Column()
  active: true;

  @Column({ default: null, nullable: true })
  closeDate: Date;

  @ManyToOne(() => User, (bayer) => bayer.id)
  bayer: User;

  @ManyToOne(() => User, (seller) => seller.id)
  seller: User;

  @OneToOne(() => Item, (item) => item.id)
  @JoinColumn()
  item: Item;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}
