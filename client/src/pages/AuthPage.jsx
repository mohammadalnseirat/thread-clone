import React from "react";
import SignupCard from "../Components/SignupCard";
import SigninCard from "../Components/SigninCard";
import { useRecoilValue } from "recoil";
import authScreenAtom from "../atom/authAtom";

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);
  return <>{authScreenState === "signin" ? <SigninCard /> : <SignupCard />}</>;
};

export default AuthPage;
