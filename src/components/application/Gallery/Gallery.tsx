"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

interface GalleryProps {
  items: { id: string; url: string; projectId: string }[];
  className?: string;
  alt: string;
  width?: number;
  height?: number;
}
const Gallery = ({
  items,
  className,
  alt,
  width = 500,
  height = 500,
}: GalleryProps) => {
  if (!items || items.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-[500px] bg-gray-100 text-gray-500 rounded-lg">
        No Items Found
      </div>
    );
  }
  return (
    <Carousel>
      <CarouselContent>
        {items.map((item) => (
          <CarouselItem key={item.id} className={`${className}`}>
            <Image
              src={item.url}
              alt={`${alt}`}
              width={width}
              height={height}
              className="w-full h-full object-contain"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      {items.length > 1 && (
        <>
          <CarouselPrevious className="btn-gallery btn-prev" />
          <CarouselNext className="btn-gallery btn-next" />
        </>
      )}
    </Carousel>
  );
};

export default Gallery;
