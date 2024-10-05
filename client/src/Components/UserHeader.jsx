import {
  Avatar,
  Box,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";

const UserHeader = () => {
  const toast = useToast();
  // handle Copy URL:
  const handleCopyURL = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast({
        title: "Copied to clipboard.",
        description: "URL copied to clipboard successfully!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    });
  };
  return (
    <VStack gap={4} alignItems={"start"}>
      {/* first section start here */}
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"} fontFamily={"mono"}>
            Mark Zuckerberg
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>zuckerberg</Text>
            <Text
              fontSize={"xs"}
              bg={"gray.dark"}
              color={"gray.100"}
              p={2}
              borderRadius={"full"}
            >
              Threads.net
            </Text>
          </Flex>
        </Box>
        <Box>
          <Avatar name="Mark Zuckerberg" src="/zuck-avatar.png" size={"xl"} />
        </Box>
      </Flex>
      {/* first section end here */}
      <Text fontWeight={"semibold"}>
        CO-Founder excutive chairman and CEO of Meta PlatForms.
      </Text>
      {/* second section start here  */}
      <Flex justifyContent={"space-between"} w={"full"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>3.2K Followers</Text>
          <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color={"gray.light"}>instagram.com</Link>
        </Flex>
        <Flex gap={2} alignItems={"center"}>
          <Box className="icon-container">
            <BsInstagram size={24} cursor={"pointer"} color={"#fd1d1d"} />
          </Box>
          <Box className="icon-container">
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={"pointer"} />
              </MenuButton>
              <Portal>
                <MenuList bg={"gray.700"}>
                  <MenuItem
                    bg={"gray.700"}
                    color={"gray.300"}
                    onClick={handleCopyURL}
                  >
                    Copy Link!
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      {/* second section end here  */}
      {/* third section start here */}
      <Flex w={"full"}>
        <Flex
          justifyContent={"center"}
          borderBottom={"1.5px solid white"}
          pb={"3"}
          cursor={"pointer"}
          flex={1}
        >
          <Text fontWeight={"bold"} fontSize={"lg"}>
            Threads
          </Text>
        </Flex>
        <Flex
          justifyContent={"center"}
          flex={1}
          borderBottom={"1px solid gray"}
          cursor={"pointer"}
          color={"gray.light"}
        >
          <Text fontWeight={"bold"} fontSize={"lg"}>
            Replies
          </Text>
        </Flex>
      </Flex>

      {/* third section end here */}
    </VStack>
  );
};

export default UserHeader;
