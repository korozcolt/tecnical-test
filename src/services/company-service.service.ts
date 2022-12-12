import {BindingScope, injectable, Provider} from '@loopback/core';
import {Filter, repository} from '@loopback/repository';
import {Company} from '../models';
import {CompanyRepository} from '../repositories';

/*
 * Fix the service type. Possible options can be:
 * - import {CompanyService} from 'your-module';
 * - export type CompanyService = string;
 * - export interface CompanyService {}
 */
export type CompanyService = unknown;

@injectable({scope: BindingScope.TRANSIENT})
export class CompanyServiceProvider implements Provider<CompanyService> {
  constructor(
    @repository(CompanyRepository)
    public companyRepository: CompanyRepository,
  ) {}

  value() {
    return this;
  }

  async create(company: Company): Promise<Company> {
    const companyExists = await this.companyRepository.findOne({
      where: {
        name: company.name,
      },
    });

    if (companyExists) {
      throw new Error('Company already exists');
    }

    const newCompany = await this.companyRepository.create(company);

    return newCompany;
  }

  async find(filter?: Filter<Company>): Promise<Company[]> {
    const companies = await this.companyRepository.find(
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

    return companies;
  }

  async findById(id: string, filter?: Filter<Company>): Promise<Company> {
    const company = await this.companyRepository.findById(
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

    return company;
  }

  async updateById(id: string, company: Company): Promise<void> {
    await this.companyRepository.updateById(id, company);
  }

  async replaceById(id: string, company: Company): Promise<void> {
    await this.companyRepository.replaceById(id, company);
  }

  async deleteById(id: string): Promise<void> {
    await this.companyRepository.deleteById(id);
  }
}
