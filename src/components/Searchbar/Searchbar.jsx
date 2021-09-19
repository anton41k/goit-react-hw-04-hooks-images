import { useState } from "react";

import Button from "../Button/Button";

import css from "./Searchbar.module.css";

export default function SearchForm({ onSubmit }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(query);
    setQuery("");
  };

  return (
    <header className={css.searchbar}>
      <form className={css.search_form} onSubmit={handleSubmit}>
        <Button type="submit" className="search_btn" />
        <input
          className={css.search_form_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </form>
    </header>
  );
}
