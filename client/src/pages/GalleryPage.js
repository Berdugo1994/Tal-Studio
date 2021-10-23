import React, { useEffect, useState } from "react";
import Gallery from "../components/containers/pageComp/Gallery";
import jsonp from "jsonp";
import { LoadingRings } from "../components/small/Loading";
const GalleryPage = () => {
  const [photos, setPhotos] = useState(undefined);
  useEffect(() => {
    loadPhotos();
  }, []);
  function loadPhotos() {
    const urlParams = {
      api_key: "f785e54a6ca2ee9c8975c336aec7fd48",
      photoset_id: "72157719922265332",
      user_id: "194029309@N02",
      format: "json",
      per_page: "120",
      extras: "url_m,url_c,url_l,url_h,url_o",
      secret: "efd0c633a103a289",
    };

    let url =
      "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos";
    url = Object.keys(urlParams).reduce((acc, item) => {
      return acc + "&" + item + "=" + urlParams[item];
    }, url);

    jsonp(url, { name: "jsonFlickrApi" }, (err, data) => {
      let tmpphotos = data.photoset.photo.map((item) => {
        const percentZoom = 1.5;
        return {
          src: item.url_l, //URL OF THE IMAGE !
          thumbnail: item.url_l,
          title: item.title,
          alt: item.title,
          key: item.id,
          thumbnailWidth: item.width_m * percentZoom,
          thumbnailHeight: item.height_m * percentZoom,
        };
      });
      setPhotos(photos ? tmpphotos.concat(photos) : tmpphotos);
    });
  }
  return (
    <>
      {photos ? (
        <Gallery autoPlay={true} photos={photos} />
      ) : (
        <div
          style={{
            position: "absolute",
            top: "50%",
            width: "100%",
            textAlign: "center",
          }}
        >
          <LoadingRings />
        </div>
      )}
    </>
  );
};
export default GalleryPage;
