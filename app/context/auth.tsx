"use client"

import React, { createContext, useCallback, useContext, useMemo, useState, useEffect } from "react";
import { para } from "@/client/para";
import { ParaModal } from "@getpara/react-sdk";

type AuthStatus = "loggedIn" | "loggedOut" | "rejected";


type AuthContextType = {
    status: AuthStatus;
    error: string | null;
    loading: boolean;
    wallet: string | null;
    triggerAuth: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [status, setStatus] = useState<AuthStatus>("loggedOut");
    const [authError, setAuthError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [wallet, setWallet] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    // Check auth status on component mount
    useEffect(() => {
        const initAuth = async () => {
            await checkAuthStatus();
        };
        initAuth();
    }, []);

    const fetchWalletInfo = async () => {
        try {
            // Get wallets from Para
            const wallets = await para.getWallets();
            console.log("Retrieved wallets:", wallets);
            
            // Para returns an object with wallet IDs as keys, not an array
            if (wallets && Object.keys(wallets).length > 0) {
                // Get the first wallet key
                const walletId = Object.keys(wallets)[0];
                const walletObj = wallets[walletId];
                
                console.log("Wallet object:", walletObj);
                
                // Get the address from the wallet object
                const address = walletObj?.address || null;
                console.log("Wallet address:", address);
                
                if (address) {
                    setWallet(address);
                    return address;
                }
            }
            return null;
        } catch (error) {
            console.error("Error fetching wallet info:", error);
            return null;
        }
    };

    const checkAuthStatus = useCallback(async () => {
        try {
            const result = await para.isFullyLoggedIn();
            console.log("isFullyLoggedIn result:", result);
            
            if (result) {
                // User is logged in, fetch wallet info
                const publicKey = await fetchWalletInfo();
                if (publicKey) {
                    setWallet(publicKey);
                    setStatus("loggedIn");
                } else {
                    console.warn("Logged in but could not retrieve wallet");
                    setStatus("loggedIn"); // Still consider logged in even without wallet
                }
            } else {
                setStatus("loggedOut");
                setWallet(null);
            }
        } catch (error) {
            console.error("Auth status check error:", error);
            setAuthError(error as string);
            setStatus("rejected");
        }
    }, []);

    const triggerAuth = useCallback(async () => {
        setLoading(true);
        setIsOpen(true);
        try {
            const result = await para.isFullyLoggedIn();
            console.log("triggerAuth isFullyLoggedIn result:", result);
            
            if (result) {
                // User is already logged in, fetch wallet info
                await fetchWalletInfo();
                setStatus("loggedIn");
            } else {
                // Will open modal for login
                setStatus("loggedOut");
            }
        } catch (error) {
            console.error("triggerAuth error:", error);
            setAuthError(error as string);
            setStatus("rejected");
        } finally {
            setLoading(false);
        }
    }, []);

    const handleModalClose = useCallback(async () => {
        setIsOpen(false);
        setLoading(false);
        console.log("Modal closed, checking auth status");
        // Add a slight delay to allow para to update its internal state
        setTimeout(async () => {
            await checkAuthStatus();
        }, 500);
    }, [checkAuthStatus]);

    const logout = useCallback(async () => {
        try {
            await para.logout();
            setStatus("loggedOut");
            setWallet(null);
            console.log("Logged out successfully");
        } catch (error) {
            console.error("Logout error:", error);
        }
    }, []);

    const contextValue = useMemo(
        () => ({
            status,
            error: authError,
            loading,
            wallet,
            triggerAuth,
            logout,
            }),
            [status, authError, loading, wallet, triggerAuth, logout]
        );


    return (
        <AuthContext.Provider value={contextValue}>
            {children}
            {status === "rejected" && <div>Error: {authError}</div>}
            {(status === "loggedOut" || loading) ?
            <div className="flex flex-col gap-4">
                <ParaModal
                        para={para}
                        isOpen={isOpen}
                        onClose={handleModalClose}
                    />
            </div>
            :
            <div className="flex flex-col gap-4">
                <span>logged in</span>
            </div>
            }

        </AuthContext.Provider>
    )
    
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
    }