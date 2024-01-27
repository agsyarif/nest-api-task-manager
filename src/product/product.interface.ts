import { CreateProductDto } from "./dtos/create-product.dto";
import { ProductEntity } from "./product.entity";

export interface Product {
  create(body: CreateProductDto): ProductEntity
}
