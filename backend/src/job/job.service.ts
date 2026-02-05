import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Job } from 'src/entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { User, UserRole } from 'src/entities/user.entity';
import { type JwtUser } from 'src/types/user.type';
import { Application, ApplicationStatus } from 'src/entities/application.entity';
import { JobSeekerProfile } from 'src/entities/seeker.entity';

@Injectable()
export class JobsService {
    constructor(
        @InjectRepository(Job)
        private readonly jobRepo: Repository<Job>,
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        @InjectRepository(Application)
        private readonly applicationRepo: Repository<Application>,

        @InjectRepository(JobSeekerProfile)
        private readonly seekerRepo: Repository<JobSeekerProfile>,
    ) { }

    async create(dto: CreateJobDto, authUser: JwtUser) {
        if (authUser.role !== UserRole.RECRUITER) {
            throw new ForbiddenException('Only recruiters can post jobs');
        }

        const user = await this.userRepo.findOne({
            where: { id: authUser.userId },
        });

        if (!user || !user.company) {
            throw new ForbiddenException('Recruiter must have a company');
        }




        const job = this.jobRepo.create({
            ...dto,
            postedBy: user,
            company: user.company,
            deadline: dto.deadline ? new Date(dto.deadline) : undefined,
        });


        return this.jobRepo.save(job);
    }


    findAll() {
        return this.jobRepo.find({
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: string) {
        const job = await this.jobRepo.findOne({ where: { id } });
        if (!job) throw new NotFoundException('Job not found');
        return job;
    }

    async update(id: string, dto: UpdateJobDto, user: User) {
        const job = await this.findOne(id);

        if (job.postedBy.id !== user.id) {
            throw new ForbiddenException('You can update only your own jobs');
        }

        Object.assign(job, dto);
        return this.jobRepo.save(job);
    }

    async remove(id: string, user: User) {
        const job = await this.findOne(id);

        if (job.postedBy.id !== user.id) {
            throw new ForbiddenException('You can delete only your own jobs');
        }

        await this.jobRepo.remove(job);
        return { message: 'Job deleted successfully' };
    }

    async apply(jobId: string, authUser: JwtUser) {
        if (authUser.role !== UserRole.JOB_SEEKER) {
            throw new ForbiddenException('Only job seekers can apply');
        }

        const job = await this.jobRepo.findOne({
            where: { id: jobId },
        });

        if (!job) {
            throw new NotFoundException('Job not found');
        }

        const profile = await this.seekerRepo.findOne({
            where: { user: { id: authUser.userId } },
        });

        if (!profile) {
            throw new ForbiddenException('Create seeker profile before applying');
        }

        if (!profile.resumeUrl) {
            throw new ForbiddenException(
                'Upload your resume before applying for jobs',
            );
        }

        const alreadyApplied = await this.applicationRepo.findOne({
            where: {
                job: { id: jobId },
                user: { id: authUser.userId },
            },
        });

        if (alreadyApplied) {
            throw new ForbiddenException('You have already applied to this job');
        }

        // ✅ SNAPSHOT resumeUrl here
        const application = this.applicationRepo.create({
            job,
            user: { id: authUser.userId } as User,
            resumeUrl: profile.resumeUrl,
        });

        return this.applicationRepo.save(application);
    }


    async withdraw(jobId: string, authUser: JwtUser) {
        // 1️⃣ Role check
        if (authUser.role !== UserRole.JOB_SEEKER) {
            throw new ForbiddenException(
                'Only job seekers can withdraw applications',
            );
        }

        // 2️⃣ Find application
        const application = await this.applicationRepo.findOne({
            where: {
                job: { id: jobId },
                user: { id: authUser.userId },
            },
        });

        if (!application) {
            throw new NotFoundException('Application not found');
        }

        // 3️⃣ Prevent double withdraw
        if (application.status === ApplicationStatus.WITHDRAWN) {
            throw new ForbiddenException('Application already withdrawn');
        }

        // 4️⃣ Optional business rule: block withdraw after hire
        if (application.status === ApplicationStatus.HIRED) {
            throw new ForbiddenException(
                'Cannot withdraw application after being hired',
            );
        }

        // 5️⃣ Mark as withdrawn
        application.status = ApplicationStatus.WITHDRAWN;

        return this.applicationRepo.save(application);
    }


    async getApplicationsForJob(jobId: string, authUser: JwtUser) {
        // 1️⃣ Role check
        if (
            authUser.role !== UserRole.ADMIN &&
            authUser.role !== UserRole.RECRUITER
        ) {
            throw new ForbiddenException(
                'Only recruiters and admins can view applications',
            );
        }

        // 2️⃣ Job must exist
        const job = await this.jobRepo.findOne({
            where: { id: jobId },
            relations: ['postedBy'],
        });

        if (!job) {
            throw new NotFoundException('Job not found');
        }

        // 3️⃣ Recruiter can view ONLY their jobs
        if (
            authUser.role === UserRole.RECRUITER &&
            job.postedBy.id !== authUser.userId
        ) {
            throw new ForbiddenException(
                'You can view applications only for your jobs',
            );
        }

        // 4️⃣ Fetch applications (exclude withdrawn)
        const applications = await this.applicationRepo.find({
            where: {
                job: { id: jobId },
                status: ApplicationStatus.APPLIED,
            },
            relations: ['user'],
            order: { appliedAt: 'DESC' },
        });

        return applications;
    }

}
