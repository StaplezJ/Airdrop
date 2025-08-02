async function requestAirdrop(wallet) {
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
    console.log("Airdrop response:", result);
  } catch (err) {
    console.error("Airdrop request failed:", err);
  }
}

export default {
  async scheduled(event, env, ctx) {
    console.log("Airdrop request triggered by cron schedule.");
    await requestAirdrop(env.WALLET_ADDRESS);
  }
};
