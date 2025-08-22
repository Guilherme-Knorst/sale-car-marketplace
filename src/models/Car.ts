import { Schema, Document, models, model } from 'mongoose';

export interface IDescription {
	title: string;
	text: string;
}

export interface ICar extends Document {
  brand: string;
  carModel: string;
	engine: string;
	fuel: string;
	color: string;
  year: number;
  price: number;
  mileage: number;
  description: IDescription[];
  images: string[];
	exteriorImages: string[];
	interiorImages: string[];
	mainImage: string;
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
		engine: { type: String, required: true },
		color: { type: String, required: true },
		fuel: { type: String, required: true },
		description: [
      {
        title: { type: String, required: true },
        text: { type: String, required: true },
      },
    ],
    images: [{ type: String }],
		exteriorImages: [{ type: String }],
		interiorImages: [{ type: String }],
		mainImage: { type: String },
    active: { type: Boolean, default: true }, // se a publicação está visível no site
    startDate: { type: Date, default: Date.now }, // início da publicação
    endDate: { type: Date }, // fim da publicação (quando expira o anúncio)
  },
  {
    timestamps: true,
  }
);

// Middleware para definir description padrão se não for enviado
CarSchema.pre<ICar>('save', function (next) {
  if (!this.description || this.description.length === 0) {
    this.description = [
      {
        title: this.carModel,
        text: 'Descrição não informada.',
      },
    ];
  }
	this.images = this.exteriorImages.concat(this.interiorImages);
  next();
});

export default models.Car || model<ICar>('Car', CarSchema);
