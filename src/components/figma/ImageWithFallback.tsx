import React, { useState, useRef, useEffect } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
}

export function ImageWithFallback({ 
  src, 
  alt, 
  fallbackSrc = '/placeholder-image.jpg',
  className = '',
  ...props 
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setImgSrc(src);
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
    setIsLoading(false);
  };

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400 text-sm">Loading...</div>
        </div>
      )}
      
      {hasError ? (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <div className="text-4xl mb-2">🥊</div>
            <div className="text-sm">Image unavailable</div>
          </div>
        </div>
      ) : (
        <img
          ref={imgRef}
          src={imgSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          {...props}
        />
      )}
    </div>
  );
}