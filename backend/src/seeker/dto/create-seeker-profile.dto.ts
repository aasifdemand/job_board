import { IsOptional, IsString, IsArray } from 'class-validator';

export class CreateSeekerProfileDto {
    @IsOptional()
    @IsString()
    headline?: string;

    @IsOptional()
    @IsString()
    summary?: string;

    @IsOptional()
    @IsString()
    location?: string;

    @IsOptional()
    @IsString()
    experienceLevel?: string;

    @IsOptional()
    @IsArray()
    skills?: string[];
}
