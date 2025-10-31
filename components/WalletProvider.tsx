"use client";

import React from "react";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { Network } from "@aptos-labs/ts-sdk";

export default function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <AptosWalletAdapterProvider
      dappConfig={{
        network: Network.TESTNET,
      }}
      autoConnect={true}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
}
