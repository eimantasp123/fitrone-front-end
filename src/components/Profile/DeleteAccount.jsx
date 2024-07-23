import { useState } from "react";
import {
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const DeleteAccount = () => {
  const [verificationInput, setVerificationInput] = useState("");
  const [secondVerificationInput, setSecondVerificationInput] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleDelete = () => {
    // Logic to delete the account
    console.log("Account deleted");
    toast({
      title: "Account Deleted",
      description: "Your account has been successfully deleted.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    onClose();
  };

  const handleOpenModal = () => {
    onOpen();
  };

  const handleConfirmDelete = () => {
    if (verificationInput === "DELETE" && secondVerificationInput === "DELETE") {
      handleDelete();
    } else {
      toast({
        title: "Verification Failed",
        description: "Please type DELETE in both input fields to confirm.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="flex flex-col px-8 py-4 xl:flex-col  w-full">
      <h2 className="text-lg font-semibold mb-8 ">Delete Account</h2>
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
          <div className="flex justify-end">
            <button className="bg-red-500 text-sm text-white py-2 px-4 rounded-lg" onClick={handleOpenModal}>
              Delete Account
            </button>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent sx={{ padding: "1.5rem", borderRadius: "0.75rem" }}>
          <ModalHeader>Confirm Account Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody sx={{ padding: "1rem" }}>
            <Text mb={4}>
              Please type <strong>DELETE</strong> in the fields below to confirm you want to delete your account.
            </Text>

            <input
              name="verificationInput"
              className="w-full border border-gray-300 rounded-lg p-2 mb-3"
              placeholder="Type DELETE to confirm"
              value={verificationInput}
              onChange={(e) => setVerificationInput(e.target.value)}
            />
            <input
              name="secondVerificationInput"
              className="w-full border border-gray-300 rounded-lg p-2 "
              placeholder="Type DELETE again to confirm"
              value={secondVerificationInput}
              onChange={(e) => setSecondVerificationInput(e.target.value)}
            />
          </ModalBody>
          <ModalFooter sx={{ paddingTop: "1rem" }}>
            <button className="bg-red-500 text-white text-sm py-2 px-6 rounded-lg mr-3" onClick={handleConfirmDelete}>
              Confirm Delete
            </button>
            <button className="bg-gray-500 text-sm text-white py-2 px-6 rounded-lg" onClick={onClose}>
              Cancel
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DeleteAccount;
