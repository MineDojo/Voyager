async function craftTwentySprucePlanks(bot) {
  const requiredLogs = 5;
  const spruceLogCount = bot.inventory.count(mcData.itemsByName.spruce_log.id);
  const logsToMine = requiredLogs - spruceLogCount;
  if (logsToMine > 0) {
    bot.chat("Not enough spruce logs. Chopping down more...");
    await mineBlock(bot, "spruce_log", logsToMine);
    bot.chat("Spruce logs chopped down.");
  }
  bot.chat("Crafting 20 spruce planks...");
  await craftItem(bot, "spruce_planks", requiredLogs);
  bot.chat("20 spruce planks crafted.");
}