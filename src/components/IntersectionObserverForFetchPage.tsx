import React, { useEffect, useRef } from "react";

interface IntersectionObserverForFetchPageProps {
  onIntersect: () => void;
  hasNextPage: boolean;
  threshold?: number;
  rootMargin?: string;
  height?: string; // Height of the target element
}

/**
 * IntersectionObserverForFetchPage component to fetch more data when the user scrolls to the bottom of the page
 */
const IntersectionObserverForFetchPage: React.FC<
  IntersectionObserverForFetchPageProps
> = ({
  onIntersect,
  hasNextPage,
  threshold = 1.0,
  rootMargin = "0px",
  height = "1px",
}) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          onIntersect();
        }
      },
      { threshold, rootMargin },
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [onIntersect, hasNextPage, threshold, rootMargin]);

  return <div ref={observerRef} style={{ height }} />;
};

export default IntersectionObserverForFetchPage;
