'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

interface ImageGalleryModalProps {
  images: string[];
  startIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageGalleryModal({
  images,
  startIndex = 0,
  isOpen,
  onClose,
}: ImageGalleryModalProps) {
  const [current, setCurrent] = useState(startIndex);
	const [zoomed, setZoomed] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: startIndex,
    loop: true,
    slides: { perView: 1 },
    slideChanged(s) {
      setCurrent(s.track.details.rel);
    },
  });

  useEffect(() => {
    const escHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', escHandler);
    }
    return () => window.removeEventListener('keydown', escHandler);
  }, [isOpen, onClose]);

  useEffect(() => {
    const handlePopState = () => {
      if (isOpen) onClose();
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      window.history.pushState({ modalOpen: true }, '');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center touch-pinch-zoom"
      onClick={onClose}
    >
      <div onClick={e => e.stopPropagation()} className="max-w-4xl w-full p-4">
        <div ref={sliderRef} className="keen-slider">
          {images.map((src, idx) => (
            <div key={idx} className="keen-slider__slide flex justify-center">
              <Image
                src={src}
                alt={`img-${idx}`}
                width={800}
                height={600}
								onClick={() => setZoomed(!zoomed)}
								className={`rounded object-contain max-h-[80vh] transition-transform duration-300 ${
									zoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
								}`}
              />
            </div>
          ))}
        </div>

        <div className="text-white text-center mt-2">
          {current + 1} / {images.length}
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={() => instanceRef.current?.prev()}
            className="text-white text-2xl px-4"
          >
            ‹
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            className="text-white text-2xl px-4"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
