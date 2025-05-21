'use client';

import { useState, useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import ImageGalleryModal from './ImageGalleryModal';

interface ImageCarouselProps {
  images: string[];
	noModal?: boolean;
}

export default function ImageCarousel({ images, noModal }: ImageCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1 },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  const openModal = (index: number) => {
    setCurrentSlide(index);
    setIsModalOpen(true);
    window.history.pushState({ modalOpen: true }, ''); // adiciona estado
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (window.history.state?.modalOpen) window.history.back(); // volta pro estado anterior real
  };

  useEffect(() => {
    const handlePopState = () => {
      if (isModalOpen) {
        setIsModalOpen(false); // fecha só o modal
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isModalOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };

    if (isModalOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isModalOpen]);

  return (
    <div className='relative group'>
			  <button
					onClick={(e) => {
						e.stopPropagation();
						e.preventDefault();
						instanceRef.current?.prev();
					}}
					className="absolute pb-1 top-1/2 -translate-y-1/2 text-white w-10 h-full text-4xl lg:w-10 flex items-center justify-center z-2
						transition-opacity duration-300 opacity-100
						bg-gradient-to-r from-black/40 to-transparent
						lg:opacity-0 lg:group-hover:opacity-100"
					aria-label="Imagem anterior"
				>
					‹
				</button>

				{/* Botão próximo */}
				<button
					onClick={(e) => {
						e.stopPropagation();
						e.preventDefault();
						instanceRef.current?.next();
					}}
					className="absolute pb-1 right-0 top-1/2 -translate-y-1/2 text-white w-10 h-full text-4xl lg:w-10 flex items-center justify-center z-2
						transition-opacity duration-300 opacity-100
						 bg-gradient-to-l from-black/40 to-transparent
						lg:opacity-0 lg:group-hover:opacity-100"
					aria-label="Próxima imagem"
				>
					›
				</button>

      <div ref={sliderRef} className="keen-slider relative bg-transparent">
				{images.map((src, idx) => (
					<div key={idx} className="keen-slider__slide flex place-content-center">
						<Image
							src={src}
							width={2050}
							height={1}
							priority
							alt={`Imagem ${idx + 1}`}
							className="cursor-pointer rounded-lg aspect-16/9 object-cover max-h-full w-full"
							onClick={() => noModal ? null : openModal(idx)}
						/>
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
