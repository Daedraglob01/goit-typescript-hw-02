import React from "react";
import styles from "./ErrorNotification.module.css";

interface ErrorNotificationProps {
  message: string;
}

const ErrorNotification: React.FC<ErrorNotificationProps> = ({ message }) => {
  return <div className={`${styles.alertBox} ${styles.error}`}>{message}</div>;
};

export default ErrorNotification;