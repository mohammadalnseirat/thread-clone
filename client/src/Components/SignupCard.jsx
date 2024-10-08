import React from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atom/authAtom";
import userAtom from "../atom/userAtom";
import useShowToast from "../hooks/useShowToast";

export default function SignupCard() {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const setUser = useSetRecoilState(userAtom);
  // const toast = useToast()
  const showToast = useShowToast();
  // ! To Toggle between signup and signin:
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  //! handle Change Input:
  const handleChangeInput = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  //! handle Submit The Data:
  const handleSubmitData = async () => {
    try {
      const res = await fetch("/api/v1/users/signup", {
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
        showToast(
          "Success",
          "User has been signed up successfully!",
          "success"
        );
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
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.dark")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Full Name:</FormLabel>
                  <Input type="text" id="name" onChange={handleChangeInput} />
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Username:</FormLabel>
                  <Input
                    type="text"
                    id="username"
                    onChange={handleChangeInput}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl isRequired>
              <FormLabel>Email address:</FormLabel>
              <Input type="email" id="email" onChange={handleChangeInput} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password:</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  onChange={handleChangeInput}
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
                onClick={handleSubmitData}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already have an Account?{" "}
                <Link
                  color={"blue.500"}
                  fontWeight={"semibold"}
                  fontSize={"md"}
                  onClick={() => setAuthScreen("signin")}
                >
                  Sign In
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
