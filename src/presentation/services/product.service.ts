import { ProductModel } from '../../data';
import { CreateProductDto, CustomError } from '../../domain';
import { PaginationDto } from '../../domain/dtos/shared/pagination.dto';


export class ProductService {

  constructor(){}

  async createProduct( createProductDto: CreateProductDto ){

    const productExits = await ProductModel.findOne({ name: createProductDto.name });
    if ( productExits ) throw CustomError.badRequest('Product already exists');

    try {

      const product = new ProductModel(createProductDto);

      product.save();
      return product;

    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
  }

  async getProducts(paginationDto: PaginationDto) {
    
    const { page, limit } = paginationDto;

    try {

      const [total, products] = await Promise.all([
        ProductModel.countDocuments(),
        ProductModel.find()
        .skip( (page - 1) * limit )
        .limit( limit )
        // !populate 
      ])

      return {
        page: page,
        limit: limit,
        total: total,
        next: `api/products?page=${(page+1)}&limit=${limit}`,
        prev: `api/products?page=${(page-1)}&limit=${limit}`,

        products: products,
      }
      
    } catch (error) {
      
      throw CustomError.internalServer(`${error}`)

    }
  }

}