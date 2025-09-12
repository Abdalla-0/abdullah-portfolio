"use client";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type Props = {
  children: React.ReactNode;
  slidesPerView: number;
  breakpoints?: { [key: number]: { slidesPerView: number } };
  spaceBetween: number;
  navigation?: {
    nextEl: string;
    prevEl: string;
  };
  className?: string;
};

export default function SwiperComponent({
  children,
  slidesPerView = 1,
  breakpoints = {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    },
  },
  spaceBetween = 50,
  navigation,
  className,
}: Props) {
  const slides = React.Children.toArray(children);

  return (
    <Swiper
      spaceBetween={spaceBetween}
      breakpoints={breakpoints}
      slidesPerView={slidesPerView}
      modules={[Navigation]}
      navigation={navigation}
      className={className}
    >
      {slides.map((child, idx) => (
        <SwiperSlide key={(child as React.ReactElement)?.key ?? idx}>
          {child}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
