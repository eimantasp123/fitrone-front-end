import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

interface GeneralModalToSearchAddressGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * General Modal to show the guide on how to search for an address
 */
const GeneralModalToSearchAddressGuide = ({
  isOpen,
  onClose,
}: GeneralModalToSearchAddressGuideProps) => {
  const { t } = useTranslation("common");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      size={{ base: "sm", md: "2xl" }}
    >
      <ModalOverlay />
      <ModalContent
        p={6}
        sx={{
          borderRadius: "0.75rem",
        }}
      >
        <div className="flex items-center gap-3 border-b-[1px] border-borderPrimary pb-5">
          <div className="flex items-center gap-4">
            <h4 className="text-md font-semibold md:text-xl">
              {t("howToSearchAddress")}
            </h4>
          </div>
        </div>
        <ModalCloseButton marginTop="3" />
        <ModalBody style={{ padding: "0px 0px" }}>
          <div className="my-4 flex flex-col gap-1 text-sm">
            <div>
              1. {t("openGoogleMaps")}{" "}
              <span
                className="cursor-pointer font-medium"
                onClick={() =>
                  window.open("https://www.google.com/maps", "_blank")
                }
              >
                Google Maps
              </span>
            </div>
            <div>2. {t("searchYourAddress")}</div>
            <div className="mb-2 flex flex-col gap-2">
              <p>3. {t("copyDisplayedAddress")}</p>
              <img
                src="/google-maps.png"
                alt="Google Maps"
                className="w-[300px]"
              />
            </div>
            <div>4. {t("pasteAddressInForm")}</div>
            <div>5. {t("clickSearchToFind")}</div>
            <div>6. {t("selectCorrectAddress")}</div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default GeneralModalToSearchAddressGuide;
