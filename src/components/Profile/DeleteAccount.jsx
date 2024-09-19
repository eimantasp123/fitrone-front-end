import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import useCustomToast from "../../hooks/useCustomToast";
import { deleteAccount } from "../../services/reduxSlices/Profile/personalDetailsSlice";
import { deleteProfileSchema } from "../../utils/validationSchema";
import InputField from "../common/InputField";
import RedButton from "../common/RedButton";
import TextButton from "../common/TextButton";

// DeleteAccount component
const DeleteAccount = () => {
  const { updateLoading } = useSelector((state) => state.personalDetails);
  const { setIsAuthenticated } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const customToast = useCustomToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form methods
  const methods = useForm({
    resolver: yupResolver(deleteProfileSchema),
  });

  // Delete user account from the server
  const handleDelete = async () => {
    try {
      await dispatch(deleteAccount()).unwrap();
      localStorage.removeItem("authenticated");
      customToast({
        title: "Account Deleted",
        description: "Your account has been successfully deleted.",
        status: "success",
      });
      onClose();
      setIsAuthenticated(false);
      navigate("/login", { replace: true });
    } catch (error) {
      customToast({
        title: "Account Deletion Failed",
        description: error.message,
        status: "error",
      });
    }
  };

  // Close modal
  const closeModal = () => {
    methods.clearErrors();
    onClose();
  };

  return (
    <div className="border-border flex w-full flex-col rounded-2xl border bg-background p-6 shadow-custom-dark2 md:p-8 xl:flex-col">
      {/* Content */}
      <div className="flex flex-col">
        <div className="w-full space-y-8">
          <div className="flex flex-col gap-2">
            <p className="text-textPrimary">
              Deleting your account will permanently remove all your data and
              you will not be able to recover it. Please consider this action
              carefully.
            </p>
            <p className="mt-1 text-red-600">
              This action is irreversible and will delete all your account data,
              including settings, preferences, and usage history.
            </p>
          </div>
          <div className="flex justify-end">
            <button
              className="text-sm font-semibold text-red-600"
              onClick={onOpen}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        size={{ base: "sm", md: "lg" }}
      >
        <ModalOverlay />
        <ModalContent sx={{ padding: "1em", borderRadius: "0.75rem" }}>
          <ModalHeader>Confirm Account Deletion</ModalHeader>
          <ModalCloseButton marginTop="2" />
          <ModalBody sx={{ padding: "1rem" }}>
            <FormProvider {...methods}>
              <p className="mb-4 pl-1 text-textSecondary">
                Please type <strong>DELETE</strong> in the fields below to
                confirm you want to delete your account.
              </p>
              <form
                onSubmit={methods.handleSubmit(handleDelete)}
                className="flex flex-col gap-3"
              >
                <InputField
                  name="verificationInput"
                  placeholder="Type DELETE to confirm"
                  type="text"
                />
                <InputField
                  name="secondVerificationInput"
                  placeholder="Type DELETE again to confirm"
                  type="text"
                />

                {/*  */}
                <div className="mt-3 flex justify-end gap-2">
                  <RedButton
                    updateLoading={updateLoading}
                    text="Confirm Delete"
                    width="150px"
                  />
                  <TextButton text="Cancel" onClick={closeModal} />
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
