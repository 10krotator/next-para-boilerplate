"use client";

import { usePrivy } from "@privy-io/react-auth";
import LoginButton from "./_components/login";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "./_components/logout";
import Navbar from "./_components/navbar";


export default function Home() {
  const { ready, authenticated, user } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/'); // Redirect to home if not authenticated
      return;
    }

    if (authenticated) {
      console.log("authenticated");
    }
  }, [ready, authenticated, router]);

  if (!ready || !authenticated) {
    return (
      <div className="min-h-screen w-full">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-2xl font-bold mb-4">Welcome to swiift.com</h1>
          <p className="mb-4">Please connect your wallet to continue</p>
          <LoginButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <div className="text-2xl font-bold">
            transfers stables with your phone number in 1 click
          </div>
          <div className="flex flex-col gap-4 justify-center w-full">
            <p>Connected: {user?.wallet?.address}</p>
            <LogoutButton />
          </div>
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          🚢 soon™
        </footer>
      </div>
    </div>
  );
}
