import { Avatar, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const Message = ({ ownMessage }) => {
  return (
    <>
      {ownMessage ? (
        <Flex gap={2} alignSelf={"flex-end"}>
          <Text
            borderRadius={"md"}
            maxW={"350px"}
            shadow={"md"}
            // border={"1px"}
            // borderColor={useColorModeValue("gray.300", "gray.700")}
            bg={useColorModeValue("#25d366", "green.800")}
            color={useColorModeValue("gray.800", "gray.100")}
            p={2}
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis
            rem quasi porro veritatis
          </Text>
          <Avatar src="" w={7} h={7} />
        </Flex>
      ) : (
        <Flex gap={2}>
          <Avatar src="" w={7} h={7} />
          <Text
            borderRadius={"md"}
            p={2}
            maxW={"350px"}
            // border={"1px solid"}
            // borderColor={useColorModeValue("gray.300", "gray.700")}
            bg={useColorModeValue("gray.50", "gray.900")}
            shadow={"md"}
            onCanPlayThrough={useColorModeValue("gray.800", "gray.50")}
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis
            rem quasi porro veritatis
          </Text>
        </Flex>
      )}
    </>
  );
};

export default Message;
