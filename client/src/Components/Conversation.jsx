import {
  Avatar,
  AvatarBadge,
  Flex,
  Image,
  Stack,
  Text,
  useColorModeValue,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";

const Conversation = () => {
  return (
    <Flex
      alignItems={"center"}
      mt={1}
      gap={4}
      p={2}
      borderRadius={"lg"}
      _hover={{
        bg: useColorModeValue("gray.600", "gray.dark"),
        cursor: "pointer",
        color: "white",
      }}
    >
      {/* Add Your Conversation Here */}
      <WrapItem>
        <Avatar
          size={{
            base: "xs",
            sm: "sm",
            md: "md",
          }}
          src="https://bit.ly/borken-link"
        >
          <AvatarBadge boxSize={"1em"} bg="green.500" />
        </Avatar>
      </WrapItem>
      <Stack direction={"column"} fontSize={"sm"}>
        <Text display={"flex"} alignItems={"center"} gap={1}>
          Mark
          <Image src="/verified.png" w={4} h={4} ml={1} />
        </Text>
        <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
          Hello some message ...
        </Text>
      </Stack>
    </Flex>
  );
};

export default Conversation;
