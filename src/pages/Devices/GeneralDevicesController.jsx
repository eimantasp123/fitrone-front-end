import { useColorMode } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { CiSettings } from "react-icons/ci";
import { devices } from "./mockData/devices";

export default function GeneralDevicesController() {
  const { colorMode } = useColorMode();

  return (
    <div className="flex w-full overflow-y-auto p-6 scrollbar-none md:px-14 md:py-10">
      <div className="container mx-auto mb-4 h-fit w-full max-w-[1400px] md:mb-0">
        <h1 className="text-xl font-semibold text-textPrimary">
          Sync Your Devices
        </h1>
        <p className="mt-2 text-textSecondary">
          Synchronize your devices to track your progress effortlessly, with
          real-time data insights and performance tracking.
        </p>
        <div className="mt-8 grid h-fit w-full grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {/* Container */}
          {devices.map((device) => (
            <Card key={device.title} {...device} colorMode={colorMode} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Card component
const Card = ({
  image,
  title,
  description,
  colorMode,
  imageWidth,
  connected = false,
}) => {
  return (
    <div className="rounded-2xl border border-borderColor bg-background">
      {/* Logo */}
      <div className="h-[70%] space-y-2 p-6">
        <div className="flex h-[20%] items-center">
          <img
            src={image}
            className={` ${imageWidth} invert ${colorMode === "dark" ? "brightness-[0.2]" : "brightness-[0.8]"}`}
            alt="Fitbit"
          />
        </div>

        {/* Title */}
        <h4 className="pt-4 text-lg font-medium">{title}</h4>

        {/* Decription */}
        <p className="leading-snug">{description}</p>

        {/* Line */}
      </div>
      <hr className="w-full border-t-[1px] bg-borderPrimary outline-none" />

      {/* Container actions */}
      <div className="flex h-[30%] items-center justify-between px-6 py-5">
        <div className="flex cursor-pointer items-center gap-1 text-textSecondary transition-colors duration-200 ease-in hover:text-textPrimary">
          <CiSettings className="mt-[1px] text-xl" />
          <p className="text-sm">Manage</p>
        </div>
        <button
          className={`rounded-full border border-borderPrimary bg-background ${connected ? `${colorMode === "dark" ? "hover:bg-red-500/10" : "hover:bg-red-100"} border-red-500 text-red-500` : ""} px-14 py-2 text-sm transition-colors duration-200 ease-in-out hover:bg-backgroundSecondary`}
        >
          {connected ? "Disconect" : "Connect"}
        </button>
      </div>
    </div>
  );
};

Card.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  colorMode: PropTypes.string,
  imageWidth: PropTypes.string,
  connected: PropTypes.bool,
};
