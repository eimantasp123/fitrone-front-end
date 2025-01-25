import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

interface ManageGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ManageGroupModal: React.FC<ManageGroupModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Manage Group</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Modal content goes here */}
          <p>This is where you manage groups!</p>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ManageGroupModal;
