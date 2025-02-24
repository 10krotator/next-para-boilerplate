"use client";

import { usePrivy } from "@privy-io/react-auth";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import LoginButton from "./login";
import LogoutButton from "./logout";
import { useSolanaWallets } from "@privy-io/react-auth";

export default function Navbar() {
  const { ready, authenticated } = usePrivy();
  const { wallets } = useSolanaWallets();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    async function fetchBalance() {
      if (!wallets?.[0]?.address) return;
      
      try {
        const connection = new Connection(clusterApiUrl('devnet'));
        const publicKey = new PublicKey(wallets[0].address);
        const balance = await connection.getBalance(publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
        console.log(balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    }

    if (authenticated) {
      fetchBalance();
      // Set up interval to refresh balance every 30 seconds
      const interval = setInterval(fetchBalance, 30000);
      return () => clearInterval(interval);
    }
  }, [wallets, authenticated]);

  return (
    <nav className="flex justify-end items-center p-4 bg-background bg-opacity-50 backdrop-blur-md rounded-full shadow-sm">
      <div className="flex items-center gap-4">
        {authenticated && balance !== null && (
          <>
            <span className="font-medium">{wallets?.[0]?.address.slice(0, 4)}...{wallets?.[0]?.address.slice(-4)}</span>
            <span className="font-medium">{balance.toFixed(4)} SOL</span>
          </>
        )}
        {ready && (authenticated ? <LogoutButton /> : <LoginButton />)}
      </div>
    </nav>
  );
} 