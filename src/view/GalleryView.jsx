import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoaderGalery from "../components/Loader/LoaderGalery";
import Searchbar from "../components/Searchbar/Searchbar";
import galleryApi from "../services/gallery-api";
import Button from "../components/Button/Button";
import Modal from "../components/Modal/Modal";
import GalleryImage from "../components/GalleryImage/GalleryImage";
import ImageGalleryItem from "../components/ImageGalleryItem/ImageGalleryItem";

import css from "./GalleryView.module.css";
import GalleryPendingView from "../components/GalleryPendingView/GalleryPendingView";

export default function Component() {
  const [gallery, setGallery] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imgModal, setImgModal] = useState(null);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (searchQuery === "" && !isFirstRender.current) {
      isFirstRender.current = false;
      return toast.error("Search must not be empty!");
    }
    if (searchQuery !== "") {
      fetchGallery();
    }
  }, [searchQuery]);

  const onChangeQuery = (query) => {
    setSearchQuery(query.trim());
    setCurrentPage(1);
    setGallery([]);
  };

  const fetchGallery = () => {
    const options = { searchQuery, currentPage, pageSize };

    setIsLoading(true);

    galleryApi
      .fetchGallery(options)
      .then((data) => {
        if (!data.hits.length) {
          return toast.error(
            `The given request ${searchQuery} is not available!!!`
          );
        }
        setGallery((prevState) => [...prevState, ...data.hits]);
        setCurrentPage((prevState) => prevState + 1);
      })
      .catch((error) => toast.error(error))
      .finally(() => {
        setIsLoading(false);
        showScroll(currentPage);
      });
  };

  const showScroll = (currentPage) => {
    if (currentPage > 1) {
      const cardHeight = document
        .querySelector("ul")
        .firstElementChild.getBoundingClientRect().height;
      const yOffset = window.pageYOffset; // текущее положение скролбара
      window.scrollTo({
        top: yOffset + cardHeight * 2,
        behavior: "smooth",
      });
    }
  };

  const toggleModal = (img) => {
    if (img) {
      const imgModal = { imgUrl: img.largeImageURL, imgAlt: img.tags };
      setImgModal(imgModal);
    }
    setShowModal(!showModal);
  };

  const shouldRenderLoadMoreButton =
    gallery.length > pageSize - 1 && !isLoading;
  return (
    <div className={css.container}>
      <Searchbar onSubmit={onChangeQuery} />

      <GalleryImage>
        {isLoading ? (
          <GalleryPendingView />
        ) : (
          <ImageGalleryItem gallery={gallery} onClick={toggleModal} />
        )}
      </GalleryImage>

      {showModal && <Modal onClose={toggleModal} imgModal={imgModal} />}

      {isLoading && <LoaderGalery />}

      {shouldRenderLoadMoreButton && (
        <Button
          type="button"
          onClick={fetchGallery}
          text="Load more"
          className="load_more"
          isLoading={!isLoading}
        />
      )}
    </div>
  );
}
