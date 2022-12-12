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
    jsonSchema: {
      pattern: '^[a-zA-Z0-9]{4,10}$',
      minimum: 4,
      maximum: 10,
    },
  })
  code: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      pattern: '^[a-zA-Z0-9]{4,10}$',
      minimum: 4,
    },
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
    required: true,
  })
  brand: string;

  @property({
    type: 'number',
    required: true,
    jsonSchema: {
      pattern: '^[0-9]*$',
    },
  })
  quantity: number;

  @property({
    type: 'number',
    required: true,
    jsonSchema: {
      pattern: '^[0-9]*$',
    },
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
