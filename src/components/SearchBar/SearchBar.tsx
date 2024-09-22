import React from "react";
import { Formik, Form, Field } from "formik";
import styles from "./SearchBar.module.css";
import { toast } from "react-hot-toast";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const handleSubmit = (values: { query: string }, { resetForm }: { resetForm: () => void }) => {
    const { query } = values;
    if (!query.trim()) {
      toast.error("Please enter a search query");
      return;
    }
    onSubmit(query);
    resetForm();
  };

  return (
    <header className={styles.header}>
      <Formik initialValues={{ query: "" }} onSubmit={handleSubmit}>
        <Form className={styles.form}>
          <Field
            type="text"
            name="query"
            placeholder="Search images and photos"
            className={styles.input}
          />
          <button type="submit" className={styles.submitButton}>
            Search
          </button>
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;