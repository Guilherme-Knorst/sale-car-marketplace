import ImageCarousel from '@/components/ImageCarousel';
import WhatsappButton from '@/components/WhatsappButton';
import { connectToDatabase } from '@/lib/mongodb';
import Car, { ICar } from '@/models/Car';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from "next";

export async function generateStaticParams() {
  await connectToDatabase();
  const cars = await Car.find({ active: true }, "_id");
  return cars.map((car) => ({ id: car._id.toString() }));
}

export const revalidate = 300; // revalida a cada 5 minutos segundos


interface Props {
  params: { id: string };
}

// 🔹 Gera meta tags dinâmicas para cada carro
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await connectToDatabase();
  const car: ICar | null = await Car.findById<ICar>(params.id);

  if (!car) {
    return {
      title: "Carro não encontrado",
      description: "Esse carro não está mais disponível.",
    };
  }

  return {
    title: `${car.brand} ${car.carModel} ${car.year} à venda - Sale Projetos`,
    description: `Motor ${car.engine} - ${car.fuel} - ${car.mileage.toLocaleString("pt-BR")} km`,
    openGraph: {
      title: `${car.brand} ${car.carModel} ${car.year} à venda - Sale Projetos`,
      description: car.description[0].text,
      url: `https://saleprojetos.com/cars/${car._id}`,
      images: [
        {
          url: car.mainImage, // garante URL absoluta
          width: 1200,
          height: 630,
          alt: `${car.brand} ${car.carModel}`,
        },
      ],
    },
  };
}


export default async function CarDetailPage({params}: {params: Promise<{ id: string }>}) {
  await connectToDatabase();

	const { id } = await params;

  const car: ICar | null = await Car.findById<ICar>(id);

  if (!car || !car.active) {
    notFound(); // redireciona para 404
  }

	const images = [car.mainImage, ...car.images]

  return (
    <div className="flex flex-col gap-5 lg:w-[60%] m-auto">

			<div className='lg:w-[50%] lg:m-auto lg:mt-5'>
				<ImageCarousel images={images} sold={car.sold}/>
			</div>

			<div className="top-25 flex flex-col lg:flex-row lg:justify-center items-center lg:gap-3 p-3 lg:p-4 place-self-center bg-white/95 rounded lg:w-[80%]">
				<p className="text-lg lg:text-xl font-bold">
					{car.brand} {car.carModel} {car.year}
				</p>
				<p className="text-lg lg:text-xl text-gray-600">
					{car.engine} - {car.fuel} - {car.mileage.toLocaleString('pt-BR')} km
				</p>
				<p className="text-lg lg:text-xl text-gray-600">
					{car.color}
				</p>
				<p className="text-2xl mt-5 lg:mt-0 text-green-600 font-semibold">
					{car.sold ? 'Vendido' : 'R$ ' + car.price.toLocaleString('pt-BR')}
				</p>

				{!car.sold && <WhatsappButton text={`Gostaria de mais informacoes sobre o carro ${car.brand + ' ' + car.carModel}`}/>}
			</div>

			<Link href="/" target='_blank' className="w-50 bg-white rounded text-center m-auto p-3 font-bold" rel="noopener noreferrer">Ver outros carros</Link>

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


			
      <div className="flex flex-col gap-10 p-5 lg:p-10 bg-white/95 rounded lg:w-[80%] w-[95%] m-auto">
				{car.description.map((desc, index) => (
					<div key={index} className="flex flex-col gap-5 lg:w-[60%] lg:m-auto lg:mt-5">
						<h2 className="text-2xl lg:text-4xl font-bold">{desc.title}</h2>
						<p className="text-lg lg:text-xl">{desc.text}</p>
					</div>
				))}
				<div className="flex flex-col gap-5 lg:w-[60%] lg:m-auto lg:mt-5">
					<h2 className="text-2xl lg:text-4xl font-bold">Interior</h2>
					<ImageCarousel images={car.interiorImages} />
				</div>
				<div className="flex flex-col gap-5 lg:w-[60%] lg:m-auto lg:mt-5">
					<h2 className="text-2xl lg:text-4xl font-bold">Exterior</h2>
					<ImageCarousel images={car.exteriorImages} />
					<Link href="/" target='_blank' className="w-50 bg-white rounded text-center m-auto p-3 font-bold" rel="noopener noreferrer">Ver outros carros</Link>
				</div>


				<div className="flex flex-col lg:flex-row items-center lg:gap-5 p-3 lg:p-5 place-self-center bg-white/95 rounded">
					<p className="text-lg lg:text-xl font-bold">
						{car.brand} {car.carModel} {car.year}
					</p>
					<p className="text-lg lg:text-xl text-gray-600">
						{car.engine} - {car.fuel} - {car.mileage.toLocaleString('pt-BR')} km
					</p>
					<p className="text-lg lg:text-xl text-gray-600">
						{car.color}
					</p>
					<p className="text-2xl mt-5 lg:mt-0 text-green-600 font-semibold">
						{car.sold ? 'Vendido' : 'R$ ' + car.price.toLocaleString('pt-BR')}
					</p>

					{!car.sold && <WhatsappButton text={`Gostaria de mais informacoes sobre o carro ${car.brand + ' ' + car.carModel}`}/>}
				</div>

      </div>
    </div>
  );
}
