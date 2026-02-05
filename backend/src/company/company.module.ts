import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { Company } from 'src/entities/company.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, User])],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule { }
