import React from "react";
import styles from "./ImageCard.module.css";
import { UnsplashImage } from "../../services/unsplash-api";

interface ImageCardProps {
  image: UnsplashImage;
  openModal: (image: UnsplashImage) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, openModal }) => {
  const handleClick = () => {
    openModal(image);
  };

  return (
    <div className={styles.cardContainer}>
      <img
        src={image.urls.small}
        alt={image.alt_description || "Image description"}
        className={styles.image}
        onClick={handleClick}
      />
    </div>
  );
};

export default ImageCard;