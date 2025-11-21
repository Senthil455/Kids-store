"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-fade";


// import required modules
import { Autoplay, EffectFade } from "swiper/modules";

function Banner() {
  return (
    <div className="slider">
      <Swiper
        rewind={true}
        loop={true}
        effect="fade"
        speed={800}
        autoplay={{ delay: 2000 }}
        modules={[Autoplay, EffectFade]}
        className="mySwiper home-slider"
      >
        <SwiperSlide>
          <Image
            width={400}
            height={400}
            src="https://images.unsplash.com/photo-1684244160171-97f5dac39204?auto=format&fit=crop&w=600&h=600&q=80"
            alt="Slide"
            priority
            sizes="100vw"
            fetchPriority="high"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={400}
            height={400}
            src="https://images.unsplash.com/photo-1684244160171-97f5dac39204?auto=format&fit=crop&w=600&h=600&q=80"
            alt="Slide"
            priority
            sizes="100vw"
            fetchPriority="high"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={400}
            height={400}
            src="https://images.unsplash.com/photo-1684244160171-97f5dac39204?auto=format&fit=crop&w=600&h=600&q=80"
            alt="Slide"
            fetchPriority="high"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={400}
            height={400}
            src="https://images.unsplash.com/photo-1684244160171-97f5dac39204?auto=format&fit=crop&w=600&h=600&q=80"
            alt="Slide"
            priority
            sizes="100vw"
            fetchPriority="high"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={400}
            height={400}
            src="https://images.unsplash.com/photo-1684244160171-97f5dac39204?auto=format&fit=crop&w=600&h=600&q=80"
            alt="Slide"
            priority
            sizes="100vw"
            fetchPriority="high"
          />
        </SwiperSlide>
      </Swiper>
    </div>

  );
}

export default Banner;
