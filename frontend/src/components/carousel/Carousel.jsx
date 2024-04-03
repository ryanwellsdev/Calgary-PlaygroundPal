import React, { useState } from "react";
import "./Carousel.css";
const Carousel = ({ images }) => {
  const [bigImage, setBigImage] = useState(images[0]);
  const handleImageClick = (image) => {
    setBigImage(image);
  };
  const smallImagesWithoutBigImage = images.filter(
    (image) => image !== bigImage
  );
  return (
    <div className="carouselContainer">
      <div className="bigImage">
        <img src={bigImage} alt="" />
      </div>
      <div className="smallImages">
        {smallImagesWithoutBigImage.map((image, index) => (
          <img
            src={image}
            alt=""
            key={index}
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
