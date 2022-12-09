import {authenticate} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Company, Product} from '../models';
import {ProductRepository} from '../repositories';

@authenticate('jwt')
export class ProductCompanyController {
  constructor(
    @repository(ProductRepository)
    public productRepository: ProductRepository,
  ) {}

  @get('/products/{id}/company', {
    responses: {
      '200': {
        description: 'Company belonging to Product',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Company)},
          },
        },
      },
    },
  })
  async getCompany(
    @param.path.string('id') id: typeof Product.prototype.id,
  ): Promise<Company> {
    return this.productRepository.company(id);
  }
}
