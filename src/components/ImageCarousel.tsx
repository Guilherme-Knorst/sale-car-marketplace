'use client';

import { useState, useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import ImageGalleryModal from './ImageGalleryModal';

// ⚠️ Importe este CSS como global (em pages/_app.tsx ou app/layout.tsx).
// import 'keen-slider/keen-slider.min.css';

interface ImageCarouselProps {
  images: string[];
  noModal?: boolean;
}

// pixel base64 (placeholder simples)
const BLUR =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=';

export default function ImageCarousel({ images, noModal }: ImageCarouselProps) {

	const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1 },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  const openModal = (index: number) => {
    setCurrentSlide(index);
    setIsModalOpen(true);
    window.history.pushState({ modalOpen: true }, '');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (window.history.state?.modalOpen) window.history.back();
  };

  useEffect(() => {
    const handlePopState = () => {
      if (isModalOpen) setIsModalOpen(false);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isModalOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    if (isModalOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isModalOpen]);

  return (
    <div className="relative group lg:w-[50%] lg:m-auto lg:mt-5">
			<button
				onClick={(e) => {
					e.stopPropagation();
					e.preventDefault();
					instanceRef.current?.prev();
				}}
				className="absolute pb-1 top-1/2 -translate-y-1/2 text-white w-10 h-full text-4xl lg:w-10 flex items-center justify-center z-20
					transition-opacity duration-300 opacity-100 bg-gradient-to-r from-black/40 to-transparent
					lg:opacity-0 lg:group-hover:opacity-100"
				aria-label="Imagem anterior"
				disabled={!loaded}
			>
				‹
			</button>

			{/* Next */}
			<button
				onClick={(e) => {
					e.stopPropagation();
					e.preventDefault();
					instanceRef.current?.next();
				}}
				className="absolute pb-1 right-0 top-1/2 -translate-y-1/2 text-white w-10 h-full text-4xl lg:w-10 flex items-center justify-center z-20
					transition-opacity duration-300 opacity-100 bg-gradient-to-l from-black/40 to-transparent
					lg:opacity-0 lg:group-hover:opacity-100"
				aria-label="Próxima imagem"
				disabled={!loaded}
			>
				›
			</button>
      <div
        ref={sliderRef}
        className={`keen-slider relative overflow-hidden transition-opacity duration-200 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {images.map((src, idx) => (
          <div key={idx} className="keen-slider__slide">
            {/* Wrapper fixa o espaço com aspect ratio antes da imagem carregar */}
            <div className="relative w-full m-auto aspect-[1/1] rounded-lg overflow-hidden">
							<Image
								src={src}
								alt={`Imagem ${idx + 1}`}
								fill
								// só a primeira com prioridade/eager
								priority={idx === 0}
								loading={idx === 0 ? 'eager' : 'lazy'}
								// responsivo: ajuste conforme seus breakpoints
								quality={70}
								placeholder="blur"
								blurDataURL={BLUR}
								className="object-cover cursor-pointer"
								onClick={() => (noModal ? null : openModal(idx))}
							/>
              {/* skeleton leve até onLoad (opcional): */}
              {/* Pode remover se o blur já for suficiente */}
            </div>
          </div>
        ))}
      </div>

      <ImageGalleryModal
        images={images}
        startIndex={currentSlide}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}
