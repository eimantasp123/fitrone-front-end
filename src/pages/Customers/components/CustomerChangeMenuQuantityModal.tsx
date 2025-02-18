import CustomButton from "@/components/common/CustomButton";
import CustomSelect from "@/components/common/CustomSelect";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useColorMode,
} from "@chakra-ui/react";
import { TFunction } from "i18next";
import React from "react";

interface CustomerChangeMenuQuantityModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: TFunction;
  loading: boolean;
  options: {
    key: string;
    title: string;
  }[];
  performAction: () => void;
  menuQuantity: number | null;
  setMenuQuantity: React.Dispatch<React.SetStateAction<number | null>>;
  defaultQuantity: number | null;
}
/**
 *  Modal to change the quantity of a menu
 */
const CustomerChangeMenuQuantityModal: React.FC<
  CustomerChangeMenuQuantityModalProps
> = ({
  isOpen,
  onClose,
  t,
  loading,
  options,
  menuQuantity,
  setMenuQuantity,
  defaultQuantity,
  performAction,
}) => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "sm", md: "2xl" }}
      >
        <ModalOverlay />
        <ModalContent
          p={6}
          sx={{
            borderRadius: "0.75rem",
          }}
          bg={
            colorMode === "light"
              ? "light.background"
              : "dark.backgroundSecondary"
          }
        >
          <div className="flex items-center gap-3 border-b-[1px] border-borderPrimary pb-5">
            <div className="flex items-center gap-4">
              <h4 className="font-semibold md:text-lg">
                {t("changeMenuQuantity")}
              </h4>
            </div>
          </div>
          <ModalCloseButton marginTop="3" />
          <ModalBody style={{ padding: "10px 0px" }}>
            <div className="space-y-2">
              <p className="text-[15px]">
                {t("changeMenuQuantityDescription")}
              </p>
              <CustomSelect
                options={options}
                defaultOption={
                  options.find((item) => Number(item.key) === defaultQuantity)
                    ?.title
                }
                selectedOption={
                  options.find((item) => Number(item.key) === menuQuantity)
                    ?.title
                }
                onChange={(option) => setMenuQuantity(Number(option.key))}
              />
              <CustomButton
                text={t("common:update")}
                widthFull={true}
                loading={loading}
                disabled={loading}
                loadingSpinner={false}
                onClick={() => performAction()}
              />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomerChangeMenuQuantityModal;
