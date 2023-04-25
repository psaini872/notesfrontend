import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "./helper";

const UserContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Setup User
  const setUpUser = async (
    username,
    email,
    password,
    passwordConfirm,
    endpoint
  ) => {
    let currUser;
    if (endpoint === "login") {
      currUser = {
        email: email,
        password: password,
      };
    } else {
      currUser = {
        username: username,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
      };
    }
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/user/${endpoint}`,
        currUser,
        { withCredentials: true }
      );
      console.log(data.data.User);
      setUser(data.data.User);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    try {
      const data = await axios.get(`${BASE_URL}/api/v1/user/logout`, {
        withCredentials: true,
      });
      setUser(null);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  // getCurent User
  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/user/getCurrentUser`,
        { withCredentials: true }
      );
      console.log(data.user);
      setUser(data.user);
    } catch (error) {
      console.log(error);
      // if (error.response.status === 401) return;
    }
  };
  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUpUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
const useAppContext = () => {
  return useContext(UserContext);
};
export { AppProvider, UserContext, useAppContext };
