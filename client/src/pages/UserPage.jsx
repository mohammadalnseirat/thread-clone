import React, { useEffect, useState } from "react";
import UserHeader from "../Components/UserHeader";
import UserPost from "../Components/UserPost";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Heading, Spinner } from "@chakra-ui/react";
import PostCom from "../Components/PostCom";
const UserPage = () => {
  // !fech the profile and pass to userHeader:
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();
  const showToast = useShowToast();
  // !state for psots:
  const [posts, setPosts] = useState([]);
  const [fetchingPosts, setFetchingPosts] = useState(true);

  // *UseEffect to fetch the data:
  useEffect(() => {
    // ?Function to get profile user based on username:
    const getUserProfile = async () => {
      setLoading(true);
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

    // ?Function to get user post :
    const getUserPosts = async () => {
      setFetchingPosts(true);
      try {
        const res = await fetch(`/api/v1/posts/user/${username}`);
        const data = await res.json();
        if (!res.ok) {
          showToast("Error", data.message, "error");
          return;
        }
        if (res.ok) {
          setPosts(data);
        }
      } catch (error) {
        showToast("Error", error.message, "error");
        setPosts([]);
      } finally {
        setFetchingPosts(false);
      }
    };
    getUserPosts();
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
      {!fetchingPosts && posts.length === 0 && (
        <Heading
          as={"h2"}
          size={"lg"}
          mt={5}
          color={"cyan.900"}
          textAlign={"center"}
        >
          {userProfile.name} has not posted any posts yet.
        </Heading>
      )}
      {fetchingPosts && (
        <Flex justifyContent={"center"} mt={5}>
          <Spinner size={"xl"} color="cyan.900" />
        </Flex>
      )}
      {!fetchingPosts &&
        posts.map((post) => (
          <PostCom kry={post._id} post={post} postedBy={post.postedBy} />
        ))}
    </>
  );
};

export default UserPage;
