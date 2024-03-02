import { usePostStore } from "@/stores/postStore";
import axios from "axios";
import toast from "react-hot-toast";

export function usePost() {
  const posts = usePostStore((state: any) => state?.posts);
  const addPost = usePostStore((state: any) => state?.addPost);
  const setPosts = usePostStore((state: any) => state.setPosts);

  async function fetchPosts() {
    try {
      const { data } = await axios.get("/api/tweet/", {
        withCredentials: true,
      });
      setPosts(data);
    } catch (error: any) {
      toast.error("Error while fetching posts", {
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

  async function fetchPost(id: string) {
    try {
      const { data } = await axios.get(`/api/tweet/${id}`, {
        withCredentials: true,
      });
      console.log(data);
      return data;
    } catch (error: any) {
      toast.error("Error while fetching post", {
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

  async function createPost(post: any, clearFields: any) {
    try {
      const { data } = await axios.post("/api/tweet/create", post, {
        withCredentials: true,
      });
      console.log(data);
      addPost(data);
      clearFields();
      toast.success("Post Created!", {
        position: "bottom-center",
        style: {
          borderRadius: "20px",
          background: "#444",
          opacity: 0.1,
          color: "#fff",
        },
      });
      return data;
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message, {
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
    createPost,
    fetchPosts,
    fetchPost,
  };
}
