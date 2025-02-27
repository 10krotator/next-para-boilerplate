"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "./context/auth";

export default function Home() {
  const { status, triggerAuth, logout, loading, wallet} = useAuth();
  console.log("Home component status:", status, "wallet:", wallet);

  // Function to format wallet address
  const formatWalletAddress = (address: string | null) => {
    if (!address) return "Wallet not available";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="min-h-screen w-full">
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <div className="text-2xl font-bold">
            transfers stables with your phone number in 1 click
          </div>
          {status === "loggedOut" ? (
            <Button onClick={triggerAuth} disabled={loading}>
              {loading ? "Connecting..." : "Connect"}
            </Button>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="font-mono p-2 rounded">
                {wallet ? formatWalletAddress(wallet) : "Loading wallet..."}
              </div>
              <Button onClick={logout} disabled={loading}>
                Disconnect
              </Button>
            </div>
          )}
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          🚢 soon™
        </footer>
      </div>
    </div>
  );
}
