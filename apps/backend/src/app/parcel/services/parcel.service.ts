import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateParcelDTO } from '../../dtos';
import { MarkStatusDTO } from '../../dtos/mark-status.dto';
import { Parcel } from '../../types/parcel';
import { ParcelQuery } from '../../types/parcel-query';

@Injectable()
export class ParcelService {
  constructor(@InjectModel('Parcel') private parcelModel: Model<Parcel>) {}

  async createParcel(parcel: CreateParcelDTO) {
    try {
      return this.parcelModel.create({
        ...parcel,
        statuses: [
          {
            name: 'Created',
          },
        ],
        currentStatus: 'Created',
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async deleteParcel(id: string) {
    const parcel = await this.parcelModel.findById(id);
    if (!parcel) {
      throw new NotFoundException('Invalid parcel ID');
    }
    if (parcel.currentStatus === 'Created') {
      return this.parcelModel.deleteOne({ id });
    }
    throw new BadRequestException('Parcel is not in pending state');
  }

  async getParcels({ populate, ...query }: ParcelQuery) {
    const q = this.parcelModel.find(query);
    if (populate) {
      populate.forEach((item) => q.populate(item));
    }
    return q.exec();
  }

  async markStatus(parcelId: string, data: MarkStatusDTO) {
    const parcel = await this.parcelModel.findById(parcelId);

    parcel.update({});
    switch (data.status) {
      case 'Picked':
        if (parcel.currentStatus !== 'Created') {
          throw new BadRequestException('Invalid parcel state');
        }
        await this.parcelModel.updateOne(
          { id: parcel._id },
          {
            rider: data.rider,
            statuses: [...parcel.statuses, { name: 'Picked' }],
            currentStatus: 'Picked',
          }
        );

        return await this.parcelModel.findById(parcelId);
      case 'Delivered':
        if (parcel.currentStatus !== 'Picked') {
          throw new BadRequestException('Invalid parcel state');
        }

        if (parcel.rider.toString() !== data.rider) {
          throw new BadRequestException('Rider ID does not match');
        }
        await this.parcelModel.updateOne(
          { id: parcelId },
          {
            statuses: [...parcel.statuses, { name: 'Delivered' }],
            currentStatus: 'Delivered',
          }
        );
        return await this.parcelModel.findById(parcelId);
      default:
        throw new BadRequestException('Invalid status');
    }
  }
}
