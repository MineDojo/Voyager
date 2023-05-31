async function chopSpruceLogs(bot) {
  const spruceLogCount = bot.inventory.count(mcData.itemsByName.spruce_log.id);
  const logsToMine = 3 - spruceLogCount;
  if (logsToMine > 0) {
    bot.chat("Chopping down spruce logs...");
    await mineBlock(bot, "spruce_log", logsToMine);
    bot.chat("Chopped down 3 spruce logs.");
  } else {
    bot.chat("Already have 3 spruce logs in inventory.");
  }
}