import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Card, CardContent } from "@material-ui/core";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import jsonp from "jsonp";
//Styles
import "../../styles/components/small/home.css";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

const HomeCarousel = (props) => {
  let firstImages = [
    {
      name: "TAL STUDIO",
      description: "healthy addiction",
      img: "./assets/images/homePage/1000/talstudio.png",
    },
    {
      name: "Tal Studio",
      description: "healthy addiction",
      img: "./assets/images/homePage/1000/kick.png",
    },
  ];
  const [images, setImages] = useState(firstImages);
  useEffect(() => {
    // loadPhotos(); //TODO: uncomment if want to take pic from Flickr!
  }, []);
  function loadPhotos() {
    const urlParams = {
      api_key: "f785e54a6ca2ee9c8975c336aec7fd48",
      photoset_id: "72157720073014745",
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
        return {
          img: item.url_l, //URL OF THE IMAGE !
          name: "TAL STUDIO",
          description: "healthy addiction",
        };
      });
      setImages(images.concat(tmpphotos));
    });
  }
  return (
    <Carousel
      style={{ direction: "rtl" }}
      className='carousel-container'
      // fullHeightHover
      autoPlay={true}
      interval={3000}
      indicators={true}
      PrevIcon={<AiOutlineArrowRight />}
      NextIcon={<AiOutlineArrowLeft />}
    >
      {images.map((image, i) => (
        <Item key={i} item={image} />
      ))}
    </Carousel>
  );
};

function Item(props) {
  return (
    <Card
      style={{
        backgroundImage: `url( ${props.item.img})`,
      }}
      className='home-card-container'
    >
      <CardContent>
        <div className='carousel-card-title'>{props.item.name}</div>
        <div className='carousel-card-body'>{props.item.description}</div>
      </CardContent>
    </Card>
  );
}

HomeCarousel.propTypes = {
  isLogged: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLogged: state.auth.isLoggedIn,
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(HomeCarousel);
