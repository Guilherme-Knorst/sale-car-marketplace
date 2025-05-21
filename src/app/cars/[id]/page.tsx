import ImageCarousel from '@/components/ImageCarousel';
import { connectToDatabase } from '@/lib/mongodb';
import Car, { ICar } from '@/models/Car';
import { notFound } from 'next/navigation';

export default async function CarDetailPage({ params }: { params: { id: string } }) {
  await connectToDatabase();

	const { id } = await params;

  const car: ICar | null = await Car.findById<ICar>(id);

  if (!car || !car.active) {
    notFound(); // redireciona para 404
  }

  return (
    <div className="flex flex-col gap-5">

			<ImageCarousel images={car.images} />

			<div className="sticky top-20 flex flex-col lg:flex-row lg:justify-start items-center lg:gap-5 p-3 lg:p-5 z-10 place-self-center bg-white/95 rounded">
				<p className="text-lg lg:text-xl font-bold">
					{car.year} {car.brand} {car.carModel}
				</p>
				<p className="text-lg lg:text-xl text-gray-600">
					{car.engine} - {car.mileage.toLocaleString()} km
				</p>
				<p className="text-xl lg:text-2xl text-green-600 font-semibold">
					R$ {car.price.toLocaleString('pt-BR')}
				</p>
			</div>

			{/* <section className="w-[95%] mx-auto mt-10 bg-white/95 rounded-xl shadow-lg overflow-hidden">
				<h2 className="text-2xl font-bold text-primary px-6 pt-6 pb-4 font-syntha border-b border-primary">
					Ficha Técnica
				</h2>
				<table className="w-full text-base text-left text-gray-800">
					<tbody>
						<tr className="border-b border-gray-200">
							<th className="px-6 py-4 font-semibold text-quinary w-1/3">Marca</th>
							<td className="px-6 py-4">{car.brand}</td>
						</tr>
						<tr className="bg-senary border-b border-gray-200">
							<th className="px-6 py-4 font-semibold text-quinary">Modelo</th>
							<td className="px-6 py-4">{car.carModel}</td>
						</tr>
						<tr className="border-b border-gray-200">
							<th className="px-6 py-4 font-semibold text-quinary">Ano</th>
							<td className="px-6 py-4">{car.year}</td>
						</tr>
						<tr className="bg-senary border-b border-gray-200">
							<th className="px-6 py-4 font-semibold text-quinary">Quilometragem</th>
							<td className="px-6 py-4">{car.mileage.toLocaleString()} km</td>
						</tr>
						<tr className="border-b border-gray-200">
							<th className="px-6 py-4 font-semibold text-quinary">Preço</th>
							<td className="px-6 py-4">R$ {car.price.toLocaleString('pt-BR')}</td>
						</tr>
						<tr className="bg-senary border-b border-gray-200">
							<th className="px-6 py-4 font-semibold text-quinary">Início do anúncio</th>
							<td className="px-6 py-4">{new Date(car.startDate).toLocaleDateString()}</td>
						</tr>
						{car.endDate && (
							<tr className="border-b border-gray-200">
								<th className="px-6 py-4 font-semibold text-quinary">Expira em</th>
								<td className="px-6 py-4">{new Date(car.endDate).toLocaleDateString()}</td>
							</tr>
						)}
					</tbody>
				</table>
			</section> */}


			
      <div className="flex flex-col gap-10 w-[95%] m-auto p-10 bg-white/95 rounded">
				{car.description.map((desc, index) => (
					<div key={index} className="flex flex-col gap-5">
						<h2 className="text-2xl lg:text-4xl font-bold">{desc.title}</h2>
						<p className="text-lg lg:text-xl">{desc.text}</p>
						<ImageCarousel images={car.images} />
					</div>
				))}
      </div>
    </div>
  );
}
