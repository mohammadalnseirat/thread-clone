import React from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atom/authAtom";
import useShowToast from "../hooks/useShowToast";
import userAtom from "../atom/userAtom";

export default function SigninCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({});
  const showToast = useShowToast();
  // ! To Toggle between signup and signin(useSetRecoilState):
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const setUser = useSetRecoilState(userAtom);
  // !handle Change Inputs:
  const handleChangeInputs = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  // !handle Submit Data:
  const handleSbmitData = async () => {
    try {
      const res = await fetch("/api/v1/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast("Error", data.message, "error");
        return;
      }
      if (res.ok) {
        // !set the data in local storage:
        localStorage.setItem("auth-threads", JSON.stringify(data));
        setUser(data);
        showToast("Success", "User Signed In Successfully!", "success");
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={8} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign In
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.dark")}
          boxShadow={"lg"}
          p={8}
          w={{
            base: "full",
            sm: "400px",
          }}
        >
          <Stack spacing={4}>
            <Box>
              <FormControl isRequired>
                <FormLabel>Username:</FormLabel>
                <Input
                  type="text"
                  id="username"
                  onChange={handleChangeInputs}
                />
              </FormControl>
            </Box>
            <FormControl isRequired>
              <FormLabel>Password:</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  onChange={handleChangeInputs}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={useColorModeValue("gray.600", "gray.700")}
                color={"white"}
                _hover={{
                  bg: useColorModeValue("gray.700", "gray.800"),
                }}
                onClick={handleSbmitData}
              >
                Sign In
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Don&apos;t have an Account?{" "}
                <Link
                  color={"blue.500"}
                  fontWeight={"semibold"}
                  fontSize={"md"}
                  onClick={() => setAuthScreen("signup")}
                >
                  Sign Up
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
