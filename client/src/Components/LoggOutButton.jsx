import { Button, useColorModeValue, useToast } from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";
import userAtom from "../atom/userAtom";
import useShowToast from "../hooks/useShowToast";
import { RiLogoutCircleRLine } from "react-icons/ri";

const LoggOutButton = () => {
  const setUser = useSetRecoilState(userAtom);
  // const toast = useToast();
  const showToast = useShowToast();

  // handle logout:
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
  return (
    <Button
      onClick={handleLogout}
      colorScheme="yellow"
      color={useColorModeValue("gray.600", "gray.900")}
      position={"fixed"}
      top={"10%"}
      right={"30px"}
      size={"sm"}
    >
      <RiLogoutCircleRLine size={24} title="Log out"/>
    </Button>
  );
};

export default LoggOutButton;
