import {/* inject, */ BindingScope, injectable, Provider} from '@loopback/core';
import {Filter, repository} from '@loopback/repository';
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
    const productExists = await this.productRepository.findOne({
      where: {
        or: [
          {
            code: product.code,
          },
          {
            name: product.name,
          },
        ],
      },
    });

    if (productExists) {
      throw new Error('Product already exists');
    }

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

  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.find({
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

  async findProductsByCategory(categoryId: string): Promise<Product[]> {
    const products = await this.productRepository.find({
      where: {
        categoryId: categoryId,
      },
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
    });

    return products;
  }

  async findProductsByCompany(companyId: string): Promise<Product[]> {
    const products = await this.productRepository.find({
      where: {
        companyId: companyId,
      },
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
    });

    return products;
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
