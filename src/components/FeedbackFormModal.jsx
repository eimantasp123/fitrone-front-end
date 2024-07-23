import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  useToast,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

export default function FeedbackFormModal({ isOpen, onClose }) {
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");
  const toast = useToast();

  const handleRatingClick = (ratingValue) => {
    setRating(ratingValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here

    console.log("Rating:", rating);
    console.log("Comment:", comment);

    // Reset form fields
    setRating(null);
    setComment("");
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback!",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent p={6} borderRadius="lg" maxWidth="600px">
        <ModalHeader>Feedback</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <Heading as="h3" size="md" textAlign="center" mb={4}>
              How are you feeling?
            </Heading>
            <Box textAlign="center" mb={4}>
              Your input is valuable in helping us better understand your needs and tailor our service accordingly.
            </Box>
            <Box className="flex justify-center mb-6">
              {["😢", "😟", "😐", "😊", "😂"].map((emoji, index) => (
                <button
                  type="button"
                  key={index}
                  className={`text-3xl mx-1 ${rating === index ? "transform scale-125" : ""}`}
                  onClick={() => handleRatingClick(index)}
                >
                  {emoji}
                </button>
              ))}
            </Box>
            {rating !== null && (
              <Box textAlign="center" mb={4}>
                <span className="inline-block bg-gray-200 text-gray-800 px-3 py-1 rounded-full">
                  {["Very Bad", "Bad", "Neutral", "Good", "Very Good"][rating]}
                </span>
              </Box>
            )}
            <FormControl id="comment" isRequired mb={4}>
              <FormLabel>Add a Comment</FormLabel>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Your Comment"
                rows={4}
                borderRadius="md"
                focusBorderColor="#8d8d8d"
              />
            </FormControl>
            <Button
              type="submit"
              bg="#E8F044" // accent1 color
              color="black"
              fontWeight={500}
              borderRadius="full"
              _hover={{ bg: "#DAE140" }} // accent1Dark color
              _active={{ bg: "#B3B93A" }} // accent1Darker color
              mt={4}
              p={6}
              width="full"
            >
              Submit Now
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

FeedbackFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
