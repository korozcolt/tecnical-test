import {authenticate} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Category, Product} from '../models';
import {ProductRepository} from '../repositories';

@authenticate('jwt')
export class ProductCategoryController {
  constructor(
    @repository(ProductRepository)
    public productRepository: ProductRepository,
  ) {}

  @get('/products/{id}/category', {
    responses: {
      '200': {
        description: 'Category belonging to Product',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Category)},
          },
        },
      },
    },
  })
  async getCategory(
    @param.path.string('id') id: typeof Product.prototype.id,
  ): Promise<Category> {
    return this.productRepository.category(id);
  }
}
