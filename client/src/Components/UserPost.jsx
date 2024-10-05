import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import Actions from "./Actions";

const UserPost = ({ likes, replies, postImg, postTitle }) => {
  const [liked, setLiked] = useState(false);
  return (
    <Link to={"/markzuckerberg/post/1"}>
      <Flex gap={3} mb={4} py={5}>
        {/* left side start here */}
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar size={"md"} name="Mark Zuckerberg" src="/zuck-avatar.png" />
          <Box w={"2px"} h={"full"} bg={"cyan.900"} my={2}></Box>
          <Box position={"relative"} w={"full"}>
            <Avatar
              size={"xs"}
              name="mohammad"
              position={"absolute"}
              top={"0px"}
              left={"15px"}
              padding={"2px"}
              src="https://bit.ly/dan-abramov"
            />
            <Avatar
              size={"xs"}
              name="mohammad"
              position={"absolute"}
              bottom={"0px"}
              right={"-5px"}
              padding={"2px"}
              src="https://bit.ly/prosper-baba"
            />
            <Avatar
              size={"xs"}
              name="mohammad"
              position={"absolute"}
              bottom={"0px"}
              left={"4px"}
              padding={"2px"}
              src="https://bit.ly/ryan-florence"
            />
          </Box>
        </Flex>
        {/* left side end here */}

        {/* right side start here */}
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex alignItems={"center"} gap={1} w={"full"}>
              <Text fontWeight={"bold"} fontSize={"sm"}>
                MarkZuckerberg
              </Text>
              <Image src="/verified.png" w={4} h={4} />
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text fontSize={"sm"} color={"gray.600"} fontWeight={"semibold"}>
                2d
              </Text>
              <Box className="icon-container">
                <BsThreeDots size={24} />
              </Box>
            </Flex>
          </Flex>
          <Text fontSize={"sm"}>{postTitle}</Text>
          {postImg && (
            <Box
              borderRadius={6}
              overflow={"hidden"}
              border={"1px solid"}
              borderColor={"cyan.900"}
            >
              <Image src={postImg} w={"full"} />
            </Box>
          )}
          <Flex gap={3} my={1}>
            <Actions liked={liked} setLiked={setLiked} />
          </Flex>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"} color={"gray.light"}>
              {replies} replies
            </Text>
            <Box w={1} h={1} borderRadius={"full"} bg={"gray.light"}></Box>
            <Text fontSize={"sm"} color={"gray.light"}>
              {likes} likes
            </Text>
          </Flex>
        </Flex>
        {/* right side end here */}
      </Flex>
    </Link>
  );
};

export default UserPost;
