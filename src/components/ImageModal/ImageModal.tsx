import React, { useEffect } from "react";
import ReactModal from "react-modal";
import styles from "./ImageModal.module.css";
import { UnsplashImage } from "../../services/unsplash-api";

ReactModal.setAppElement("#root");

interface ImageModalProps {
  isOpen: boolean;
  closeModal: () => void;
  image: UnsplashImage | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, closeModal, image }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      shouldCloseOnEsc={true}
      overlayClassName={styles.overlay}
      className={styles.modal}
      shouldCloseOnOverlayClick={true}
    >
      <button className={styles.closeButton} onClick={closeModal}>
        &times;
      </button>
      <div className={styles.imageContainer}>
        {image && (
          <img src={image.urls.regular} alt={image.alt_description || "Selected image"} className={styles.image} />
        )}
      </div>
    </ReactModal>
  );
};

export default ImageModal;