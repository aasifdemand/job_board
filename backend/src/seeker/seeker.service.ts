import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JobSeekerProfile } from 'src/entities/seeker.entity';
import { User, UserRole } from 'src/entities/user.entity';
import { ImagekitService } from 'src/services/media.service';
import { CreateSeekerProfileDto } from './dto/create-seeker-profile.dto';
import { UpdateSeekerProfileDto } from './dto/update-seeker-profile.dto';
import { JwtUser } from 'src/types/user.type';

@Injectable()
export class SeekerService {
    constructor(
        @InjectRepository(JobSeekerProfile)
        private readonly seekerRepo: Repository<JobSeekerProfile>,

        @InjectRepository(User)
        private readonly userRepo: Repository<User>,

        private readonly imagekitService: ImagekitService,
    ) { }

    async createProfile(
        dto: CreateSeekerProfileDto,
        authUser: JwtUser,
    ) {
        if (authUser.role !== UserRole.JOB_SEEKER) {
            throw new ForbiddenException('Only job seekers can create profiles');
        }

        const user = await this.userRepo.findOne({
            where: { id: authUser.userId },
            relations: ['seekerProfile'],
        });

        if (!user) throw new NotFoundException('User not found');
        if (user.seekerProfile) {
            throw new ForbiddenException('Profile already exists');
        }

        const profile = this.seekerRepo.create({
            ...dto,
            user,
        });

        return this.seekerRepo.save(profile);
    }

    async getMyProfile(authUser: JwtUser) {
        const profile = await this.seekerRepo.findOne({
            where: { user: { id: authUser.userId } },
        });

        if (!profile) throw new NotFoundException('Profile not found');
        return profile;
    }

    async updateProfile(
        dto: UpdateSeekerProfileDto,
        authUser: JwtUser,
    ) {
        const profile = await this.getMyProfile(authUser);
        Object.assign(profile, dto);
        return this.seekerRepo.save(profile);
    }

    async uploadResume(
        file: Express.Multer.File,
        authUser: JwtUser,
    ) {
        const profile = await this.getMyProfile(authUser);

        const upload = await this.imagekitService.uploadFile(
            file.buffer,
            file.originalname,
            `/resumes/${authUser.userId}`,
        );

        profile.resumeUrl = upload.url;
        await this.seekerRepo.save(profile);

        return {
            resumeUrl: upload.url,
        };
    }

}
