import { Flex, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React from "react";
import { IoSend } from "react-icons/io5";

const MessageInput = () => {
  return (
    <Flex>
      <InputGroup>
        <Input
          placeholder="Type a message..."
          border={"1px solid"}
          borderColor={"#25d366"}
        />
        <InputRightElement cursor={"pointer"} color={"#25d366"}>
          <IoSend size={20} />
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
};

export default MessageInput;
