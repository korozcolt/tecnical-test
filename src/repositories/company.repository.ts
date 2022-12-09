import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {PgsqlDataSource} from '../datasources';
import {Company, CompanyRelations, Product} from '../models';
import {ProductRepository} from './product.repository';

export class CompanyRepository extends DefaultCrudRepository<
  Company,
  typeof Company.prototype.id,
  CompanyRelations
> {
  public readonly products: HasManyRepositoryFactory<
    Product,
    typeof Company.prototype.id
  >;

  constructor(
    @inject('datasources.pgsql') dataSource: PgsqlDataSource,
    @repository.getter('ProductRepository')
    protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(Company, dataSource);
    this.products = this.createHasManyRepositoryFactoryFor(
      'products',
      productRepositoryGetter,
    );
    this.registerInclusionResolver('products', this.products.inclusionResolver);
  }
}
