import {
  Avatar,
  Box,
  Button,
  Divider,
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
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../Components/Actions";
import { FaArrowRight } from "react-icons/fa";
import Comment from "../Components/Comment";
import { useNavigate, useParams } from "react-router-dom";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useRecoilValue } from "recoil";
import userAtom from "../atom/userAtom";
import useShowToast from "../hooks/useShowToast";
import { DeleteIcon } from "@chakra-ui/icons";
import { formatDistanceToNow } from "date-fns";

const PostPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loading, user } = useGetUserProfile();
  const { pId } = useParams();
  const navigate = useNavigate();
  const currentUser = useRecoilValue(userAtom);
  // !useState for save the post:
  const [post, setPost] = useState(null);
  // !custom hook for showToast:
  const showToast = useShowToast();
  const [isDeleting, setIsDeleting] = useState(false);
  // !useEffect to fetch the data and get the single post based on the id:
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`/api/v1/posts/${pId}`);
        const data = await res.json();
        if (!res.ok) {
          showToast("Error", data.message, "error");
          return;
        }
        if (res.ok) {
          setPost(data);
        }
      } catch (error) {
        showToast("Error", error.message, "error");
      }
    };
    getPost();
  }, [showToast, pId]);

  // !function to handle delete post:
  const handleDeletePost = async () => {
    if (isDeleting) {
      return;
    }
    setIsDeleting(true);
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
        navigate(`/${user.username}`);
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsDeleting(false);
    }
  };
  // !some code to optimize the UI:
  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  if (!post) {
    return null;
  }
  return (
    <>
      <Flex>
        <Flex alignItems={"center"} gap={3} w={"full"}>
          <Avatar size={"md"} name={user?.username} src={user?.profilePic} />
          <Flex alignItems={"center"}>
            <Text fontSize={"md"} fontFamily={"mono"} fontWeight={"bold"}>
              {user?.username}
            </Text>
            <Image w={4} h={4} ml={2} src="/verified.png" />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text
            fontSize={"md"}
            w={36}
            textAlign={"right"}
            color={"gray.light"}
            fontWeight={"semibold"}
          >
            {formatDistanceToNow(new Date(post?.createdAt))} ago
          </Text>
          {currentUser?._id === user?._id && (
            <DeleteIcon
              cursor={"pointer"}
              size={36}
              color={"red.500"}
              onClick={(e) => {
                e.preventDefault();
                onOpen();
              }}
            />
          )}
        </Flex>
      </Flex>
      <Text my={3} fontWeight={"semibold"}>
        {post?.text}
      </Text>
      {post?.image && (
        <Box
          borderRadius={6}
          overflow={"hidden"}
          border={"1px solid"}
          borderColor={"cyan.900"}
        >
          <Image src={post?.image} w={"full"} />
        </Box>
      )}
      <Flex gap={3} my={3}>
        <Actions post={post} />
      </Flex>
      {/* <Flex gap={2} alignItems={"center"}>
        <Text fontSize={"sm"} color={"gray.light"}>
          1000 replies
        </Text>
        <Box w={1} h={1} borderRadius={"full"} bg={"gray.light"}></Box>
        <Text fontSize={"sm"} color={"gray.light"}>
          {1000 + (liked ? 1 : 0)} likes
        </Text>
      </Flex> */}
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
                isLoading={isDeleting}
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
      <Divider my={4} bg={"cyan.900"} />
      {post?.replies.map((reply) => (
        <Comment
          key={reply._id}
          reply={reply}
          lastReply={reply._id === post.replies[post.replies.length - 1]._id}
        />
      ))}
    </>
  );
};

export default PostPage;
