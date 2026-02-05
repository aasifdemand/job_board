import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { CurrentUser } from 'src/decorators/user.decorator';
import { AuthGuard } from '@nestjs/passport';

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

    @Get('verify')
    verify(@Req() req) {
        return this.authService.verifyAccount(req.query.token);
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    googleAuth() { }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleCallback(@Req() req) {
        return this.authService.googleLogin(req.user);
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

    @UseGuards(JwtAuthGuard)
    @Get('me')
    me(@CurrentUser() user) {
        return user;
    }
}
