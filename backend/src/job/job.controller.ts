import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JobsService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { CurrentUser } from 'src/decorators/user.decorator';
import { type JwtUser } from 'src/types/user.type';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) { }

  // Public – list jobs
  @Get()
  findAll() {
    return this.jobsService.findAll();
  }

  // Public – job detail
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  // Recruiter only
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateJobDto, @CurrentUser() user: JwtUser) {
    return this.jobsService.create(dto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateJobDto,
    @CurrentUser() user,
  ) {
    return this.jobsService.update(id, dto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user) {
    return this.jobsService.remove(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/apply')
  apply(
    @Param('id') jobId: string,
    @CurrentUser() user: JwtUser,
  ) {
    return this.jobsService.apply(jobId, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/withdraw')
  withdraw(
    @Param('id') jobId: string,
    @CurrentUser() user: JwtUser,
  ) {
    return this.jobsService.withdraw(jobId, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/applications')
  getApplications(
    @Param('id') jobId: string,
    @CurrentUser() user: JwtUser,
  ) {
    return this.jobsService.getApplicationsForJob(jobId, user);
  }


}
