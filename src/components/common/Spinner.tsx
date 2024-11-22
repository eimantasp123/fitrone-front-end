import React from "react";
import { Spinner as ChakraSpinner } from "@chakra-ui/react";

const Spinner: React.FC = () => (
  <div className="flex h-screen w-full items-center justify-center bg-background">
    <ChakraSpinner size="lg" />
  </div>
);

export default Spinner;
