'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [brand, setBrand] = useState(searchParams.get('brand') || '');
  const [min, setMin] = useState(searchParams.get('price_min') || '');
  const [max, setMax] = useState(searchParams.get('price_max') || '');

  const handleSubmit = () => {
    const params = new URLSearchParams();

    if (brand) params.set('brand', brand);
    if (min) params.set('price_min', min);
    if (max) params.set('price_max', max);

    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="bg-senary p-4 rounded-lg flex flex-wrap gap-4 items-end shadow-inner mb-8">
      <input
        placeholder="Marca"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        className="px-3 py-2 rounded border border-gray-300 w-full sm:w-40"
      />
      <input
        placeholder="Preço mínimo"
        type="number"
        value={min}
        onChange={(e) => setMin(e.target.value)}
        className="px-3 py-2 rounded border border-gray-300 w-full sm:w-40"
      />
      <input
        placeholder="Preço máximo"
        type="number"
        value={max}
        onChange={(e) => setMax(e.target.value)}
        className="px-3 py-2 rounded border border-gray-300 w-full sm:w-40"
      />
      <button
        onClick={handleSubmit}
        className="bg-primary text-white px-4 py-2 rounded hover:opacity-90"
      >
        Filtrar
      </button>
    </div>
  );
}
