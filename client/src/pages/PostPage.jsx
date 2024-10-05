import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../Components/Actions";
import { FaArrowRight } from "react-icons/fa";
import Comment from "../Components/Comment";

const PostPage = () => {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <Flex>
        <Flex alignItems={"center"} gap={3} w={"full"}>
          <Avatar size={"md"} name="Mark Zuckerberg" src="/zuck-avatar.png" />
          <Flex alignItems={"center"}>
            <Text fontSize={"md"} fontFamily={"mono"} fontWeight={"bold"}>
              markzuckerberg
            </Text>
            <Image w={4} h={4} ml={2} src="/verified.png" />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"md"} color={"gray.light"} fontWeight={"semibold"}>
            2d
          </Text>
          <Box className="icon-container">
            <BsThreeDots size={24} />
          </Box>
        </Flex>
      </Flex>
      <Text my={3} fontWeight={"semibold"}>
        Let&apos;s Talk about Threads.
      </Text>
      <Box
        borderRadius={6}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"cyan.900"}
      >
        <Image src={"/post1.png"} w={"full"} />
      </Box>
      <Flex gap={3} my={3}>
        <Actions liked={liked} setLiked={setLiked} />
      </Flex>
      <Flex gap={2} alignItems={"center"}>
        <Text fontSize={"sm"} color={"gray.light"}>
          1000 replies
        </Text>
        <Box w={1} h={1} borderRadius={"full"} bg={"gray.light"}></Box>
        <Text fontSize={"sm"} color={"gray.light"}>
          {1000 + (liked ? 1 : 0)} likes
        </Text>
      </Flex>
      <Divider my={4} bg={"cyan.900"} />
      <Flex justifyContent={"space-between"}>
        <Flex alignItems={"center"} gap={2}>
          <Text fontSize={"2xl"}>👋🏻</Text>
          <Text
            textTransform={"capitalize"}
            fontWeight={"semibold"}
            fontFamily={"mono"}
            color={"gray.light"}
          >
            get the app to like,reply and post.
          </Text>
        </Flex>
        <Button
          rightIcon={<FaArrowRight />}
          colorScheme="cyan"
          variant="outline"
        >
          Get
        </Button>
      </Flex>
      <Divider my={4} bg={"cyan.900"} />
      <Comment
        comment="Looks really good!"
        createdAt="2d"
        likes={100}
        username="johndoe"
        userAvatar="https://bit.ly/dan-abramov"
      />
      <Comment
        comment="Amazing!"
        createdAt="1d"
        likes={21}
        username="janedoe"
        userAvatar="https://bit.ly/code-beast"
      />
      <Comment
        comment="Looks good!"
        createdAt="2d"
        likes={42}
        username="sallydoe"
        userAvatar="https://bit.ly/sage-adebayo"
      />
    </>
  );
};

export default PostPage;
