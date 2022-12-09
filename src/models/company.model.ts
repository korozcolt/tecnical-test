import {Entity, hasMany, model, property} from '@loopback/repository';
import {Product, ProductWithRelations} from './product.model';

import {v4 as uuid} from 'uuid';

@model()
export class Company extends Entity {
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
  name: string;

  @property({
    type: 'string',
  })
  address?: string;

  @hasMany(() => Product)
  products: Product[];

  constructor(data?: Partial<Company>) {
    super(data);
  }
}

export interface CompanyRelations {
  products: ProductWithRelations[];
}

export type CompanyWithRelations = Company & CompanyRelations;
