import React, { useState, useEffect, useRef } from 'react';
import imagesData from './data.js';

const Gallery = () => {
  const [visibleImages, setVisibleImages] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreImages, setHasMoreImages] = useState(true);
  const observerRef = useRef(null);

  useEffect(() => {
    const initialImages = imagesData.slice(0, 12); // Load initial 12 images
    setVisibleImages(initialImages);

    const handleIntersection = (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && hasMoreImages && !isLoadingMore) {
        loadMoreImages();
      }
    };

    const observer = new IntersectionObserver(handleIntersection);
    observerRef.current = observer;

    if (observerRef.current) {
      observerRef.current.observe(document.querySelector('.gallery-container > div:last-child'));
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMoreImages, isLoadingMore, loadMoreImages]); // Include loadMoreImages in the dependency array

  const loadMoreImages = async () => {
    setIsLoadingMore(true);
    const nextImages = imagesData.slice(visibleImages.length, visibleImages.length + 12);

    if (nextImages.length === 0) {
      setHasMoreImages(false);
    } else {
      setVisibleImages([...visibleImages, ...nextImages]);
    }
    setIsLoadingMore(false);
  };

  return (
    <div className="gallery-container">
      {/* ... your JSX for the gallery ... */}
    </div>
  );
};

export default Gallery;


