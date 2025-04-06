import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Car from '@/models/Car';

// POST /api/cars
export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();

    const {
      brand,
      carModel,
      year,
      price,
      mileage,
      description,
      images,
      endDate,
    } = body;

    if (!brand || !carModel || !year || !price || !images?.length) {
      return NextResponse.json({ error: 'Dados obrigatórios ausentes' }, { status: 400 });
    }

    const car = await Car.create({
      brand,
      carModel,
      year,
      price,
      mileage,
      description,
      images,
      active: true,
      startDate: new Date(),
      endDate: endDate ? new Date(endDate) : null,
    });

    return NextResponse.json(car, { status: 201 });
  } catch (error) {
    console.error('Erro ao cadastrar carro:', error);
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}
