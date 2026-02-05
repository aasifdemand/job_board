import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { CurrentUser } from 'src/decorators/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }

  @Post()
  create(
    @Body() dto: CreateCompanyDto,
    @CurrentUser() user,
  ) {
    return this.companyService.create(dto, user);
  }

  @Get('me')
  findMyCompany(@CurrentUser() user) {
    return this.companyService.findMyCompany(user);
  }

  @Patch('me')
  update(
    @Body() dto: UpdateCompanyDto,
    @CurrentUser() user,
  ) {
    return this.companyService.update(dto, user);
  }
}
