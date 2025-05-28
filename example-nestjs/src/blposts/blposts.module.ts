import { Module } from '@nestjs/common';
import { BlPostsService } from './blposts.service';
import { BlPostsController } from './blposts.controller';
import { FileService, FileAccessor } from 'src/assets/file.service';
import { BlPost } from './entities/blpost.entity';

@Module({
  controllers: [BlPostsController],
  providers: [
    BlPostsService,
    {
      provide: FileService,
      useFactory: (blposts: BlPostsModule) =>
        new FileService<BlPost[]>(blposts.filePath),
      inject: [BlPostsModule],
    },
  ],
})
export class BlPostsModule implements FileAccessor {
  public readonly filePath = 'assets/blposts.json';
}