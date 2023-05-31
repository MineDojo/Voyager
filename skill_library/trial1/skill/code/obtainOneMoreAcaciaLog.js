async function obtainOneMoreAcaciaLog(bot) {
  // Check the initial inventory for acacia logs
  const initialAcaciaLogs = bot.inventory.count(mcData.itemsByName.acacia_log.id);

  // If the number of acacia logs is less than 5, find and mine one more acacia log
  if (initialAcaciaLogs < 5) {
    const acaciaLog = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      return bot.findBlock({
        matching: block => block.name === "acacia_log",
        maxDistance: 32
      });
    });
    if (!acaciaLog) {
      bot.chat("Could not find an acacia log.");
      return;
    }
    await mineBlock(bot, "acacia_log", 1);
    bot.chat("1 more acacia log obtained.");
  }

  // Check the final number of acacia logs in the inventory
  const finalAcaciaLogs = bot.inventory.count(mcData.itemsByName.acacia_log.id);
  if (finalAcaciaLogs >= 5) {
    bot.chat("Successfully obtained 5 acacia logs.");
  } else {
    bot.chat("Failed to obtain 5 acacia logs.");
  }
}