import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Flex, Heading, Spinner } from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";
import PostCom from "../Components/PostCom";
import { useRecoilState } from "recoil";
import postsAtom from "../atom/postsAtom";

const HomePage = () => {
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [loading, setLoading] = useState(true);
  const showToast = useShowToast();

  // !useEffect to fetch feed post from database:
  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true);
      setPosts([]);
      try {
        const res = await fetch("/api/v1/posts/feed");
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
      } finally {
        setLoading(false);
      }
    };
    getFeedPosts();
  }, [showToast, setPosts]);
  return (
    <>
      {!loading && posts.length === 0 && (
        <Heading
          as={"h1"}
          color={"cyan.500"}
          fontSize={"2xl"}
          textAlign={"center"}
        >
          Please Follow someone to see their posts
        </Heading>
      )}
      {loading && (
        <Flex justifyContent={"center"}>
          <Spinner size={"xl"} />
        </Flex>
      )}
      {posts &&
        posts.length > 0 &&
        posts.map((post) => (
          <PostCom key={post._id} post={post} postedBy={post.postedBy} />
        ))}
    </>
  );
};

export default HomePage;
