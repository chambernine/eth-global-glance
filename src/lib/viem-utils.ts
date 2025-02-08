import { createPublicClient, http, formatEther } from "viem";
import { baseSepolia } from "viem/chains"; // Change to the desired testnet

const client = createPublicClient({
  chain: baseSepolia, // Use Sepolia testnet
  transport: http(),
});

export async function getBalance(address: `0x${string}`) {
  try {
    const balance = await client.getBalance({ address });
    return formatEther(balance); // Convert from Wei to ETH
  } catch (error) {
    console.error("Error fetching balance:", error);
    return null;
  }
}
