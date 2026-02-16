import {
    Body,
    Controller,
    Get,
    Patch,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { CurrentUser } from 'src/decorators/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from 'src/entities/user.entity';
import { type JwtUser } from 'src/types/user.type';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @Post('verify')
    verify(
        @Body('email') email: string,
        @Body('otp') otp: string,
    ) {
        return this.authService.verifyAccount(email, otp);
    }


    @Get('google')
    @UseGuards(AuthGuard('google'))
    googleAuth() { }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleCallback(@Req() req, @Res() res) {
        const data = await this.authService.googleLogin(req.user);
        return res.redirect(
            `${process.env.FRONTEND_URL}/google/callback?token=${data.accessToken}`
        );
    }

    @Post('forgot-password')
    forgot(@Body('email') email: string) {
        return this.authService.forgotPassword(email);
    }

    @Post('reset-password')
    reset(
        @Body('token') token: string,
        @Body('password') password: string,
    ) {
        return this.authService.resetPassword(token, password);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    getMe(@CurrentUser() user: JwtUser) {
        return this.authService.findOne(user.userId);
    }



    @UseGuards(JwtAuthGuard)
    @Patch('select-role')
    selectRole(
        @Body('role') role: UserRole,
        @CurrentUser() user: JwtUser,
    ) {
        return this.authService.selectRole(role, user);
    }

}
