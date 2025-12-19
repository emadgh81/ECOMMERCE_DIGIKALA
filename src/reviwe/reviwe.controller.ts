import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviweService } from './reviwe.service';
import { CreateReviweDto } from './dto/create-reviwe.dto';
import { UpdateReviweDto } from './dto/update-reviwe.dto';

@Controller('reviwe')
export class ReviweController {
  constructor(private readonly reviweService: ReviweService) {}

  @Post()
  create(@Body() createReviweDto: CreateReviweDto) {
    return this.reviweService.create(createReviweDto);
  }

  @Get()
  findAll() {
    return this.reviweService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviweService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviweDto: UpdateReviweDto) {
    return this.reviweService.update(+id, updateReviweDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviweService.remove(+id);
  }
}
