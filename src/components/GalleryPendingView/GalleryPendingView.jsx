import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import loadImg from "../../images/loadImg.gif";

export default function GalleryPendingView() {
  const gallery = [];
  for (let index = 0; index < 12; index++) {
    const galleryRes = {
      id: "",
      webformatURL: loadImg,
      tags: "loading",
    };
    galleryRes.id = index;
    gallery.push(galleryRes);
  }
  return <ImageGalleryItem gallery={gallery} onClick={null} />;
}
