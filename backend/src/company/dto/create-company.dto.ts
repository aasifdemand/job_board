import { IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateCompanyDto {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsUrl()
    website?: string;

    @IsOptional()
    location?: string;

    @IsOptional()
    description?: string;
}
