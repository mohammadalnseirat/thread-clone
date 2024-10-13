import {
  Box,
  Button,
  Flex,
  Input,
  Skeleton,
  SkeletonCircle,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Conversation from "../Components/Conversation";
import { Search2Icon } from "@chakra-ui/icons";
import { GiConversation } from "react-icons/gi";
import MessageContainer from "../Components/MessageContainer";

const ChatPage = () => {
  return (
    <Box
      position={"absolute"}
      left={"50%"}
      p={4}
      transform={"translateX(-50%)"}
      w={{
        base: "100%",
        md: "80%",
        lg: "800px",
      }}
    >
      <Flex
        flexDirection={{
          base: "column",
          md: "row",
        }}
        maxW={{
          sm: "400px",
          md: "full",
        }}
        mx={"auto"}
        gap={4}
      >
        {/* Conversation start here */}
        <Flex
          flex={30}
          flexDirection={"column"}
          mx={"auto"}
          gap={2}
          maxW={{
            sm: "250px",
            md: "full",
          }}
        >
          <Text
            fontWeight={800}
            fontFamily={"mono"}
            textTransform={"capitalize"}
            color={"green.500"}
            fontSize={"xl"}
          >
            Your Conversation:
          </Text>
          <form>
            <Flex
              mb={2}
              alignItems={"center"}
              gap={1}
              borderRadius={"md"}
              p={1}
            >
              <Input
                border={"1px solid"}
                borderColor={"gray.300"}
                placeholder="Search for conversation..."
              />
              <Button colorScheme="pink" size={"md"}>
                <Search2Icon />
              </Button>
            </Flex>
          </form>
          {/* skeleton start here */}
          {false &&
            [0, 1, 2, 3, 4].map((_, i) => (
              <Flex
                key={i}
                gap={4}
                alignItems={"center"}
                borderRadius={"md"}
                p={1}
              >
                <Box>
                  <SkeletonCircle size={"10"} />
                </Box>
                <Flex flexDirection={"column"} gap={3} w={"full"}>
                  <Skeleton w={"80%"} h={"10px"} />
                  <Skeleton w={"90%"} h={"8px"} />
                </Flex>
              </Flex>
            ))}
          {/* skeleton end here */}
          <Conversation />
          <Conversation />
          <Conversation />
        </Flex>
        {/* Conversation end here */}
        {/* Select a user to start chat start shere */}
        {/* <Flex
          flex={70}
          borderRadius={"md"}
          alignItems={"center"}
          justifyContent={"center"}
          height={"400px"}
          flexDirection={"column"}
        >
          <GiConversation size={100} color="red" />
          <Text fontSize={20} textTransform={"capitalize"} color={"gray.500"} fontWeight={"semibold"}>
            Select a conversation to start chating...
          </Text>
        </Flex> */}
        {/* Select a user to start chat end shere */}
        {/* Message Start Here */}
        <MessageContainer />
        {/* Message End Here */}
      </Flex>
    </Box>
  );
};

export default ChatPage;
