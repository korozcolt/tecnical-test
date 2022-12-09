import {Entity, hasMany, model, property} from '@loopback/repository';
import {Product, ProductWithRelations} from './product.model';

import {v4 as uuid} from 'uuid';

@model()
export class Category extends Entity {
  @property({
    type: 'string',
    id: true,
    default: () => uuid(),
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  code: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isActive: boolean;

  @hasMany(() => Product)
  products: Product[];

  constructor(data?: Partial<Category>) {
    super(data);
  }
}

export interface CategoryRelations {
  products: ProductWithRelations[];
}

export type CategoryWithRelations = Category & CategoryRelations;
