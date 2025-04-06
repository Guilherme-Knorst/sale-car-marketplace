import { connectToDatabase } from '@/lib/mongodb';
import Car, { ICar } from '@/models/Car';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function CarDetailPage({ params }: { params: { id: string } }) {
  await connectToDatabase();

  const car = await Car.findById<ICar>(params.id).lean();

  if (!car || !car.active) {
    notFound(); // redireciona para 404
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid grid-cols-2 gap-2">
          {car.images?.map((url: string, idx: number) => (
            <Image
              key={idx}
              src={url}
              alt={`${car.brand} ${car.model} ${idx}`}
              width={400}
              height={300}
              className="w-full h-auto rounded object-cover"
            />
          ))}
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold">
            {car.brand} {car.model}
          </h1>
          <p className="text-gray-600 text-lg">{car.year} • {car.mileage.toLocaleString()} km</p>
          <p className="text-2xl text-green-600 font-semibold">
            R$ {car.price.toLocaleString('pt-BR')}
          </p>
          {car.description && (
            <p className="text-gray-800 mt-4">{car.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
