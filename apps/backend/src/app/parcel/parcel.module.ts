import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ParcelSchema } from '../models/parcel.schema';
import { ParcelController } from './controllers';
import { ParcelService } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Parcel', schema: ParcelSchema }]),
  ],
  providers: [ParcelService],
  controllers: [ParcelController],
})
export class ParcelModule {}
