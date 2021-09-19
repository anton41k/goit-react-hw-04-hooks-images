import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

export default function Modal({ onClose, imgModal }) {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
  }, []);

  useEffect(() => {
    return function cleanUp() {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "visible";
    };
  });

  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      onClose();
    }
  };

  const handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  const { imgUrl, imgAlt } = imgModal;
  return createPortal(
    <div className={css.modal_backdrop} onClick={handleBackdropClick}>
      <div className={css.modal_content}>
        <img src={imgUrl} alt={imgAlt} className={css.modal_img} />
      </div>
    </div>,
    modalRoot
  );
}
