import {
  BadRequestException,
  Injectable,
  NotImplementedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto, sellerId: number) {
    const orderWithItem = await this.orderRepository.findOneBy({
      itemId: createOrderDto.itemId,
    });
    if (orderWithItem)
      throw new BadRequestException(
        `Order with this item: ${createOrderDto.itemId} already exist`,
      );
    const order = this.orderRepository.create({ ...createOrderDto, sellerId });

    this.orderRepository.save(order);
  }

  findAll() {
    return this.orderRepository.find();
  }

  findOne(id: number) {
    return this.orderRepository.findOneBy({ id });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    throw new NotImplementedException('Remove method not implemented');
  }
}
