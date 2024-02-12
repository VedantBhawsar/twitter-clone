import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export function useAuth() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  function parseCookies() {
    const cookies = document?.cookie
      ?.split(";")
      ?.map((cookie) => cookie?.trim());
    const user = cookies ? JSON.parse(cookies[0]) : null;
    return (
      {
        id: user?.id,
        token: user?.token,
      } ?? undefined
    );
  }

  async function validateToken() {
    const { token } = parseCookies();
    try {
      const { data } = await axios.get("/api/user/validatetoken", {
        withCredentials: true,
      });
      setIsAuthenticated(true);
      setUser(data);
      console.log("User is authenticated");
      return { ...data } ?? undefined
    } catch (error: any) {
      document.cookie = "id=; token=;";
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

  async function getCurrentUser() {
    const { id } = parseCookies();
    try {
      const { data } = await axios.get("/api/user/" + id + "ds");
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
    try {
      const { data } = await axios.post("/api/user/login", value);
      document.cookie = JSON.stringify({
        id: data.user._id,
        token: data.jwt,
      });
      toast.success(data.message, {
        position: "bottom-center",
        style: {
          borderRadius: "20px",
          background: "#444",
          opacity: 0.1,
          color: "#fff",
        },
      });
      router.push("/home");
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
    user,
    getCurrentUser,
    parseCookies,
    handleLogin,
    validateToken,
  };
}
