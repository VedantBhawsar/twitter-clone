import { useUseStore } from "@/stores/useStore";
import axios from "axios";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export function useAuth() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [currentUser, setCurrentUser] = useState<{
  //   _id: string;
  //   name: string;
  //   surname: string;
  //   email: string;
  //   username: string;
  //   password: string;
  //   followers: string[];
  //   followings: string[];
  //   createdAt: string;
  // }>();

  const currentUser = useUseStore((state) => state.user);
  const setCurrentUser = useUseStore((state) => state.setUser);

  const [user, setUser] = useState<{
    _id: string;
    name: string;
    surname: string;
    email: string;
    username: string;
    password: string;
    followers: string[];
    followings: string[];
    createdAt: string;
    images: {
      profileImage: string;
    };
  }>();

  function parseCookies() {
    try {
      const cookies = document?.cookie
        ?.split(";")
        ?.map((cookie) => cookie?.trim());
      if (!cookies) {
        return null;
      } else {
        const user = cookies.map((cookie) => cookie.split("=")[1]);
        return { id: user[0], token: user[1] };
      }
    } catch (error: any) {
      console.log(error.message);
      return;
    }
  }

  async function validateToken() {
    try {
      const { data } = await axios.get("/api/user/validatetoken", {
        withCredentials: true,
      });
      setCurrentUser(data);
      return { ...data } ?? undefined;
    } catch (error: any) {
      document.cookie = "";
      router.push("/login");
      toast.error(error.response.data.message, {
        position: "bottom-center",
        style: {
          borderRadius: "20px",
          background: "#444",
          opacity: 0.1,
          color: "#fff",
        },
      });
      return undefined;
    }
  }

  async function validateUsername(username: string) {
    try {
      const { data } = await axios.get(`/api/user/validusername/${username}`);
      return data.available;
    } catch (error: any) {
      console.log(error.response.data.message);
      return null;
    }
  }

  async function validateEmail(email: string) {
    try {
      const { data } = await axios.get(`/api/user/validemail/${email}`);
      return data.available;
    } catch (error: any) {
      console.log(error.response.data.message);
      return null;
    }
  }

  async function fetchUser(id: string) {
    try {
      const { data } = await axios.get("/api/user/" + id);
      setCurrentUser(data);
      return { ...data };
    } catch (error: any) {
      toast.error(error.response.data.message, {
        position: "bottom-center",
        style: {
          borderRadius: "20px",
          background: "#444",
          opacity: 0.1,
          color: "#fff",
        },
      });
    }
  }

  async function handleLogin(value: { email: string; password: string }) {
    setIsLoading((prev) => true);
    try {
      const { data } = await axios.post("/api/user/login", value);
      document.cookie = `id=${data.user._id};`;
      document.cookie = `access_token=${data.jwt};`;

      toast.success(data.message, {
        position: "bottom-center",
        style: {
          borderRadius: "20px",
          background: "#444",
          opacity: 0.1,
          color: "#fff",
        },
      });

      setCurrentUser(data.user);
      router.push("/");
    } catch (error: any) {
      toast.error(error.response.data.message, {
        position: "bottom-center",
        style: {
          borderRadius: "20px",
          background: "#444",
          opacity: 0.1,
          color: "#fff",
        },
      });
    } finally {
      setIsLoading((prev) => false);
    }
  }

  async function handleRegister(value: {
    name: string;
    surname: string;
    username: string;
    email: string;
    dob: string;
    password: string;
  }) {
    try {
      const { data } = await axios.post("/api/user/register", value);
      document.cookie = `id=${data.user._id};`;
      document.cookie = `access_token=${data.jwt};`;
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response.data.message, {
        position: "bottom-center",
        style: {
          borderRadius: "20px",
          background: "#444",
          opacity: 0.1,
          color: "#fff",
        },
      });
    }
  }

  return {
    isLoading,
    error,
    isAuthenticated,
    fetchUser,
    validateUsername,
    parseCookies,
    user,
    handleLogin,
    validateToken,
    handleRegister,
    validateEmail,
  };
}
