import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BlPostsService } from './blposts.service';
import { CreateBlPostDto } from './dto/create-blpost.dto';
import { UpdateBlPostDto } from './dto/update-blpost.dto';

import { BlPost } from './entities/blpost.entity';

@Controller('blposts')
export class BlPostsController {
  constructor(private readonly blpostsService: BlPostsService) {}

  @Post()
  create(@Body() createBlPostDto: CreateBlPostDto) {
    return this.blpostsService.create(createBlPostDto);
  }

  @Get()
  findAll(@Query('title') title?: string): BlPost[] {
    return this.blpostsService.findAll(title);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blpostsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlPostDto: UpdateBlPostDto) {
    return this.blpostsService.update(+id, updateBlPostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blpostsService.remove(+id);
  }
}
