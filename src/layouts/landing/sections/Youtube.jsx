import React, { useState } from "react";


const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const videos = [
    "VIDEO_ID_1",
    "VIDEO_ID_2",
    "VIDEO_ID_3",
    // Add more YouTube video IDs as needed
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === videos.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? videos.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div className="flex transition-transform ease-in-out duration-300 transform">
          {videos.map((video, index) => (
            <div
              key={index}
              className={`w-screen h-96 flex-shrink-0 ${
                index === currentSlide ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <iframe
                title={`video-${index}`}
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${video}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          className="flex items-center justify-center w-12 h-12 text-white bg-gray-900 bg-opacity-50 rounded-full"
          onClick={prevSlide}
        >
          l
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          className="flex items-center justify-center w-12 h-12 text-white bg-gray-900 bg-opacity-50 rounded-full"
          onClick={nextSlide}
        >
          R
        </button>
      </div>
    </div>
  );
};

export default Carousel;
