import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { Product } from './product.interface';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly _productService: ProductService
  ) {}

  @Post()
  createProduct(@Body() body: CreateProductDto) {
    return this._productService.create(body)
  }
}
