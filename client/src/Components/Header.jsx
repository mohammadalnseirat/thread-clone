import { Flex, Image, Link, Text, useColorMode } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../atom/userAtom";
import { Link as RouterLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from 'react-icons/rx'

const Header = () => {
  // !get the current user:
  const currentUser = useRecoilValue(userAtom)
  //! color mode hook from chakra-ui:
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex justifyContent={"space-between"} mt={6} mb={12}>
      {
        currentUser && (
          <Link as={RouterLink} to={"/"}>
          <AiFillHome size={24}/>
          </Link>
        )
      }
      <Image
        cursor={"pointer"}
        w={6}
        h={6}
        alt="Thread-Clone Logo"
        src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
        onClick={toggleColorMode}
      />
      {
        currentUser && (
          <Link as={RouterLink} to={`/${currentUser.username}`}>
            <RxAvatar size={24}/>
          </Link>
          
        )
      }
    </Flex>
  );
};

export default Header;
