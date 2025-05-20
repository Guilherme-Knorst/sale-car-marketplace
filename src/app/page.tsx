import { connectToDatabase } from '@/lib/mongodb';
import Car from '@/models/Car';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Filters from '@/components/Filters';
import CarCard from '@/components/CarCard';

export default async function HomePage({ searchParams }: { searchParams: any }) {
  await connectToDatabase();

  const query: any = { active: true };

	const { brand, price_min, price_max } = await searchParams;

  if (brand) query.brand = brand;
  if (price_min || price_max) {
    query.price = {};
    if (price_min) query.price.$gte = Number(price_min);
    if (price_max) query.price.$lte = Number(price_max);
  }

  const cars = await Car.find(query).sort({ createdAt: -1 });

  return (
    <>
      <Header />

      <main className="w-[90%] xl:w-[70%] 2xl:w-[50%] m-auto pt-20">
        <h1 className="text-base font-extrabold text-secondary mb-6 font-synth bg-senary p-4 rounded-lg">Carros disponíveis</h1>

        <Filters/>

        {/* Lista de carros */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car: any) => (
						<CarCard key={car._id as string} car={car} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
