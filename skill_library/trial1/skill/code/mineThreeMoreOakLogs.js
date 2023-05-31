async function mineThreeMoreOakLogs(bot) {
  // Check the initial inventory for oak logs
  const initialOakLogs = bot.inventory.count(mcData.itemsByName.oak_log.id);

  // Find 3 oak_log blocks
  const oakLogs = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const oakLogs = bot.findBlocks({
      matching: block => block.name === "oak_log",
      maxDistance: 32,
      count: 3
    });
    return oakLogs.length >= 3 ? oakLogs : null;
  });
  if (!oakLogs) {
    bot.chat("Could not find enough oak logs.");
    return;
  }

  // Mine the oak_log blocks
  await mineBlock(bot, "oak_log", 3);
  bot.chat("3 oak logs mined.");

  // Compare the final inventory with the initial inventory
  const finalOakLogs = bot.inventory.count(mcData.itemsByName.oak_log.id);
  if (finalOakLogs - initialOakLogs === 3) {
    bot.chat("Successfully mined 3 more oak logs.");
  } else {
    bot.chat("Failed to mine 3 more oak logs.");
  }
}