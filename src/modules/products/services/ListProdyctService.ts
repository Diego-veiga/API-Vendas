import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRespository } from '../typeorm/respositories/ProductRespository';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productRespository = getCustomRepository(ProductRespository);

    const products = productRespository.find();

    return products;
  }
}

export default ListProductService;
