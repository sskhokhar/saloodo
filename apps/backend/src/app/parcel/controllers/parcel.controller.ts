import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateParcelDTO } from '../../dtos';
import { MarkStatusDTO } from '../../dtos/mark-status.dto';
import { ParcelQuery } from '../../types/parcel-query';
import { ParcelService } from '../services';

@Controller('parcels')
export class ParcelController {
  constructor(private parcelService: ParcelService) {}

  @Post()
  async create(@Body() parcel: CreateParcelDTO) {
    return this.parcelService.createParcel(parcel);
  }

  @Get()
  async find(@Query('where') where?: string) {
    let query = {};
    if (where) {
      try {
        query = JSON.parse(where) as ParcelQuery;
      } catch (error) {
        throw new BadRequestException('Where must be a valid object');
      }
    }
    return this.parcelService.getParcels(query);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    await this.parcelService.deleteParcel(id);
  }

  @Post(':id/mark-status')
  async markStatus(
    @Param('id') id: string,
    @Body() markStatusDto: MarkStatusDTO
  ) {
    return this.parcelService.markStatus(id, markStatusDto);
  }
}
