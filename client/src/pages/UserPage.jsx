import React, { useEffect, useState } from "react";
import UserHeader from "../Components/UserHeader";
import UserPost from "../Components/UserPost";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";
const UserPage = () => {
  // !fech the profile and pass to userHeader:
  const [userProfile, setUserProfile] = useState(null);
  const { username } = useParams();
  const showToast = useShowToast();
  const [loading, setLoading] = useState(true);

  // *UseEffect to fetch the data:
  useEffect(() => {
    // ?Function to get profile user based on username:
    const getUserProfile = async () => {
      try {
        const res = await fetch(`/api/v1/users/profile/${username}`);
        const data = await res.json();
        if (!res.ok) {
          showToast("Error", data.message, "error");
          return;
        }
        setUserProfile(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };
    getUserProfile();
  }, [username, showToast]);

  if (!userProfile && loading) {
    return (
      <Flex justifyContent={"center"} alignItems={"center"} h={"100vh"}>
        <Spinner size={"xl"} color="cyan.900" />
      </Flex>
    );
  }
  // *Return null:
  if (!userProfile && !loading) {
    return <h1>User not Found.</h1>;
  }
  return (
    <>
      <UserHeader userProfile={userProfile} />
      <UserPost
        likes={1200}
        replies={481}
        postImg="/post1.png"
        postTitle="Let's talk about threads."
      />
      <UserPost
        likes={451}
        replies={12}
        postImg="/post2.png"
        postTitle="Nice tutorial. Highly recommended."
      />
      <UserPost
        likes={6721}
        replies={989}
        postImg="/post3.png"
        postTitle="I love this guy and can't wait to see him in cage. 💪"
      />
      <UserPost likes={212} replies={56} postTitle="This is my first thread." />
    </>
  );
};

export default UserPage;
