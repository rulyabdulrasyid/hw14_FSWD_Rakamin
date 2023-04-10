import BookForm from "@/components/BookForm";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";

export default function NewBookPage() {
  return (
    <Box w="full" py={4} px={24} mx="auto" mt={8}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Add New Book
      </Text>
      <Box borderWidth="1px" borderRadius="lg" p={4}>
        <BookForm />;
      </Box>
    </Box>
  );
}
