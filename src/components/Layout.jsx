import { Button, Flex, HStack, Spacer, Text } from "@chakra-ui/react";
import Link from "next/link";

import { useEffect, useState } from "react";

function Layout({ children }) {
  // const [isLogin, setIsLogin] = useState(false);

  // useEffect(() => {
  //   const token = window.localStorage.getItem("token");

  //   if (token) {
  //     setIsLogin(true);
  //   } else {
  //     setIsLogin(false);
  //   }
  // }, [window.localStorage.getItem("token")]);

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
        <Link href="/">
          <Button>Login</Button>
        </Link>
        {/* <HStack>
          {isLogin && (
            <Link to="/books">
              <Button colorScheme="blackAlpha">Create New Book</Button>
            </Link>
          )}
          {!isLogin ? (
            <Link to={PATH.login}>
              <Button>Login</Button>
            </Link>
          ) : (
            <Button
              colorScheme="blue"
              onClick={() => {
                window.localStorage.removeItem("token");
                setIsLogin(false);
              }}
            >
              Logout
            </Button>
          )}
        </HStack> */}
      </Flex>
      {children}
    </>
  );
}

export default Layout;
