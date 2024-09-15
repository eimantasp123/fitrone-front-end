import PropTypes from "prop-types";
import { BsInfoCircle } from "react-icons/bs";

export default function SuccessulAlert({ successMessage = "", description = "" }) {
  return (
    <div className="w-full p-6 flex items-center shadow-custom-light2 justify-center flex-col gap-3 text-center border border-borderColor bg-backgroundSecondary rounded-lg ">
      <BsInfoCircle className="text-lg text-textPrimary" />
      <div className=" font-semibold text-textPrimary">{successMessage}</div>
      <div className="font-normal text-textSecondary">{description}</div>
    </div>

    // <Box maxW="md" mx="auto" borderRadius="md" boxShadow="sm">
    //   <Alert
    //     status="info"
    //     variant="subtle"
    //     flexDirection="column"
    //     alignItems="center"
    //     borderRadius="lg"
    //     bg="#e9e9e90"
    //     border="1px solid #353535"
    //     justifyContent="center"
    //     textAlign="center"
    //     height="auto"
    //     py={6}
    //     px={6}
    //     boxShadow="0 4px 6px rgba(0, 0, 0, 0.02), 0 10px 20px rgba(0, 0, 0, 0.02)"
    //   >
    //     <AlertIcon color="gray.200" boxSize="20px" mb={5} />
    //     <Box>
    //       <AlertTitle mb={2} lineHeight="short">
    //         {successMessage}
    //       </AlertTitle>
    //       <AlertDescription maxWidth="sm" lineHeight="short">
    //         {description}
    //       </AlertDescription>
    //     </Box>
    //   </Alert>
    // </Box>
  );
}

SuccessulAlert.propTypes = {
  successMessage: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};
