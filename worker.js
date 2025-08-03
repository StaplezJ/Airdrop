async function requestAirdrop(wallet) {
  // Airdrop 1 SOL (1,000,000,000 lamports)
  const params = [wallet, 1_000_000_000];

  try {
    const response = await fetch("https://api.devnet.solana.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "requestAirdrop",
        params
      })
    });

    const result = await response.json();

    // Check for a specific error from the airdrop response
    if (result.error) {
      console.error("Airdrop failed:", result.error.message);
      // The function will simply return here, so the next cron run will proceed as scheduled
    } else {
      console.log("Airdrop successful. Transaction signature:", result.result);
    }
  } catch (err) {
    console.error("Airdrop request failed:", err);
    // The function will simply return here, so the next cron run will proceed as scheduled
  }
}

export default {
  async scheduled(event, env, ctx) {
    console.log("Hourly airdrop request triggered by cron schedule.");
    // The worker will automatically stop if the airdrop fails, and the next hourly trigger will run as planned.
    await requestAirdrop(env.WALLET_ADDRESS);
  }
};
