"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

import { useSmartWallets } from "@privy-io/react-auth/smart-wallets";
import { baseSepolia } from "viem/chains";
import { usePrivy } from "@privy-io/react-auth";

export default function UserSendPage() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  //   const [txHash, setTxHash] = useState("");
  const { toast } = useToast();

  //   const handleSend = async () => {
  //     setLoading(true);
  //     setTxHash("");

  //     try {
  //       const response = await fetch("/api/user-wallet/send-transaction", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ from, to, amount }),
  //       });

  //       if (!response.ok) {
  //         const errorData = await response.json();
  //         throw new Error(errorData.error || "Transaction failed");
  //       }

  //       const data = await response.json();

  //       if (data.success) {
  //         setTxHash(data.transactionHash);
  //         toast({
  //           title: "Transaction Successful",
  //           description: `Transaction Hash: ${data.transactionHash}`,
  //         });
  //       } else {
  //         throw new Error(data.error || "Transaction failed");
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //       toast({
  //         title: "Error",
  //         description:
  //           error instanceof Error ? error.message : "Unknown error occurred",
  //         variant: "destructive",
  //       });
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const { user } = usePrivy();
  const smartWallet = user?.linkedAccounts.find(
    (account) => account.type === "smart_wallet"
  );

  console.log(user);

  console.log(smartWallet?.address);
  // Logs the smart wallet's address
  console.log(smartWallet?.type);
  // Logs the smart wallet type (e.g. 'safe', 'kernel', 'light_account', 'biconomy', 'thirdweb', 'coinbase_smart_wallet')

  const { client } = useSmartWallets();
  const uiOptions = {
    title: "Sample title text",
    description: "Sample description text",
    buttonText: "Sample button text",
  };

  const handleSendTransaction = async () => {
    setLoading(true);
    try {
      const transactionRequest = {
        chain: baseSepolia,
        to,
        value: amount,
      };
      const txHash = await client?.sendTransaction(transactionRequest, {
        uiOptions,
      });
      console.log(txHash);
      toast({
        title: "Transaction Successful",
        description: `Transaction Hash: ${txHash}`,
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Send ETH</h2>
      <input
        type="text"
        placeholder="Recipient Address"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        placeholder="Amount (ETH)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={handleSendTransaction}
        disabled={loading}
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        {loading ? "Sending..." : "Send Transaction"}
      </button>
      {/* {txHash && (
        <p className="mt-2 text-green-600">
          Transaction Hash:{" "}
          <a
            href={`https://etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {txHash}
          </a>
        </p>
      )} */}
    </div>
  );
}
