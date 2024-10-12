import { Avatar, Box, Divider, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "./Actions";

const Comment = ({ reply, lastReply }) => {
  return (
    <>
      <Flex gap={4} py={2} my={2} w={"full"}>
        <Avatar size={"sm"} name={reply.username} src={reply.userProfilePic} />
        <Flex flexDirection={"column"} gap={2} w={"full"}>
          <Flex
            justifyContent={"space-between"}
            w={"full"}
            alignItems={"center"}
          >
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {reply.username}
            </Text>
            {/* <Flex gap={2} alignItems={"center"}>
              <Text fontSize={"sm"} color={"gray.light"}>
                {createdAt}
              </Text>
              <Box className="icon-container" cursor={"pointer"}>
                <BsThreeDots size={24} />
              </Box>
            </Flex> */}
          </Flex>
          <Text>{reply.text}</Text>
          {/* <Actions liked={liked} setLiked={setLiked} />
          <Text fontSize={"sm"} color={"gray.light"}>
            {likes + (liked ? 1 : 0)} Likes
          </Text> */}
        </Flex>
      </Flex>

      {!lastReply ? <Divider bg={"cyan.900"} /> : null}
    </>
  );
};

export default Comment;
