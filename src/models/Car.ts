import { Schema, Document, models, model } from 'mongoose';

export interface ICar extends Document {
  brand: string;
  carModel: string;
  year: number;
  price: number;
  mileage: number;
  description: string;
  images: string[];
  active: boolean;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
}

const CarSchema: Schema = new Schema(
  {
    brand: { type: String, required: true },
    carModel: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    mileage: { type: Number, required: true },
    description: { type: String },
    images: [{ type: String }],
    active: { type: Boolean, default: true }, // se a publicação está visível no site
    startDate: { type: Date, default: Date.now }, // início da publicação
    endDate: { type: Date }, // fim da publicação (quando expira o anúncio)
  },
  {
    timestamps: true,
  }
);

export default models.Car || model<ICar>('Car', CarSchema);
