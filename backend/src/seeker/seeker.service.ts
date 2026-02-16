import {
    ForbiddenException,
    Injectable,
    NotFoundException,
    BadRequestException,
    InternalServerErrorException,
    Logger,
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
    private readonly logger = new Logger(SeekerService.name);

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
        const user = await this.userRepo.findOne({
            where: { id: authUser.userId },
            relations: ['seekerProfile'],
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        let profile = user.seekerProfile;

        if (!profile) {
            profile = this.seekerRepo.create({ user });
        }

        Object.assign(profile, dto);

        await this.seekerRepo.save(profile);

        // 🔥 IMPORTANT PART
        user.role = UserRole.JOB_SEEKER;
        user.isOnboarded = true;

        await this.userRepo.save(user);

        return profile;
    }



    async getMyProfile(authUser: JwtUser) {
        this.logger.log(`Fetching profile for user: ${authUser.userId}`);

        try {
            const profile = await this.seekerRepo.findOne({
                where: { user: { id: authUser.userId } },
            });

            if (!profile) {
                this.logger.warn(`Profile not found for user: ${authUser.userId}`);
                throw new NotFoundException('Profile not found');
            }

            this.logger.log(`Profile retrieved for user: ${authUser.userId}`);
            return profile;

        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }

            this.logger.error(
                `Failed to fetch profile for user ${authUser.userId}`,
                error.stack,
            );
            throw new InternalServerErrorException('Failed to retrieve profile');
        }
    }

    async updateProfile(
        dto: UpdateSeekerProfileDto,
        authUser: JwtUser,
    ) {
        this.logger.log(`Updating profile for user: ${authUser.userId}`);

        try {
            const profile = await this.getMyProfile(authUser);

            // Log what fields are being updated
            const updatedFields = Object.keys(dto);
            this.logger.debug(`Updating fields for user ${authUser.userId}: ${updatedFields.join(', ')}`);

            Object.assign(profile, dto);
            const updated = await this.seekerRepo.save(profile);

            this.logger.log(`Profile updated successfully for user: ${authUser.userId}`);
            return updated;

        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }

            this.logger.error(
                `Failed to update profile for user ${authUser.userId}`,
                error.stack,
            );
            throw new InternalServerErrorException('Failed to update profile');
        }
    }

    async uploadResume(
        file: Express.Multer.File,
        authUser: JwtUser,
    ) {
        this.logger.log(`Uploading resume for user: ${authUser.userId}`);

        if (!file) {
            throw new BadRequestException('No file provided');
        }

        const allowedMimeTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];

        if (!allowedMimeTypes.includes(file.mimetype)) {
            throw new BadRequestException('Only PDF and Word documents are allowed');
        }

        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            throw new BadRequestException('File size exceeds 5MB limit');
        }

        // 🔥 Instead of getMyProfile()
        let profile = await this.seekerRepo.findOne({
            where: { user: { id: authUser.userId } },
            relations: ['user'],
        });

        if (!profile) {
            const user = await this.userRepo.findOne({
                where: { id: authUser.userId },
            });

            if (!user) {
                throw new NotFoundException('User not found');
            }

            profile = this.seekerRepo.create({ user });
            await this.seekerRepo.save(profile);
        }

        const upload = await this.imagekitService.uploadFile(
            file.buffer,
            file.originalname,
            `/resumes/${authUser.userId}`,
        );

        profile.resumeUrl = upload.url;
        await this.seekerRepo.save(profile);

        return {
            resumeUrl: upload.url,
            message: 'Resume uploaded successfully',
        };
    }

}