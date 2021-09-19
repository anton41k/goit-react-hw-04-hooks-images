import { ImSearch } from "react-icons/im";
import { IconContext } from "react-icons";

import css from "./Button.module.css";

export default function Button({ type, text, className, onClick }) {
  return (
    <button type={type} className={css[className]} onClick={onClick}>
      {text ? (
        text
      ) : (
        <IconContext.Provider value={{ size: "1.4em", color: "gray" }}>
          <ImSearch />
        </IconContext.Provider>
      )}
    </button>
  );
}
