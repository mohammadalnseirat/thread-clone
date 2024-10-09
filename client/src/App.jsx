import { Container } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import React from "react";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./Components/Header";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import { useRecoilValue } from "recoil";
import userAtom from "./atom/userAtom";
import LoggOutButton from "./Components/LoggOutButton";
import UpdateProfilePage from "./pages/UpdateProfilePage";

const App = () => {
  const user = useRecoilValue(userAtom);
  return (
    <Container maxW="620px">
      <Header />
      <Routes>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to={"/auth"} />}
        />
        <Route
          path="/auth"
          element={!user ? <AuthPage /> : <Navigate to={"/"} />}
        />
        <Route
          path={"/update"}
          element={user ? <UpdateProfilePage /> : <Navigate to={"/auth"} />}
        />
        <Route path="/:username" element={<UserPage />} />
        <Route path="/:username/post/:pId" element={<PostPage />} />
      </Routes>
      {user && <LoggOutButton />}
    </Container>
  );
};

export default App;
