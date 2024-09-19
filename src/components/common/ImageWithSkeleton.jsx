import { useState } from "react";
import PropTypes from "prop-types";
import { SkeletonCircle } from "@chakra-ui/react";

const ImageWithSkeleton = ({ src, alt, size = "44px", className = "mr-4" }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  // const [delayedSrc, setDelayedSrc] = useState(null);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setDelayedSrc(src);
  //   }, 500);

  //   return () => clearTimeout(timer);
  // }, [src]);

  return (
    <div
      className={`relative w-${size} h-${size} ${className}`}
      style={{ width: size, height: size }}
    >
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <SkeletonCircle size={size} />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-${size} h-${size} rounded-full ${!imageLoaded ? "hidden" : ""}`}
        style={{ width: size, height: size }}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
};

ImageWithSkeleton.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
};

export default ImageWithSkeleton;
