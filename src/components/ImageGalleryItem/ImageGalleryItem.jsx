import css from "./ImageGalleryItem.module.css";

export default function ImageGallery({ gallery, onClick }) {
  return (
    <>
      {gallery.map((el) => (
        <li
          key={`${el.id}${el.webformatURL}`}
          onClick={() => onClick(el)}
          className={css.photo_card}
        >
          <img src={el.webformatURL} alt={el.tags} className={css.photo_img} />
        </li>
      ))}
    </>
  );
}
