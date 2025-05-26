import { connectToDatabase } from '@/lib/mongodb';
import Car, { ICar } from '@/models/Car';
import Footer from '@/components/Footer';
import Filters from '@/components/Filters';
import CarCard from '@/components/CarCard';

interface SearchParams {
  brand?: string;
  price_min?: string;
  price_max?: string;
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  await connectToDatabase();

  const query: Record<string, any> = { active: true };

  const { brand, price_min = 0, price_max = 9999999999 } = await searchParams;

	if (brand) {
		query.brand = { $regex: new RegExp(brand, 'i') };
	}
	
	query.price = {};
	query.price.$gte = Number(price_min);
	query.price.$lte = Number(price_max);
  

  const cars: ICar[] = await Car.find(query).sort({ createdAt: -1 });

  return (
    <div className="flex flex-col gap-6 justify-between items-center h-screen">
      <main className="mt-6 w-[90%] xl:w-[100%] 2xl:w-[60%]">
        <h1 className="text-base font-extrabold text-secondary mb-6 bg-senary p-4 rounded-lg font-syntha">
          Carros disponíveis
        </h1>

        <Filters />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
