import AppError from '@shared/errors/AppErros';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRespository } from '../typeorm/respositories/ProductRespository';

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productRepository = getCustomRepository(ProductRespository);

    const product = await productRepository.findOne(id);
    if (!product) {
      throw new AppError('Product not found');
    }
    await productRepository.remove(product);
  }
}
export default DeleteProductService;
