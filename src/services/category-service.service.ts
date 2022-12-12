import {BindingScope, injectable, Provider} from '@loopback/core';
import {Count, Filter, repository, Where} from '@loopback/repository';
import {Category} from '../models';
import {CategoryRepository} from '../repositories';

/*
 * Fix the service type. Possible options can be:
 * - import {CategoryService} from 'your-module';
 * - export type CategoryService = string;
 * - export interface CategoryService {}
 */
export type CategoryService = unknown;

@injectable({scope: BindingScope.TRANSIENT})
export class CategoryServiceProvider implements Provider<CategoryService> {
  constructor(
    @repository(CategoryRepository)
    public categoryRepository: CategoryRepository,
  ) {}

  value() {
    return this;
  }

  //create a new category and check if code and name already exists
  async create(category: Category): Promise<Category> {
    const categoryExists = await this.categoryRepository.findOne({
      where: {
        or: [
          {
            code: category.code,
          },
          {
            name: category.name,
          },
        ],
      },
    });

    if (categoryExists) {
      throw new Error('Category already exists');
    }

    const newCategory = await this.categoryRepository.create(category);

    return newCategory;
  }

  async find(filter?: Filter<Category>): Promise<Category[]> {
    const categories = await this.categoryRepository.find(
      filter
        ? filter
        : {
            include: [
              {
                relation: 'products',
              },
            ],
          },
    );

    return categories;
  }

  async findById(id: string, filter?: Filter<Category>): Promise<Category> {
    const category = await this.categoryRepository.findById(
      id,
      filter
        ? filter
        : {
            include: [
              {
                relation: 'products',
              },
            ],
          },
    );

    return category;
  }

  async findActive(filter?: Filter<Category>): Promise<Category[]> {
    const categories = await this.categoryRepository.find(
      filter
        ? filter
        : {
            where: {
              isActive: true,
            },
            include: [
              {
                relation: 'products',
              },
            ],
          },
    );

    return categories;
  }

  async updateAll(category: Category, where?: Where<Category>): Promise<Count> {
    const updatedProducts = await this.categoryRepository.updateAll(
      category,
      where,
    );

    return updatedProducts;
  }

  async updateById(id: string, category: Category): Promise<void> {
    await this.categoryRepository.updateById(id, category);
  }

  async replaceById(id: string, category: Category): Promise<void> {
    await this.categoryRepository.replaceById(id, category);
  }

  async deleteById(id: string): Promise<void> {
    await this.categoryRepository.deleteById(id);
  }

  async updateActive(id: string, isActive: boolean): Promise<void> {
    await this.categoryRepository.updateById(id, {isActive});
  }
}
