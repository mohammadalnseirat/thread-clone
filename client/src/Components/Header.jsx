import { Flex, Image, useColorMode } from "@chakra-ui/react";
import React from "react";

const Header = () => {
  // color mode hook from chakra-ui:
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex justifyContent={"center"} mt={6} mb={12}>
      <Image
        cursor={"pointer"}
        w={6}
        h={6}
        alt="Thread-Clone Logo"
        src={colorMode === "dark" ? "/light-logo.svg" : "dark-logo.svg"}
        onClick={toggleColorMode}
      />
    </Flex>
  );
};

export default Header;
