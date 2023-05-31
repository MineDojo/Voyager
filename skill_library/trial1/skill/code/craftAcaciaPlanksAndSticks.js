async function craftAcaciaPlanksAndSticks(bot) {
  // Check if there are enough acacia logs in the inventory
  const acaciaLogsCount = bot.inventory.count(mcData.itemsByName.acacia_log.id);

  // If not, mine more acacia logs
  if (acaciaLogsCount < 5) {
    await mineBlock(bot, "acacia_log", 5 - acaciaLogsCount);
    bot.chat("Mined acacia logs.");
  }

  // Craft 20 acacia planks from acacia logs
  await craftItem(bot, "acacia_planks", 5);
  bot.chat("Crafted 20 acacia planks.");

  // Check if there are enough acacia planks in the inventory to craft 10 sticks
  const acaciaPlanksCount = bot.inventory.count(mcData.itemsByName.acacia_planks.id);

  // If not, mine more acacia logs and craft more acacia planks
  if (acaciaPlanksCount < 5) {
    await mineBlock(bot, "acacia_log", 5 - acaciaLogsCount);
    bot.chat("Mined more acacia logs.");
    await craftItem(bot, "acacia_planks", 5 - acaciaPlanksCount);
    bot.chat("Crafted more acacia planks.");
  }

  // Craft 10 sticks from acacia planks
  await craftItem(bot, "stick", 3);
  bot.chat("Crafted 10 sticks.");
}