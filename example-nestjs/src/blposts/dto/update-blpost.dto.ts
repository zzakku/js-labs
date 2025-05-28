import { PartialType } from '@nestjs/mapped-types';
import { CreateBlPostDto } from './create-blpost.dto';

export class UpdateBlPostDto extends PartialType(CreateBlPostDto) {}
