import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { SeekerService } from './seeker.service';
import { CreateSeekerProfileDto } from './dto/create-seeker-profile.dto';
import { UpdateSeekerProfileDto } from './dto/update-seeker-profile.dto';

import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { CurrentUser } from 'src/decorators/user.decorator';
import { type JwtUser } from 'src/types/user.type';

@UseGuards(JwtAuthGuard)
@Controller('seeker')
export class SeekerController {
  constructor(private readonly seekerService: SeekerService) { }

  @Post('profile')
  createProfile(
    @Body() dto: CreateSeekerProfileDto,
    @CurrentUser() user: JwtUser,
  ) {
    return this.seekerService.createProfile(dto, user);
  }

  @Get('profile/me')
  getProfile(@CurrentUser() user: JwtUser) {
    return this.seekerService.getMyProfile(user);
  }

  @Patch('profile/me')
  updateProfile(
    @Body() dto: UpdateSeekerProfileDto,
    @CurrentUser() user: JwtUser,
  ) {
    return this.seekerService.updateProfile(dto, user);
  }

  @Post('profile/resume')
  @UseInterceptors(FileInterceptor('resume'))
  uploadResume(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: JwtUser,
  ) {
    return this.seekerService.uploadResume(file, user);
  }
}
