import { IsDateString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { JobType } from 'src/entities/job.entity';

export class CreateJobDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    location: string;

    @IsEnum(JobType)
    type: JobType;

    @IsOptional()
    salaryRange?: string;

    @IsOptional()
    @IsDateString()
    deadline?: string;
}
