import React, { useEffect, useState } from "react";
import UserHeader from "../Components/UserHeader";
import UserPost from "../Components/UserPost";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
const UserPage = () => {
  // !fech the profile and pass to userHeader:
  const [userProfile, setUserProfile] = useState(null);
  const { username } = useParams();
  const showToast = useShowToast();

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
      }
    };
    getUserProfile();
  }, [username, showToast]);

  // *Return null:
  if (!userProfile) return null;
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
