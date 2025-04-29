import { Item } from 'src/items/entities/item.entity';
import { Order } from 'src/orders/entities/order.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  username: string;

  @Column({ default: 0 })
  balance: number;

  @Column({ default: 'old_test_user_to_delete' })
  passwordHash: string;

  @OneToMany(() => Item, (item) => item.owner, { nullable: true })
  items: Item[];

  @OneToMany(() => Order, (order) => order.seller, { nullable: true })
  ordersToSell: Order[];

  @OneToMany(() => Order, (order) => order.bayer, { nullable: true })
  ordersToBay: Order[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
