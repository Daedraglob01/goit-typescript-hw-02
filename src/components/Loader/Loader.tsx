import React from "react";
import { ThreeDots } from "react-loader-spinner";
import styles from "./Loader.module.css";

const Loader: React.FC = () => {
  return (
    <div className={styles.loaderWrapper}>
      <ThreeDots
        height={80} // Попробуйте использовать числа
        width={80}
        radius="9"
        color="#ffffff"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;