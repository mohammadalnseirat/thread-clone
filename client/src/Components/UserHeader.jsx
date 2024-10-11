import {
  Avatar,
  Box,
  Button,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import useShowToast from "../hooks/useShowToast";
import { useRecoilValue } from "recoil";
import userAtom from "../atom/userAtom";
import { Link as RouterLink } from "react-router-dom";

const UserHeader = ({ userProfile }) => {
  // !get cureent user:
  const currentUser = useRecoilValue(userAtom);
  // !state to following user:
  const [following, setFollowing] = useState(
    userProfile.followers.includes(currentUser?._id)
  );
  // !state For Loading:
  const [updating, setUpdating] = useState(false);
  const showToast = useShowToast();
  //! handle Copy URL:
  const handleCopyURL = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      showToast("Success", "URL copied to clipboard successfully", "success");
    });
  };
  // !handle Follow Unfollow User:
  const handleFollowUnfollowSubmit = async () => {
    if (!currentUser) {
      showToast("Error", "Please login to follow/unfollow user", "error");
      return;
    }
    if (updating) {
      showToast("Error", "Please wait while we process your request", "error");
      return;
    }
    setUpdating(true);
    try {
      const res = await fetch(`/api/v1/users/follow/${userProfile._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        showToast("Error", data.message, "error");
        return;
      }
      if (following) {
        // ?unfollow user:
        showToast(
          "Success",
          `Unfollowed ${userProfile.name} successfully!`,
          "success"
        );
        userProfile.followers.pop(); //! simulate removing from followers
      } else {
        // ?follow user:
        showToast(
          "Success",
          `Followed ${userProfile.name} successfully!`,
          "success"
        );
        userProfile.followers.push(currentUser._id); //! simulate adding to followers
      }
      setFollowing(!following);
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setUpdating(false);
    }
  };
  if (!currentUser) {
    return null;
  }
  return (
    <VStack gap={4} alignItems={"start"}>
      {/* first section start here */}
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"} fontFamily={"mono"}>
            {userProfile.name}
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>{userProfile.username}</Text>
            <Text
              fontSize={"xs"}
              bg={"gray.dark"}
              color={"gray.100"}
              p={2}
              borderRadius={"full"}
            >
              Threads.net
            </Text>
          </Flex>
        </Box>
        <Box>
          {userProfile.profilePic && (
            <Avatar
              name={userProfile.name}
              src={userProfile.profilePic}
              size={{
                base: "lg",
                md: "xl",
              }}
            />
          )}
          {!userProfile.profilePic && (
            <Avatar
              name={userProfile.name}
              src="https://bit.ly/broken-link"
              size={{
                base: "lg",
                md: "xl",
              }}
            />
          )}
        </Box>
      </Flex>
      {/* first section end here */}
      <Text fontWeight={"semibold"}>{userProfile.bio}</Text>
      {/* Add Button based on the user to follow or update statrt here */}
      {currentUser?._id === userProfile?._id && (
        <Link as={RouterLink} to={"/update"}>
          <Button size={"sm"} colorScheme="yellow">
            Update Profile
          </Button>
        </Link>
      )}
      {currentUser._id !== userProfile._id && (
        <Button
          isLoading={updating}
          loadingText={following ? "Following..." : "Unfollowing..."}
          spinnerPlacement="end"
          size={"sm"}
          colorScheme="pink"
          onClick={handleFollowUnfollowSubmit}
        >
          {following ? "Unfollow" : "Follow"}
        </Button>
      )}
      {/* Add Button based on the user to follow or update end here */}
      {/* second section start here  */}
      <Flex justifyContent={"space-between"} w={"full"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>
            {userProfile.followers.length}{" "}
            {userProfile.followers.length > 1 ? "Followers" : "Follower"}
          </Text>
          <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color={"gray.light"}>instagram.com</Link>
        </Flex>
        <Flex gap={2} alignItems={"center"}>
          <Box className="icon-container">
            <BsInstagram size={24} cursor={"pointer"} color={"#fd1d1d"} />
          </Box>
          <Box className="icon-container">
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={"pointer"} />
              </MenuButton>
              <Portal>
                <MenuList bg={"gray.700"}>
                  <MenuItem
                    bg={"gray.700"}
                    color={"gray.300"}
                    onClick={handleCopyURL}
                  >
                    Copy Link!
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      {/* second section end here  */}
      {/* third section start here */}
      <Flex w={"full"}>
        <Flex
          justifyContent={"center"}
          borderBottom={"1.5px solid white"}
          pb={"3"}
          cursor={"pointer"}
          flex={1}
        >
          <Text fontWeight={"bold"} fontSize={"lg"}>
            Threads
          </Text>
        </Flex>
        <Flex
          justifyContent={"center"}
          flex={1}
          borderBottom={"1px solid gray"}
          cursor={"pointer"}
          color={"gray.light"}
        >
          <Text fontWeight={"bold"} fontSize={"lg"}>
            Replies
          </Text>
        </Flex>
      </Flex>
      {/* third section end here */}
    </VStack>
  );
};

export default UserHeader;
