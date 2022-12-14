import AppError from '@shared/errors/AppErros';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRespository } from '../typeorm/respositories/ProductRespository';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRespository);

    const product = await productRepository.findOne(id);
    if (!product) {
      throw new AppError('Product not found');
    }
    const productExist = await productRepository.findByName(name);
    if (productExist && name !== product.name) {
      throw new AppError('There is already one product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productRepository.save(product);
    return product;
  }
}
export default UpdateProductService;
