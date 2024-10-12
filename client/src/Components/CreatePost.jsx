import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  CloseButton,
  Flex,
  FormControl,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { LuImagePlus } from "react-icons/lu";
import React, { useRef, useState } from "react";
import usePreviewImage from "../hooks/usePreviewImage";
import useShowToast from "../hooks/useShowToast";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atom/userAtom";
import postsAtom from "../atom/postsAtom";
import { useParams } from "react-router-dom";
// ?variable for number of characters:
const MAX_CHARS = 500;
const CreatePost = () => {
  //!get current user:
  const currentUser = useRecoilValue(userAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useRecoilState(postsAtom);
  // !state for reamining number of characters:
  const [remainingCharacters, setRemainingCharacters] = useState(MAX_CHARS);
  const fileImageRef = useRef(null);
  // get username from params:
  const { username } = useParams();
  // !Custom Hook for Image and showToast:
  const { imageUrl, handleImageChange, setImageUrl } = usePreviewImage();
  const showToast = useShowToast();
  // !State For loading:
  const [loading, setLoading] = useState(false);
  // !handle Text Change :
  const handleTextChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length > MAX_CHARS) {
      const truncatedText = inputText.slice(0, MAX_CHARS);
      setPostText(truncatedText);
      setRemainingCharacters(0);
    } else {
      setPostText(inputText);
      setRemainingCharacters(MAX_CHARS - inputText.length);
    }
  };
  // !handle Create Post:
  const handleCreatePost = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/posts/createpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postedBy: currentUser._id,
          text: postText,
          image: imageUrl,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast("Error", data.message, "error");
        return;
      }
      showToast("Success", "Post has been created successfully", "success");
      onClose();
      setPostText("");
      setRemainingCharacters(MAX_CHARS);
      setImageUrl("");
      if (username === currentUser.username) {
        setPosts([data, ...posts]);
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Button
        position={"fixed"}
        bottom={10}
        right={5}
        colorScheme="cyan"
        onClick={onOpen}
        size={{
          base: "sm",
          sm: "md",
        }}
      >
        <AddIcon />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader color={"cyan.500"} fontFamily={"mono"}>
            Create Post
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea
                border={"1px solid"}
                borderColor={"cyan.300"}
                resize={"none"}
                placeholder="What's on your mind?"
                value={postText}
                onChange={handleTextChange}
              />
              <Text
                fontWeight={"bold"}
                fontSize={"sm"}
                textAlign={"right"}
                m={1}
                color={"blue.300"}
              >
                {remainingCharacters} / {MAX_CHARS}
                {remainingCharacters === 0 && (
                  <Text color={"red.500"}>
                    You've reached the maximum character limit.
                  </Text>
                )}
              </Text>
              <Input
                hidden
                type="file"
                ref={fileImageRef}
                onChange={handleImageChange}
              />
              <LuImagePlus
                style={{ marginLeft: "5px", cursor: "pointer", color: "blue" }}
                size={24}
                onClick={() => fileImageRef.current.click()}
              />
            </FormControl>
            {imageUrl && (
              <Flex position={"relative"} mt={5} w={"full"}>
                <Image
                  border={"1px solid"}
                  borderColor={"cyan.300"}
                  borderRadius={6}
                  src={imageUrl}
                  alt="post-image"
                />
                <CloseButton
                  position={"absolute"}
                  top={2}
                  right={2}
                  bg={"red.500"}
                  color={"white"}
                  border={"1px solid"}
                  borderColor={"gray.300"}
                  onClick={() => setImageUrl("")}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={loading}
              spinnerPlacement="end"
              loadingText="creating..."
              colorScheme="green"
              mr={3}
              onClick={handleCreatePost}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
