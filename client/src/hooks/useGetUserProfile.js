import React, { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { useParams } from "react-router-dom";

const useGetUserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const showToast = useShowToast();
  const { username } = useParams();
  // !UseEffect to fetch the data and get profile user:
  useEffect(() => {
    const getUserProfile = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/v1/users/profile/${username}`);
        const data = await res.json();
        if (!res.ok) {
          showToast("Error", data.message, "error");
          return;
        }
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        showToast("Error", error.message, "error");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    // !call function:
    getUserProfile();
  }, [username, showToast]);
  return { user, loading };
};

export default useGetUserProfile;
