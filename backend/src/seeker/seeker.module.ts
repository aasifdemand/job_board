import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeekerService } from './seeker.service';
import { SeekerController } from './seeker.controller';
import { JobSeekerProfile } from 'src/entities/seeker.entity';
import { User } from 'src/entities/user.entity';
import { ImagekitService } from 'src/services/media.service';


@Module({
  imports: [TypeOrmModule.forFeature([JobSeekerProfile, User])],
  controllers: [SeekerController],
  providers: [SeekerService, ImagekitService],
})
export class SeekerModule { }
