import {Category, CategoryRelations} from './category.model';
import {Company, CompanyRelations} from './company.model';
import {Entity, belongsTo, model, property} from '@loopback/repository';

import {v4 as uuid} from 'uuid';

@model()
export class Product extends Entity {
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
    type: 'string',
  })
  brand?: string;

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @belongsTo(() => Company)
  companyId: string;

  @belongsTo(() => Category)
  categoryId: string;

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  company?: CompanyRelations;
  category?: CategoryRelations;
}

export type ProductWithRelations = Product & ProductRelations;
