'use client'
import { useAuth } from "@hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { parseCookies, validateToken } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (parseCookies()) {
      validateToken()
      router.push("/home");
    } else {
      router.push("/login");
    }
  }, []);

  return <main className="ml-72">login page</main>;
}
