import css from "./GalleryImage.module.css";

export default function GalleryImage({ children }) {
  return <ul className={css.gallery_list}>{children}</ul>;
}
