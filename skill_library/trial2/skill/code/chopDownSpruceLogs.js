async function chopDownSpruceLogs(bot) {
  const spruceLogCount = bot.inventory.count(mcData.itemsByName.spruce_log.id);
  const logsToMine = 5 - spruceLogCount;
  if (logsToMine > 0) {
    bot.chat("Chopping down spruce logs...");
    await mineBlock(bot, "spruce_log", logsToMine);
    bot.chat("Chopped down 5 spruce logs.");
  } else {
    bot.chat("Already have 5 spruce logs in inventory.");
  }
}