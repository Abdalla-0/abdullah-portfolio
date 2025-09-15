"use client";
import { Button } from "@/components/ui/button";
import { ChevronsUp } from "lucide-react";
import { useEffect, useState } from "react";

const ScrollTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY >= 200);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      className={`fixed w-12 h-12 text-2xl text-white rounded-full shadow-2xl shadow-primary bottom-16 sm:bottom-5  end-5 z-50 transform transition duration-300 ease-in-out ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-4 scale-95 pointer-events-none"
      }`}
      onClick={scrollToTop}
    >
      <ChevronsUp size={256} />
    </Button>
  );
};

export default ScrollTopButton;
