import { http, cookieStorage, createConfig, createStorage } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains'; 
import { 
  connectorsForWallets, 
} from '@rainbow-me/rainbowkit'; 
import { 
  metaMaskWallet, 
  rainbowWallet, 
  coinbaseWallet, 
} from '@rainbow-me/rainbowkit/wallets'; 
 
// export function getConfig() {
//   return createConfig({
//     chains: [base], 
//     connectors: [
//       coinbaseWallet({
//         appName: "OnchainKit",
//         preference: 'smartWalletOnly',
//         version: '4',
//       }),
//     ],
//     storage: createStorage({
//       storage: cookieStorage,
//     }),
//     ssr: true,
//     transports: {
//       [base.id]: http(), 
//     },
//   });
// }

const connectors = connectorsForWallets( 
  [
    {
      groupName: 'Recommended Wallet',
      wallets: [coinbaseWallet],
    },
    {
      groupName: 'Other Wallets',
      wallets: [rainbowWallet, metaMaskWallet],
    },
  ],
  {
    appName: 'onchainkit',
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  },
); 

export const wagmiConfig = createConfig({
  chains: [baseSepolia],
  appName: 'onchainkit',
  connectors,
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  ssr: true,
  transports: {
    [baseSepolia.id]: http(),
  },
});
 
// declare module 'wagmi' {
//   interface Register {
//     config: ReturnType<typeof getConfig>;
//   }
// }