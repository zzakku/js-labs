import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlPostsModule } from './blposts/blposts.module';

@Module({
  imports: [BlPostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
