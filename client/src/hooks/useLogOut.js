import React from "react";
import useShowToast from "./useShowToast";
import { useRecoilState, useSetRecoilState } from "recoil";
import userAtom from "../atom/userAtom";

const useLogOut = () => {
  const showToast = useShowToast();
  const setUser = useSetRecoilState(userAtom);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/v1/users/logout", {
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
      if (res.ok) {
        // !remove the user from local storage:
        localStorage.removeItem("auth-threads");
        setUser(null);
        showToast(
          "Success",
          "User has been logged out successfully",
          "success"
        );
      }
    } catch (error) {
      showToast("Error", "Failed to log out. Please try again later", "error");
    }
  };
  return { handleLogout };
};

export default useLogOut;
