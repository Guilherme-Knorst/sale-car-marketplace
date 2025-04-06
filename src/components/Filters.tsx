'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [brand, setBrand] = useState(searchParams.get('brand') || '');
  const [priceMin, setPriceMin] = useState(searchParams.get('price_min') || '');
  const [priceMax, setPriceMax] = useState(searchParams.get('price_max') || '');

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (brand) params.set('brand', brand);
    if (priceMin) params.set('price_min', priceMin);
    if (priceMax) params.set('price_max', priceMax);

    router.push(`/cars?${params.toString()}`);
  };

  return (
    <div className="flex gap-4 items-end flex-wrap">
      <input
        type="text"
        placeholder="Marca"
        value={brand}
        onChange={e => setBrand(e.target.value)}
        className="input"
      />
      <input
        type="number"
        placeholder="Preço mínimo"
        value={priceMin}
        onChange={e => setPriceMin(e.target.value)}
        className="input"
      />
      <input
        type="number"
        placeholder="Preço máximo"
        value={priceMax}
        onChange={e => setPriceMax(e.target.value)}
        className="input"
      />
      <button onClick={applyFilters} className="btn-primary">Filtrar</button>
    </div>
  );
}
