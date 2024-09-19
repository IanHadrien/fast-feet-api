import { AppService } from '@/app.service';
import { Controller, Get } from '@nestjs/common';

@Controller('teste')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
