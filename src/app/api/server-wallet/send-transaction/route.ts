import { NextRequest, NextResponse } from "next/server";
import { createWalletClient, http, parseEther } from "viem";
import { baseSepolia } from "viem/chains";
import { PrivyClient } from "@privy-io/server-auth";
import { createViemAccount } from "@privy-io/server-auth/viem";

// It's better to use environment variables for sensitive data
const APP_ID = process.env.PRIVY_APP_ID || "cm6nig4zq00ts5dicmy3h0azh";
const APP_SECRET =
  process.env.PRIVY_APP_SECRET ||
  "3JT6Pqp5Tco9ubNTjKHcCzMk61fW9pGoR8Skd84D24iijdoHvJyP3gmcVcpRtE9u2kLBeyYaq4vFwjsbvxet62Ub";
const WALLET_ID = process.env.PRIVY_WALLET_ID || "qg2gk5y04s634yuqn6zn70o7";
const WALLET_ADDRESS = "0xD685CCb5024f83cFFd9a6e782F2c8Fb51d3170A3";

const PRIVY_WALLET_AUTH_KEY =
  "wallet-auth:MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgA9bjOZOl4mCV/MFH9xTwe7+AnBdfOKui11Wy85aDmeOhRANCAARQuyjhd0cuMjFhX6a0j9UJpf6hzPT7SuiETMF09GBZglbe39ydb7o7ynE3lSAf9jW90b/NwS7vagTZELefy2qY";

// Initialize Privy client with proper configuration
const privy = new PrivyClient(APP_ID, APP_SECRET, {
  walletApi: {
    authorizationPrivateKey: PRIVY_WALLET_AUTH_KEY,
  },
  timeout: 30000,
});

export async function POST(req: NextRequest) {
  try {
    // Parse and validate input
    const body = await req.json();
    const { to, amount } = body;

    if (!to || !amount) {
      return NextResponse.json(
        { error: "Missing required fields: 'to' address or 'amount'" },
        { status: 400 }
      );
    }

    // Validate ethereum address format
    if (!to.match(/^0x[a-fA-F0-9]{40}$/)) {
      return NextResponse.json(
        { error: "Invalid recipient address format" },
        { status: 400 }
      );
    }

    // Validate amount is a valid number
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      return NextResponse.json(
        { error: "Invalid amount: must be a positive number" },
        { status: 400 }
      );
    }

    try {
      // Create Viem account
      const account = await createViemAccount({
        walletId: WALLET_ID,
        address: WALLET_ADDRESS,
        privy,
      });

      // Initialize wallet client with RPC URL
      const client = createWalletClient({
        account,
        chain: baseSepolia,
        transport: http(),
      });

      // Prepare transaction
      const transaction = {
        to: to as `0x${string}`,
        value: parseEther(amount),
        chainId: baseSepolia.id,
      };

      // Send transaction
      const txHash = await client.sendTransaction(transaction);

      return NextResponse.json(
        {
          success: true,
          txHash,
          details: {
            to,
            amount,
            network: "Base Sepolia",
            chainId: baseSepolia.id,
          },
        },
        { status: 200 }
      );
    } catch (privyError) {
      console.error("Privy/Viem Error:", privyError);
      return NextResponse.json(
        {
          error: "Transaction processing failed",
          details:
            privyError instanceof Error ? privyError.message : "Unknown error",
          transaction: { to, amount },
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
