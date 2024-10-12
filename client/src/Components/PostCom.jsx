import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Actions from "./Actions";
import useShowToast from "../hooks/useShowToast";
import { formatDistanceToNow } from "date-fns";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atom/userAtom";
import postsAtom from "../atom/postsAtom";

const PostCom = ({ post, postedBy }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState(null);
  const showToast = useShowToast();
  const navigeate = useNavigate();
  const [isdeleted, setIsdeleted] = useState(false);
  // !get the current user:
  const currentUser = useRecoilValue(userAtom);
  // !state global:
  const [posts, setPosts] = useRecoilState(postsAtom);

  // !useEffect To fetch profile user based on postedBy:
  useEffect(() => {
    const getProfileUser = async () => {
      try {
        const res = await fetch("/api/v1/users/profile/" + postedBy);
        const data = await res.json();
        if (!res.ok) {
          showToast("Error", data.message, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error.message, "error");
        setUser(null);
      }
    };
    getProfileUser();
  }, [postedBy, showToast]);
  // !handle Delete Post function:
  const handleDeletePost = async () => {
    if (isdeleted) {
      return;
    }
    setIsdeleted(true);
    try {
      const res = await fetch(`/api/v1/posts/deletepost/${post._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        showToast("Error", data.message, "error");
        return;
      }
      if (res.ok) {
        showToast("Success", data.message, "success");
        onClose();
        setPosts(posts.filter((p) => p._id !== post._id));
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsdeleted(false);
    }
  };
  // !return null if there is no user:
  if (!user) return null;
  return (
    <Link to={`/${user?.username}/post/${post._id}`}>
      <Flex gap={3} mb={4} py={5}>
        {/* left side start here */}
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar
            size={"md"}
            name={user?.name}
            src={user?.profilePic}
            onClick={(e) => {
              e.preventDefault();
              navigeate(`/${user?.username}`);
            }}
          />
          <Box w={"2px"} h={"full"} bg={"cyan.900"} my={2}></Box>
          <Box position={"relative"} w={"full"}>
            {post.replies.length === 0 && <Text textAlign={"center"}>🥱</Text>}
            {post.replies[0] && (
              <Avatar
                size={"xs"}
                name="mohammad"
                position={"absolute"}
                top={"0px"}
                left={"15px"}
                padding={"2px"}
                src={post.replies[0].userProfilePic}
              />
            )}
            {post.replies[1] && (
              <Avatar
                size={"xs"}
                name="mohammad"
                position={"absolute"}
                bottom={"0px"}
                right={"-5px"}
                padding={"2px"}
                src={post.replies[1].userProfilePic}
              />
            )}
            {post.replies[2] && (
              <Avatar
                size={"xs"}
                name="mohammad"
                position={"absolute"}
                bottom={"0px"}
                left={"4px"}
                padding={"2px"}
                src={post.replies[2].userProfilePic}
              />
            )}
          </Box>
        </Flex>
        {/* left side end here */}

        {/* right side start here */}
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex alignItems={"center"} gap={1} w={"full"}>
              <Text
                fontWeight={"bold"}
                fontSize={"sm"}
                onClick={(e) => {
                  e.preventDefault();
                  navigeate(`/${user?.username}`);
                }}
              >
                {user?.username}
              </Text>
              <Image src="/verified.png" w={4} h={4} />
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text
                fontSize={"sm"}
                color={"gray.600"}
                w={36}
                textAlign={"right"}
                fontWeight={"semibold"}
              >
                {formatDistanceToNow(new Date(post.createdAt))} Ago
              </Text>
              {currentUser?._id === user._id && (
                <DeleteIcon
                  size={24}
                  cursor={"pointer"}
                  color={"red"}
                  onClick={(e) => {
                    e.preventDefault();
                    onOpen();
                  }}
                />
              )}
            </Flex>
          </Flex>
          <Text fontSize={"sm"}>{post.text}</Text>
          {post.image && (
            <Box
              borderRadius={6}
              overflow={"hidden"}
              border={"1px solid"}
              borderColor={"cyan.900"}
            >
              <Image src={post.image} w={"full"} />
            </Box>
          )}
          <Flex gap={3} my={1}>
            <Actions post={post} />
          </Flex>
        </Flex>
        {/* right side end here */}
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay
            bg="blackAlpha.300"
            backdropFilter="blur(10px) hue-rotate(90deg)"
          />
          <ModalContent>
            <ModalHeader fontFamily={"mono"}>Delete Post:</ModalHeader>
            <ModalCloseButton bg={"red.500"} />
            <ModalBody pb={6}>
              <Heading
                as={"h4"}
                size={"sm"}
                fontStyle={"italic"}
                textTransform={"capitalize"}
                color={"cyan.500"}
              >
                -Are you sure you want to delete this post?
              </Heading>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="red"
                isLoading={isdeleted}
                loadingText="Deleting..."
                spinnerPlacement="end"
                mr={3}
                onClick={handleDeletePost}
              >
                Delete
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </Link>
  );
};

export default PostCom;
