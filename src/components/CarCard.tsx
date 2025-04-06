import Link from 'next/link';
import Image from 'next/image';

export default function CarCard({ car }: { car: any }) {
  return (
    <Link href={`/cars/${car._id}`}>
      <div className="border rounded p-3 hover:shadow">
        {/* <img src={car.images?.[0]} alt={car.model} className="w-full h-40 object-cover rounded" /> */}
				<Image
					src={car.images?.[0]}
					alt={car.carModel}
					width={400}
					height={300}
					className="w-full h-40 object-cover rounded"
				/>
        <h2 className="text-lg font-semibold mt-2">{car.brand} {car.carModel}</h2>
        <p>Ano: {car.year}</p>
        <p>R$ {car.price.toLocaleString('pt-BR')}</p>
      </div>
    </Link>
  );
}
