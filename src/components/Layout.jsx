import {
  Button,
  Flex,
  HStack,
  Spacer,
  Text,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { loginUser } from "@/modules/fetch";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import { useGlobalContext } from "@/context/globalContext";

function Layout({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLogin, setIsLogin] = useState(false);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const isServer = typeof window === "undefined";

    if (isServer) return;

    const token = window?.localStorage?.getItem("token");

    if (token) {
      setIsLogin(true);
    }
  }, []);

  return (
    <>
      <Flex
        padding={4}
        sx={{ position: "sticky", top: 0 }}
        backgroundColor="teal.200"
        color="teal.700"
      >
        <Text as="b" fontSize="xl">
          My Bookstore
        </Text>
        <Spacer />
        <HStack>
          {isLogin && (
            <Link href="/books/create">
              <Button colorScheme="blackAlpha">Create New Book</Button>
            </Link>
          )}
          {!isLogin ? (
            <Button onClick={onOpen} colorScheme="blue">
              Login
            </Button>
          ) : (
            <Button
              colorScheme="blue"
              onClick={() => {
                localStorage.removeItem("token");
                setIsLogin(false);
                router.push("/");
              }}
            >
              Logout
            </Button>
          )}
        </HStack>
        <Modal isOpen={isOpen} onClose={onClose}>
          <form
            id="login-form"
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const token = await loginUser(
                  e.target.email.value,
                  e.target.password.value
                );
                localStorage.setItem("token", token.token);
                setIsLogin(true);
                router.push("/");
                onClose();
              } catch (err) {
                toast({
                  title: "Error",
                  description: err.message,
                  status: "error",
                  duration: 3000,
                  isClosable: true,
                });
              }
            }}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Login</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack>
                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                    />
                  </FormControl>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  form="login-form"
                  colorScheme="blue"
                  mr={3}
                >
                  Login
                </Button>
                <Link href="/register" onClick={onClose}>
                  <Button variant="ghost">
                    Doesn&apos;t Have Account? Click here
                  </Button>
                </Link>
              </ModalFooter>
            </ModalContent>
          </form>
        </Modal>
      </Flex>
      {children}
    </>
  );
}

export default Layout;
