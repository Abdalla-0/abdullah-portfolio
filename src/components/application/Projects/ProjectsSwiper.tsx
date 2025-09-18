"use client";

import dynamic from "next/dynamic";

const SwiperComponent = dynamic(
  () => import("@/components/shared/Swiper/SwiperComponent"),
  { ssr: false }
);

export default SwiperComponent;
