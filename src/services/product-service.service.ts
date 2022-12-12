import {/* inject, */ BindingScope, injectable, Provider} from '@loopback/core';
import {Count, Filter, repository, Where} from '@loopback/repository';
import {Product} from '../models';
import {ProductRepository} from '../repositories';

export type ProductService = unknown;

@injectable({scope: BindingScope.TRANSIENT})
export class ProductServiceProvider implements Provider<ProductService> {
  constructor(
    @repository(ProductRepository)
    public productRepository: ProductRepository,
  ) {}

  value() {
    return this;
  }

  async create(product: Product): Promise<Product> {
    const newProduct = await this.productRepository.create(product);

    return newProduct;
  }

  async find(filter?: Filter<Product>): Promise<Product[]> {
    const products = await this.productRepository.find(
      filter
        ? filter
        : {
            include: [
              {
                relation: 'category',
              },
              {
                relation: 'company',
              },
            ],
          },
    );

    return products;
  }

  async findProductsByCategoryActive(
    filter?: Filter<Product>,
  ): Promise<Product[]> {
    const products = await this.productRepository.find(
      filter
        ? filter
        : {
            include: [
              {
                relation: 'category',
                scope: {
                  where: {
                    isActive: true,
                  },
                },
              },
              {
                relation: 'company',
              },
            ],
          },
    );

    return products;
  }

  async findById(id: string, filter?: Filter<Product>): Promise<Product> {
    const product = await this.productRepository.findById(
      id,
      filter
        ? filter
        : {
            include: [
              {
                relation: 'category',
              },
              {
                relation: 'company',
              },
            ],
          },
    );

    return product;
  }

  async findByCategory(categoryId: string): Promise<Product[]> {
    const products = await this.productRepository.find({
      where: {
        categoryId: categoryId,
      },
      include: [
        {
          relation: 'category',
        },
        {
          relation: 'company',
        },
      ],
    });

    return products;
  }

  async findByCompany(companyId: string): Promise<Product[]> {
    const products = await this.productRepository.find({
      where: {
        companyId: companyId,
      },
      include: [
        {
          relation: 'category',
        },
        {
          relation: 'company',
        },
      ],
    });

    return products;
  }

  async updateAll(product: Product, where?: Where<Product>): Promise<Count> {
    const updatedProducts = await this.productRepository.updateAll(
      product,
      where,
    );

    return updatedProducts;
  }

  async updateById(id: string, product: Product): Promise<void> {
    await this.productRepository.updateById(id, product);
  }

  async replaceById(id: string, product: Product): Promise<void> {
    await this.productRepository.replaceById(id, product);
  }

  async deleteById(id: string): Promise<void> {
    await this.productRepository.deleteById(id);
  }
}
