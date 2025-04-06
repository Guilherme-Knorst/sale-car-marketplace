import { connectToDatabase } from '@/lib/mongodb';
import Car, { ICar } from '@/models/Car';
import CarCard from '@/components/CarCard';
import Filters from '@/components/Filters';

export default async function CarsPage({ searchParams }: { searchParams: any }) {
  await connectToDatabase();

  const query: any = { active: true };

  if (searchParams.brand) {
    query.brand = searchParams.brand;
  }

  if (searchParams.price_min || searchParams.price_max) {
    query.price = {};
    if (searchParams.price_min) query.price.$gte = Number(searchParams.price_min);
    if (searchParams.price_max) query.price.$lte = Number(searchParams.price_max);
  }

  const cars = await Car.find<ICar>(query).sort({ createdAt: -1 });

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Carros à Venda</h1>
      <Filters />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {cars.map(car => (
          <CarCard key={car._id as string} car={car} />
        ))}
      </div>
    </div>
  );
}
