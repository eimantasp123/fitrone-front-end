import Arrow from "@/components/common/Arrow";
import React, { useEffect, useRef, useState } from "react";

interface WeeklyPlanCarouselForHeaderProps {
  goBack: boolean;
  currentWeekPlan: string[];
}

const WeeklyPlanCarouselForHeader: React.FC<
  WeeklyPlanCarouselForHeaderProps
> = ({ goBack, currentWeekPlan }) => {
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  // Handle mouse down event
  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    setIsDragging(false);
    setStartX("touches" in e ? e.touches[0].clientX : e.clientX);
    setScrollLeft(carouselRef.current!.scrollLeft);
  };

  // Handle mouse move event
  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    if (startX === 0) return;

    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    const walk = x - startX;
    carouselRef.current!.scrollLeft = scrollLeft - walk;

    if (Math.abs(walk) > 5) {
      setIsDragging(true);
    }
  };

  // Handle mouse up or leave event
  const handleMouseUpOrLeave = () => {
    setStartX(0);
    setScrollLeft(0);
    setTimeout(() => setIsDragging(false), 50);
  };

  // Check if carousel is overflowing
  useEffect(() => {
    const checkOverflow = () => {
      if (carouselRef.current) {
        setIsOverflowing(
          carouselRef.current.scrollWidth > carouselRef.current.clientWidth,
        );
      }
    };

    checkOverflow();

    window.addEventListener("resize", checkOverflow);
    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [currentWeekPlan]);

  // Scroll carousel left or right
  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth - 30;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
  return (
    <div
      className={`flex w-full min-w-[250px] select-none items-center ${
        goBack ? "md:w-[75%]" : "md:w-[65%]"
      } gap-6`}
    >
      {isOverflowing && (
        <span>
          <Arrow
            onClick={() => scrollCarousel("left")}
            type="dark"
            direction="left"
          />
        </span>
      )}
      <div
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUpOrLeave}
        className="flex gap-3 overflow-x-auto scrollbar-none"
      >
        {currentWeekPlan.map((plan, index) => (
          <div
            key={index}
            onClick={() => {
              if (isDragging) {
                return;
              }
            }}
            className="flex cursor-pointer items-center gap-2 text-nowrap rounded-lg bg-neutral-200/50 px-3 py-1 text-sm font-medium text-textPrimary transition-colors duration-200 ease-in hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
          >
            {plan}
          </div>
        ))}
      </div>
      {isOverflowing && (
        <span>
          <Arrow
            onClick={() => scrollCarousel("right")}
            type="dark"
            direction="right"
          />
        </span>
      )}
    </div>
  );
};

export default WeeklyPlanCarouselForHeader;
