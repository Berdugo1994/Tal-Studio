import React from "react";
import ImageGallery from "react-grid-gallery";
import "../../../styles/components/containers/gallery/gallery_image_gallery.css";

export default function MyGallery(props) {
  return (
    <ImageGallery
      showImageCount={false}
      showLightboxThumbnails={true}
      enableImageSelection={false}
      images={props.photos}
    />
  );
}
