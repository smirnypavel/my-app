import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import styles from "../../styles/components/Slider/Slider.module.css";
import sliderDefault from "../../public/Slider/sliderDefault.png";

const SimpleSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings}>
        <div>
          <Image
            src={sliderDefault}
            alt=""
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
        <div>
          <Image
            src={sliderDefault}
            alt=""
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
        <div>
          <Image
            src={sliderDefault}
            alt=""
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
        <div>
          <Image
            src={sliderDefault}
            alt=""
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
        <div>
          <Image
            src={sliderDefault}
            alt=""
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
        <div>
          <Image
            src={sliderDefault}
            alt=""
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
      </Slider>
    </div>
  );
};

export default SimpleSlider;
