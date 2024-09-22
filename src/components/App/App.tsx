import React, { useState, useEffect } from "react";
import fetchImages, { UnsplashImage } from "../../services/unsplash-api";
import SearchBar from "../SearchBar/SearchBar";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import toast, { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<UnsplashImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [totalImagesCount, setTotalImagesCount] = useState<number>(0);

  useEffect(() => {
    if (searchTerm.trim() === "") return;

    const fetchImagesData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchImages(searchTerm, currentPage);
        if (response) {
          handleImageResults(response.results, response.total);
        } else {
          setFetchError("Unable to fetch images. Please try again.");
        }
      } catch (error) {
        setFetchError("Unable to fetch images. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchImagesData();
  }, [searchTerm, currentPage]);

  const handleImageResults = (results: UnsplashImage[], total: number) => {
    if (currentPage === 1) {
      setImages(results);
      setTotalImagesCount(total);
    } else {
      setImages((prevImages) => [...prevImages, ...results]);
    }

    if (total === 0) {
      toast.error("No images found for the given query.");
    }
  };

  const handleSearchSubmit = (query: string) => {
    setSearchTerm(query);
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleImageSelect = (image: UnsplashImage) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="container">
      <SearchBar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} openModal={handleImageSelect} />
      {isLoading && <Loader />}
      {images.length > 0 && images.length < totalImagesCount && (
        <LoadMoreBtn onLoadMore={handleLoadMore} />
      )}
      {isModalOpen && (
        <ImageModal
          isOpen={isModalOpen}
          closeModal={handleCloseModal}
          image={selectedImage}
        />
      )}
      <Toaster position="top-right" reverseOrder={false} />
      {fetchError && <ErrorMessage message={fetchError} />}
    </div>
  );
};

export default App;