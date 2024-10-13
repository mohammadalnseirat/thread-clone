import {
  Avatar,
  Divider,
  Flex,
  Image,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";

const MessageContainer = () => {
  return (
    <Flex flex={70} borderEndRadius={"md"} p={2} flexDirection={"column"}>
      {/* Message Header start here */}
      <Flex alignItems={"center"} w={"full"} h={12} gap={2}>
        <Avatar src="" size={"sm"} />
        <Text
          display={"flex"}
          fontFamily={"mono"}
          fontSize={"lg"}
          alignItems={"center"}
          gap={1}
        >
          Mark <Image src="/verified.png" w={4} h={4} ml={1} />
        </Text>
      </Flex>
      {/* Message Header end here */}
      <Divider bg={useColorModeValue("green.800", "green.800")} h={"0.5px"} />
      <Flex
        flexDirection={"column"}
        gap={4}
        my={4}
        p={2}
        overflowY={"auto"}
        h={"400px"}
      >
        {/* Skeleton start here */}
        {!true &&
          [...Array(5)].map((_, i) => (
            <Flex
              key={i}
              alignItems={"center"}
              gap={2}
              borderRadius={"md"}
              p={2}
              alignSelf={i % 2 === 0 ? "flex-start" : "flex-end"}
            >
              {i % 2 === 0 && <SkeletonCircle size={10} />}
              <Flex flexDirection={"column"} gap={2}>
                <Skeleton h={"8px"} w={"250px"} />
                <Skeleton h={"8px"} w={"250px"} />
                <Skeleton h={"8px"} w={"250px"} />
              </Flex>
              {i % 2 !== 0 && <SkeletonCircle size={10} />}
            </Flex>
          ))}
        {/* Skeleton end here */}
        {/* message Content start here */}
        <Message ownMessage={true} />
        <Message ownMessage={false} />
        <Message ownMessage={false} />
        <Message ownMessage={true} />
        <Message ownMessage={true} />
        <Message ownMessage={false} />
        {/* message Content end here */}
      </Flex>
      <MessageInput />
    </Flex>
  );
};

export default MessageContainer;
