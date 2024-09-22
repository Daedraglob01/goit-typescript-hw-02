import React from "react";
import styles from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onLoadMore: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onLoadMore }) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onLoadMore();
  };

  return (
    <button onClick={handleClick} className={styles.loadMoreButton}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;