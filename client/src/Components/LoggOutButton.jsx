import { Button, useColorModeValue, useToast } from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";
import userAtom from "../atom/userAtom";

const LoggOutButton = () => {
  const setUser = useSetRecoilState(userAtom);
  const toast = useToast();

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
        toast({
          title: "Error",
          description: data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      if (res.ok) {
        // !remove the user from local storage:
        localStorage.removeItem("auth-threads");
        setUser(null);
        toast({
          title: "Success",
          description: "You have logged out successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
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
      Log Out
    </Button>
  );
};

export default LoggOutButton;
