import { Spinner as ChakraSpinner } from "@chakra-ui/react";

const Spinner = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <ChakraSpinner size="xl" />
  </div>
);

export default Spinner;
