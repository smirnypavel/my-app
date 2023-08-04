import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import styles from "../../styles/components/Slider/Slider.module.css";
import sliderDefault from "../../public/Slider/sliderDefault.png";

const SimpleSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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
        <div className={styles.slide}>
          <Image
            src={sliderDefault}
            alt=""
            priority
            // fill
            sizes="(min-width: 768px) 70vw, 100vw"
            style={{
              // maxWidth: "700px",
              objectFit: "cover",
              margin: "auto",
            }}
            className={styles.image}
          />
        </div>
        <div className={styles.slide}>
          <Image
            src={sliderDefault}
            alt=""
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            style={{
              // maxWidth: "700px",
              objectFit: "cover",
              margin: "auto",
            }}
            className={styles.image}
          />
        </div>
        <div className={styles.slide}>
          <Image
            src={sliderDefault}
            alt=""
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            style={{
              objectFit: "cover",
              margin: "auto",
            }}
            className={styles.image}
          />
        </div>
        <div className={styles.slide}>
          <Image
            src={sliderDefault}
            alt=""
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            style={{
              objectFit: "cover",
              margin: "auto",
            }}
            className={styles.image}
          />
        </div>
        <div className={styles.slide}>
          <Image
            src={sliderDefault}
            alt=""
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            style={{
              // maxWidth: "700px",
              objectFit: "cover",
              margin: "auto",
            }}
            className={styles.image}
          />
        </div>
        <div className={styles.slide}>
          <Image
            src={sliderDefault}
            alt=""
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            style={{
              objectFit: "cover",
              margin: "auto",
            }}
            className={styles.image}
          />
        </div>
      </Slider>
    </div>
  );
};

export default SimpleSlider;
