'use client';

import Image from 'next/image';

export default function RetroBanner() {
  return (
    <div className="flex justify-center items-center py-12 bg-black">
      <div className="relative">
        <Image
          src="/images/logo.png"
          alt="Promoção"
          width={400}
          height={200}
          priority
        />
        <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 bg-quinary text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
          Acesse agora os clássicos à venda!
        </div>
      </div>
    </div>
  );
}
