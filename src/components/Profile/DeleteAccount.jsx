import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { showCustomToast } from "../../hooks/showCustomToast";
import { deleteAccount } from "../../services/reduxSlices/Profile/personalDetailsSlice";
import { useDeleteProfileSchema } from "../../utils/validationSchema";
import CustomInput from "../common/NewCharkaInput";
import RedButton from "../common/RedButton";
import TextButton from "../common/TextButton";

// DeleteAccount component
const DeleteAccount = () => {
  const { t } = useTranslation("profileSettings");
  const { updateLoading } = useSelector((state) => state.personalDetails);
  const [isOpen, setIsOpen] = useState(false);
  const { setIsAuthenticated } = useContext(AuthContext);
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const schema = useDeleteProfileSchema();

  // Form methods
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  // Delete user account from the server
  const handleDelete = async () => {
    try {
      await dispatch(deleteAccount()).unwrap();
      localStorage.removeItem("authenticated");
      showCustomToast({
        title: "Account Deleted",
        description: "Your account has been successfully deleted.",
        status: "success",
      });
      // onClose();
      setIsAuthenticated(false);
      navigate("/login", { replace: true });
    } catch (error) {
      showCustomToast({
        title: "Account Deletion Failed",
        description: error.message,
        status: "error",
      });
    }
  };

  // Close modal
  const closeModal = () => {
    methods.clearErrors();
    methods.reset();
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="border-borderLight dark:border-borderDark flex w-full flex-col rounded-lg border bg-background p-6 shadow-custom-dark2 md:p-8 xl:flex-col">
      {/* Content */}
      <div className="flex flex-col">
        <div className="w-full space-y-8">
          <div className="flex flex-col gap-2 text-sm">
            <p className="text-textPrimary">{t("deleteAccount.description")}</p>
            <p className="mt-1 text-red-600">
              {t("deleteAccount.warningInfo")}
            </p>
          </div>
          <div className="flex justify-end">
            <button
              className="text-sm font-semibold text-red-600"
              onClick={() => setIsOpen(true)}
            >
              {t("deleteAccount.delete")}
            </button>
          </div>
        </div>
      </div>
      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        isCentered
        size={{ base: "xs", md: "lg" }}
      >
        <ModalOverlay />
        <ModalContent sx={{ padding: "1em", borderRadius: "0.75rem" }}>
          <h2 className="p-2 font-medium">{t("deleteAccount.modal.title")}</h2>
          <ModalCloseButton marginTop="2" />
          <ModalBody sx={{ padding: "1rem" }}>
            <FormProvider {...methods}>
              <p className="mb-4 pl-1 text-sm text-textSecondary md:text-base">
                <Trans
                  i18nKey="deleteAccount.modal.description"
                  ns="profileSettings"
                  components={{ 1: <strong /> }}
                />
              </p>
              <form
                onSubmit={methods.handleSubmit(handleDelete)}
                className="flex flex-col gap-3"
              >
                <CustomInput
                  name="verificationInput"
                  placeholder={t("deleteAccount.modal.inputPlaceholder")}
                />
                <CustomInput
                  name="secondVerificationInput"
                  placeholder={t("deleteAccount.modal.inputPlaceholderConfirm")}
                />

                {/*  */}
                <div className="mt-3 flex gap-2 md:justify-end">
                  <RedButton
                    updateLoading={updateLoading}
                    text={t("deleteAccount.modal.delete")}
                    width="180px"
                  />
                  <TextButton
                    text={t("deleteAccount.modal.cancel")}
                    onClick={closeModal}
                  />
                </div>
              </form>
            </FormProvider>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DeleteAccount;
