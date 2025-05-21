import Link from 'next/link';
import ImageCarousel from './ImageCarousel';

export default function CarCard({ car }: { car: any }) {
  return (
    <Link key={car._id} href={`/cars/${car._id}`} target='_blank' className="border border-secondary rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow bg-white" rel="noopener noreferrer">
			<div className="flex flex-col">
				<ImageCarousel images={car.images} noModal />
				<div className="flex flex-col p-4">
					<h2 className="text-xl font-bold text-quinary">{car.brand} {car.carModel}</h2>
					<p className="text-gray-700">{car.year} • {car.mileage.toLocaleString()} km</p>
					<p className="text-primary text-lg font-semibold mt-1">
						R$ {car.price.toLocaleString('pt-BR')}
					</p>
				</div>
			</div>
    </Link>
  );
}
