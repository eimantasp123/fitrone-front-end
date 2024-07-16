import { Alert, AlertDescription, AlertIcon, AlertTitle, Box } from "@chakra-ui/react";
import PropTypes from "prop-types";

export default function SuccessulAlert({ successMessage = "", description = "" }) {
  return (
    <Box maxW="md" mx="auto" borderRadius="md" boxShadow="sm">
      <Alert
        status="info"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        borderRadius="lg"
        bg="#fff"
        justifyContent="center"
        textAlign="center"
        height="auto"
        py={6}
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.02), 0 10px 20px rgba(0, 0, 0, 0.02)"
      >
        <AlertIcon color="gray.800" boxSize="20px" mb={5} />
        <Box>
          <AlertTitle mb={2} fontSize="17px" lineHeight="short">
            {successMessage}
          </AlertTitle>
          <AlertDescription maxWidth="sm" lineHeight="short">
            {description}
          </AlertDescription>
        </Box>
      </Alert>
    </Box>
  );
}

SuccessulAlert.propTypes = {
  successMessage: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};
