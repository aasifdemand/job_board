import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JobsService } from './job.service';
import { JobsController } from './job.controller';
import { Job } from 'src/entities/job.entity';
import { User } from 'src/entities/user.entity';
import { Application } from 'src/entities/application.entity';
import { JobSeekerProfile } from 'src/entities/seeker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Job,
    User,
    Application,
    JobSeekerProfile
  ])],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobModule { }
