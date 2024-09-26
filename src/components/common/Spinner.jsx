import { Spinner as ChakraSpinner } from "@chakra-ui/react";

const Spinner = () => (
  <div className="flex h-screen w-full items-center justify-center bg-background">
    <ChakraSpinner size="xl" />
  </div>
);

export default Spinner;
