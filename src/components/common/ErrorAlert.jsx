import { Box, Alert, AlertIcon, AlertDescription, Flex, CloseButton } from "@chakra-ui/react";
import PropTypes from "prop-types";

const ErrorAlert = ({ error, clearError }) => {
  if (!error) return null;

  return (
    <Box mt={3}>
      <Alert
        status="error"
        variant="subtle"
        borderRadius={6}
        position="relative"
        sx={{
          backgroundColor: "#ff494932",
          borderColor: "#ff11002b",
          borderWidth: "1px",
          transition: "background-color 0.3s",
        }}
      >
        <Flex direction="row" align="center" justify="space-between" width="100%">
          <Flex align="center" width="90%">
            <AlertIcon boxSize="16px" color="red.500" />
            <AlertDescription fontSize="15px" ml={2} lineHeight="short">
              {error}
            </AlertDescription>
          </Flex>
          <CloseButton position="absolute" right="4px" top="4px" size="sm" onClick={clearError} _hover={{ bg: "transparent" }} />
        </Flex>
      </Alert>
    </Box>
  );
};

ErrorAlert.propTypes = {
  error: PropTypes.string,
  clearError: PropTypes.func.isRequired,
};

export default ErrorAlert;
