import { Button, Flex, Image, Link, useColorMode } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atom/userAtom";
import { Link as RouterLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { RiLogoutCircleRLine } from "react-icons/ri";
import useLogOut from "../hooks/useLogOut";
import { PiSignInBold } from "react-icons/pi";
import { SiGnuprivacyguard } from "react-icons/si";
import authScreenAtom from "../atom/authAtom";
import { BsChatSquareText } from "react-icons/bs";

const Header = () => {
  // !get the current user:
  const currentUser = useRecoilValue(userAtom);
  // !custom hook for logout functionality:
  const { handleLogout } = useLogOut();
  //! color mode hook from chakra-ui:
  const { colorMode, toggleColorMode } = useColorMode();
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  return (
    <Flex justifyContent={"space-between"} mt={6} mb={12}>
      {currentUser && (
        <Link as={RouterLink} to={"/"}>
          <AiFillHome size={24} />
        </Link>
      )}
      {!currentUser && (
        <Link
          as={RouterLink}
          to={"/auth"}
          onClick={() => setAuthScreen("signin")}
        >
          <PiSignInBold size={28} color="green" />
        </Link>
      )}
      <Image
        cursor={"pointer"}
        w={6}
        h={6}
        alt="Thread-Clone Logo"
        src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
        onClick={toggleColorMode}
      />
      {currentUser && (
        <Flex alignItems={"center"} gap={4}>
          <Link as={RouterLink} to={`/${currentUser.username}`}>
            <RxAvatar size={24} />
          </Link>
          <Link as={RouterLink} to={'/chat'}>
            <BsChatSquareText size={24} color="orange" />
          </Link>
          <Button colorScheme="yellow" size={"xs"} onClick={handleLogout}>
            <RiLogoutCircleRLine size={24} title="Log out" />
          </Button>
        </Flex>
      )}
      {!currentUser && (
        <Link
          as={RouterLink}
          to={"/auth"}
          onClick={() => setAuthScreen("signup")}
        >
          <SiGnuprivacyguard
            size={24}
            style={{
              color: "#fd1d1d",
            }}
          />
        </Link>
      )}
    </Flex>
  );
};

export default Header;
