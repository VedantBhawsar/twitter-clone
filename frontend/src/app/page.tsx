"use client";
import { useUseStore } from "@/stores/useStore";
import { useAuth } from "@hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { InfinitySpin } from "react-loader-spinner";

export default function Home() {
  const { parseCookies, validateToken } = useAuth();
  const currentUser: any = useUseStore((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    async function tokenCheck() {
      const cookie = parseCookies();
      if (cookie?.token) {
        if (currentUser?._id) {
          router.push("/home");
          return;
        } else {
          await validateToken();
          router.push("/home");
          return;
        }
      }
      router.push("/login");
    }
    tokenCheck();
  }, []);

  return (
    <main className="w-full h-screen z-10 bg-black absolute flex flex-col justify-center items-center">
      <InfinitySpin color="#fff" width="200" />
      <p className="text-white font-bold">Redirecting...</p>
    </main>
  );
}
