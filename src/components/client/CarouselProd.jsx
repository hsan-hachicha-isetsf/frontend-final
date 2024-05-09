import React from 'react';
import { useSelector} from 'react-redux';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 6 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  }
};

export default function CarouselProd() {

   const { articles } = useSelector((state) => state.storearticles);
   

  return (

    <Carousel
    //partialVisbile
    itemClass="image-item"
    responsive={responsive}
   // showDots={true}
  >
  { articles.map((element) =>  (
        < div key={element._id}>
        <img
          draggable={false}
          style={{ width: "200px", height: "150px" }}
          src={element.imageart}
           />
        <div>{element.designation}</div>
        <div>{element.prix} TND</div>
        </div>
      )
    )}
  </Carousel>
  );
}
