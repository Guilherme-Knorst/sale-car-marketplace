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
				className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#379CC8]/80 text-white w-8 h-8 flex items-center justify-center rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity"
				aria-label="Imagem anterior"
			>
				‹
			</button>

			<button
				onClick={(e) => {
					e.stopPropagation();
					e.preventDefault();
					instanceRef.current?.next();
				}}
				className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#379CC8]/80 text-white w-8 h-8 flex items-center justify-center rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity"
				aria-label="Próxima imagem"
			>
				›
			</button>

      <div ref={sliderRef} className="keen-slider">
				{images.map((src, idx) => (
					<div key={idx} className="keen-slider__slide flex place-content-center">
						<Image
							src={src}
							width={1000}
							height={50}
							alt={`Imagem ${idx + 1}`}
							className="object-cover cursor-pointer rounded-lg aspect-[16/9] w-full h-full"
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
