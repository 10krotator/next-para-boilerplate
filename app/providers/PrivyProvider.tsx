'use client';

import {PrivyProvider} from '@privy-io/react-auth';
import {toSolanaWalletConnectors} from '@privy-io/react-auth/solana';

const solanaConnectors = toSolanaWalletConnectors({
    // By default, shouldAutoConnect is enabled
    shouldAutoConnect: true,
    });  

export default function PrivyProviders({children}: {children: React.ReactNode}) {
    return (
    <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
        config={{
        // Customize Privy's appearance in your app
        appearance: {
            theme: 'light',
            accentColor: '#676FFF',
            logo: '/logo.svg',
            walletChainType: 'solana-only',
        }, 
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
            createOnLogin: 'users-without-wallets',
        },
        externalWallets: {
            solana: {
                connectors: solanaConnectors,
            }
        }
        }}
    >
        {children}
    </PrivyProvider>
    );
}