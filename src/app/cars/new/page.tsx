'use client';

import { useState } from 'react';
import ImageUploader from '@/components/ImageUploader';

export default function NewCarPage() {
  const [form, setForm] = useState({
    brand: '',
    carModel: '',
    year: '',
    price: '',
    mileage: '',
    description: '',
    endDate: '',
  });

  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const uploadImages = async (files: File[]): Promise<string[]> => {
    const uploads = files.map(async (file) => {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      return data.secure_url;
    });

    return Promise.all(uploads);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrls = await uploadImages(images);

      const res = await fetch('/api/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          year: Number(form.year),
          price: Number(form.price),
          mileage: Number(form.mileage),
          images: imageUrls,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Carro cadastrado com sucesso!');
      } else {
        alert('Erro ao cadastrar carro: ' + data.error);
      }
    } catch (err) {
      console.error('Erro ao enviar:', err);
      alert('Erro ao cadastrar carro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cadastrar Novo Carro</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="brand" placeholder="Marca" onChange={handleChange} required className="input" />
        <input name="carModel" placeholder="Modelo" onChange={handleChange} required className="input" />
        <input name="year" type="number" placeholder="Ano" onChange={handleChange} required className="input" />
        <input name="price" type="number" placeholder="Preço (R$)" onChange={handleChange} required className="input" />
        <input name="mileage" type="number" placeholder="Quilometragem" onChange={handleChange} required className="input" />
        <textarea name="description" placeholder="Descrição" onChange={handleChange} className="input" />
        <input name="endDate" type="date" onChange={handleChange} className="input" />

        <ImageUploader files={images} setFiles={setImages} />

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Enviando...' : 'Salvar'}
        </button>
      </form>
    </div>
  );
}
