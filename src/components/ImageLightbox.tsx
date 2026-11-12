import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { urlFor } from '@/sanity/lib/imageUrl';

type GalleryImage = {
  asset: { _ref: string };
  alt?: string;
};

type ImageLightboxProps = {
  images: GalleryImage[];
  title: string;
};

export default function ImageLightbox({ images, title }: ImageLightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrevious = useCallback(() => {
    setActiveIndex((index) => (index === null ? null : (index - 1 + images.length) % images.length));
  }, [images.length]);
  const showNext = useCallback(() => {
    setActiveIndex((index) => (index === null ? null : (index + 1) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft') showPrevious();
      if (event.key === 'ArrowRight') showNext();
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, close, showNext, showPrevious]);

  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {images.map((image, index) => (
          <button
            key={`${image.asset._ref}-${index}`}
            type="button"
            className="group relative aspect-[4/5] overflow-hidden bg-secondary text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-text"
            onClick={() => setActiveIndex(index)}
            aria-label={`Open image ${index + 1} of ${images.length}`}
          >
            <Image
              src={urlFor(image).width(1100).height(1400).url()}
              alt={image.alt || title}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="scale-[1.06] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.1]"
              priority={index === 0}
            />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-text/95 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} image viewer`}
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={close}
            className="absolute right-5 top-5 z-10 p-2 text-bg transition-opacity hover:opacity-60 focus:outline-none focus-visible:ring-1 focus-visible:ring-bg"
            aria-label="Close image viewer"
          >
            <span className="text-2xl leading-none">×</span>
          </button>

          <button
            type="button"
            onClick={showPrevious}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-3 text-bg transition-opacity hover:opacity-60 focus:outline-none focus-visible:ring-1 focus-visible:ring-bg sm:left-8"
            aria-label="Previous image"
          >
            <span className="text-3xl leading-none">←</span>
          </button>

          <Image
            src={urlFor(images[activeIndex]).width(1800).height(1800).url()}
            alt={images[activeIndex].alt || title}
            width={1800}
            height={1800}
            className="max-h-[88vh] w-auto max-w-[82vw] object-contain"
          />

          <button
            type="button"
            onClick={showNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-3 text-bg transition-opacity hover:opacity-60 focus:outline-none focus-visible:ring-1 focus-visible:ring-bg sm:right-8"
            aria-label="Next image"
          >
            <span className="text-3xl leading-none">→</span>
          </button>

          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs tracking-[0.16em] text-bg/70">
            {activeIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  );
}

