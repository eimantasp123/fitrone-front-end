import { useState } from "react";
/**
 * Hook to handle dynamic disclosure of modals
 */
export const useDynamicDisclosure = () => {
  const [modalState, setModalState] = useState<Record<string, boolean>>({});

  const openModal = (key: string) => {
    setModalState((prev) => ({ ...prev, [key]: true }));
  };

  const closeModal = (key: string) => {
    setModalState((prev) => ({ ...prev, [key]: false }));
  };

  const isOpen = (key: string) => !!modalState[key];

  return { openModal, closeModal, isOpen };
};
