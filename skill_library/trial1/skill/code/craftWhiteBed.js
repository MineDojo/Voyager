async function craftWhiteBed(bot) {
  // Check if there are enough oak planks in the inventory
  const oakPlanksCount = bot.inventory.count(mcData.itemsByName.oak_planks.id);

  // If not, craft oak planks from oak logs
  if (oakPlanksCount < 3) {
    const oakLogsCount = bot.inventory.count(mcData.itemsByName.oak_log.id);
    const planksToCraft = Math.ceil((3 - oakPlanksCount) / 4);
    if (oakLogsCount >= planksToCraft) {
      await craftItem(bot, "oak_planks", planksToCraft);
      bot.chat("Crafted oak planks.");
    } else {
      bot.chat("Not enough oak logs to craft oak planks.");
      return;
    }
  }

  // Check if there are enough white wool in the inventory
  const whiteWoolCount = bot.inventory.count(mcData.itemsByName.white_wool.id);
  if (whiteWoolCount < 3) {
    bot.chat("Not enough white wool to craft a bed.");
    return;
  }

  // Place the crafting table near the bot
  const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Craft a white bed using the crafting table
  await craftItem(bot, "white_bed", 1);
  bot.chat("Crafted a white bed.");
}