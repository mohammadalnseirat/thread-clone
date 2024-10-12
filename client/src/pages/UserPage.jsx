import React, { useEffect, useState } from "react";
import UserHeader from "../Components/UserHeader";
import UserPost from "../Components/UserPost";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Heading, Spinner } from "@chakra-ui/react";
import PostCom from "../Components/PostCom";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useRecoilState } from "recoil";
import postsAtom from "../atom/postsAtom";
const UserPage = () => {
  // !fech the profile and pass to userHeader:
  const [userProfile, setUserProfile] = useState(null);

  const { username } = useParams();
  const showToast = useShowToast();
  // !state for psots:
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [fetchingPosts, setFetchingPosts] = useState(true);
  // !custom hook to get user profile:
  const { user, loading } = useGetUserProfile();

  // *UseEffect to fetch the data:
  useEffect(() => {
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
  }, [username, showToast, setPosts]);
  // !some optimization:
  if (!user && loading) {
    return (
      <Flex justifyContent={"center"} alignItems={"center"} h={"100vh"}>
        <Spinner size={"xl"} color="cyan.900" />
      </Flex>
    );
  }
  // *Return null:
  if (!user && !loading) {
    return <h1>User not Found.</h1>;
  }
  return (
    <>
      <UserHeader user={user} />
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
        <Flex justifyContent={"center"} my={12}>
          <Spinner size={"xl"} color="cyan.900" />
        </Flex>
      )}
      {posts.map((post) => (
        <PostCom kry={post._id} post={post} postedBy={post.postedBy} />
      ))}
    </>
  );
};

export default UserPage;
