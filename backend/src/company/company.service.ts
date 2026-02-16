import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Company } from 'src/entities/company.entity';
import { User, UserRole } from 'src/entities/user.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { type JwtUser } from 'src/types/user.type';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company)
        private readonly companyRepo: Repository<Company>,

        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) { }

    async create(dto: CreateCompanyDto, authUser: JwtUser) {
        const user = await this.userRepo.findOne({
            where: { id: authUser.userId },
            relations: ['company'],
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (user.company) {
            throw new ForbiddenException('Company already exists');
        }

        // ✅ Update role safely
        user.role = UserRole.RECRUITER;

        const company = this.companyRepo.create({
            ...dto,
            user,
        });

        await this.companyRepo.save(company);

        // ✅ Mark onboarding complete
        user.isOnboarded = true;

        await this.userRepo.save(user);

        return company;
    }


    async findMyCompany(authUser: JwtUser) {
        const user = await this.userRepo.findOne({
            where: { id: authUser.userId },
            relations: ['company'],
        });

        if (!user || !user.company) {
            throw new NotFoundException('Company not found');
        }

        return user.company;
    }

    async update(dto: UpdateCompanyDto, authUser: JwtUser) {
        const company = await this.findMyCompany(authUser);

        Object.assign(company, dto);
        return this.companyRepo.save(company);
    }
}
