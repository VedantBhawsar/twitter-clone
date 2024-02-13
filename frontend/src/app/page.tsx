"use client";
import { useAuth } from "@hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { InfinitySpin } from "react-loader-spinner";

export default function Home() {
  const { parseCookies, getCurrentUser } = useAuth();
  const router = useRouter();
  useEffect(() => {
    async function tokenCheck() {
      if (parseCookies()) {
        if (await getCurrentUser()) {
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
