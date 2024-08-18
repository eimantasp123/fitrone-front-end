import { useContext, useState } from "react";
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import useCustomToast from "../../hooks/useCustomToast";
import { deleteAccount } from "../../services/reduxSlices/Profile/personalDetailsSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const DeleteAccount = () => {
  const [verificationInput, setVerificationInput] = useState("");
  const [secondVerificationInput, setSecondVerificationInput] = useState("");
  const { updateLoading } = useSelector((state) => state.personalDetails);
  const { setIsAuthenticated } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const customToast = useCustomToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleOpenModal = () => {
    onOpen();
  };

  const handleConfirmDelete = () => {
    if (verificationInput === "DELETE" && secondVerificationInput === "DELETE") {
      handleDelete();
    } else {
      customToast({
        title: "Verification Failed",
        description: "Please type DELETE in both input fields to confirm.",
        status: "error",
      });
    }
  };

  const closeModal = () => {
    onClose();
    setVerificationInput("");
    setSecondVerificationInput("");
  };

  return (
    <div className="flex bg-backgroundLight rounded-lg shadow-custom-dark2 flex-col  p-8 xl:flex-col  w-full">
      {/* <h2 className="text-lg font-semibold mb-8 ">Delete Account</h2> */}
      <div className="px-5 flex flex-col ">
        <div className="space-y-8  w-full  ">
          <div>
            <p className="text-gray-600">
              Deleting your account will permanently remove all your data and you will not be able to recover it. Please consider
              this action carefully.
            </p>
            <p className="text-red-600 mt-4">
              This action is irreversible and will delete all your account data, including settings, preferences, and usage
              history.
            </p>
          </div>
          <div className="flex">
            <button className="bg-red-500 text-sm text-white py-2 px-4 rounded-full" onClick={handleOpenModal}>
              Delete Account
            </button>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} size="lg">
        <ModalOverlay />
        <ModalContent sx={{ padding: "1.5rem", borderRadius: "0.75rem" }}>
          <ModalHeader>Confirm Account Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody sx={{ padding: "1rem" }}>
            <Text mb={4}>
              Please type <strong>DELETE</strong> in the fields below to confirm you want to delete your account.
            </Text>
            <input
              className="`w-1/2 w-full mb-2  text-gray-700  placeholder-gray-400 transition-all duration-300 ease-in-out border px-3 py-[9px] rounded-lg  leading-tight outline-none 
                bg-backgroundLight focus-within:border-[#000] border-[#8f8f8f80] border-gray-300 bg-transparent
                "
              id="verificationInput"
              type="text"
              placeholder="Type DELETE to confirm"
              value={verificationInput}
              onChange={(e) => setVerificationInput(e.target.value)}
            />
            <input
              className="`w-1/2 w-full  text-gray-700  placeholder-gray-400 transition-all duration-300 ease-in-out border px-3 py-[9px] rounded-lg  leading-tight outline-none 
                bg-backgroundLight focus-within:border-[#000] border-[#8f8f8f80] border-gray-300 bg-transparent
                "
              id="secondVerificationInput"
              type="text"
              placeholder="Type DELETE again to confirm"
              value={secondVerificationInput}
              onChange={(e) => setSecondVerificationInput(e.target.value)}
            />
            <div className="flex justify-end mt-5 gap-2">
              <button
                style={{ width: "150px" }}
                className="bg-red-500 text-white text-sm py-2 px-6 rounded-full "
                onClick={handleConfirmDelete}
              >
                {updateLoading ? <Spinner size="sm" /> : "Confirm Delete"}
              </button>
              <button className="bg-secondary text-sm text-white py-2 px-6 rounded-full" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DeleteAccount;
