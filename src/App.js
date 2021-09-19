import React from "react";

import { ToastContainer } from "react-toastify";
import GalleryView from "./view/GalleryView";

export default function App() {
  return (
    <>
      <GalleryView />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
