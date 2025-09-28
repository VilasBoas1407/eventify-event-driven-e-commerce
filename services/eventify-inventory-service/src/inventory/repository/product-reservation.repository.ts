import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductReservation } from '../schema/product-reservation.schema';
import { Model } from 'mongoose';

@Injectable()
export class ReservationRepository {
  constructor(
    @InjectModel(ProductReservation.name)
    private productModel: Model<ProductReservation>,
  ) {}

  async create(
    reservation: Partial<ProductReservation>,
  ): Promise<ProductReservation> {
    const createdReservation = new this.productModel(reservation);
    return await createdReservation.save();
  }
}
