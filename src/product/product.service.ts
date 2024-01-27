import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { Product } from './product.interface';

@Injectable()
export class ProductService{
  constructor(
    @InjectRepository(ProductEntity) private readonly repo: Repository<ProductEntity>
  ) {}

  create(body: CreateProductDto) {
    const product = this.repo.create(body)
    return this.repo.save(product)
  }

  finOne(id: number) {
    return this.repo.findOne({where: {
      id: id
    }})
  }
}