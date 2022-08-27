import { ProductRespository } from './../typeorm/respositories/ProductRespository';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppErros';
import Product from '../typeorm/entities/Product';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}
class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRespository);
    const productExist = await productsRepository.findByName(name);
    if (productExist) {
      throw new AppError('There is already one product with this name');
    }
    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    await productsRepository.save(product);
    return product;
  }
}

export default CreateProductService;
