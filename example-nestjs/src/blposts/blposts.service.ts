import { Injectable } from '@nestjs/common';
import { CreateBlPostDto } from './dto/create-blpost.dto';
import { UpdateBlPostDto } from './dto/update-blpost.dto';

import { BlPost } from './entities/blpost.entity';
import { FileService } from 'src/assets/file.service';

@Injectable()
export class BlPostsService {
  constructor(private fileService: FileService<BlPost[]>) {}

  create(createBlPostDto: CreateBlPostDto) {
    const blposts = this.fileService.read();

    // для простоты новый id = текущее количество карточек + 1
    const blpost = { ...createBlPostDto, id: blposts.length + 1 };

    this.fileService.add(blpost);
  }

  findAll(title?: string): BlPost[] {
    const blposts = this.fileService.read();

    return title
      ? blposts.filter((blpost) =>
          blpost.title.toLowerCase().includes(title.toLowerCase()),
        )
      : blposts;
  }


  findOne(id: number): BlPost | null {
    const blposts = this.fileService.read();

    return blposts.find((blpost) => blpost.id === id) ?? null;
  }

  update(id: number, updateBlPostDto: UpdateBlPostDto): void {
    const blposts = this.fileService.read();

    const updatedBlPosts = blposts.map((blpost) =>
      blpost.id === id ? { ...blpost, ...updateBlPostDto } : blpost,
    );

    this.fileService.write(updatedBlPosts);
  }

  remove(id: number): void {
    const filteredBlPosts = this.fileService
      .read()
      .filter((blpost) => blpost.id !== id);

    this.fileService.write(filteredBlPosts);
  }
}
