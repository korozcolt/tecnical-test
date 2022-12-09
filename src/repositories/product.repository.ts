import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PgsqlDataSource} from '../datasources';
import {Product, ProductRelations, Company, Category} from '../models';
import {CompanyRepository} from './company.repository';
import {CategoryRepository} from './category.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id,
  ProductRelations
> {

  public readonly company: BelongsToAccessor<Company, typeof Product.prototype.id>;

  public readonly category: BelongsToAccessor<Category, typeof Product.prototype.id>;

  constructor(
    @inject('datasources.pgsql') dataSource: PgsqlDataSource, @repository.getter('CompanyRepository') protected companyRepositoryGetter: Getter<CompanyRepository>, @repository.getter('CategoryRepository') protected categoryRepositoryGetter: Getter<CategoryRepository>,
  ) {
    super(Product, dataSource);
    this.category = this.createBelongsToAccessorFor('category', categoryRepositoryGetter,);
    this.registerInclusionResolver('category', this.category.inclusionResolver);
    this.company = this.createBelongsToAccessorFor('company', companyRepositoryGetter,);
  }
}
