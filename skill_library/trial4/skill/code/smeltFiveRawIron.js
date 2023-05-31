async function smeltFiveRawIron(bot) {
  // Check if the bot has a furnace in its inventory
  const furnaceItem = bot.inventory.findInventoryItem(mcData.itemsByName.furnace.id);
  if (!furnaceItem) {
    bot.chat("No furnace found in inventory.");
    return;
  }

  // Find a suitable position to place the furnace
  const furnacePosition = bot.entity.position.offset(1, -1, 1);

  // Place the furnace at the found position
  await placeItem(bot, "furnace", furnacePosition);
  bot.chat("Furnace placed.");

  // Check if the bot has enough coal in its inventory to smelt 5 raw iron
  const coalCount = bot.inventory.count(mcData.itemsByName.coal.id);
  if (coalCount < 5) {
    bot.chat("Not enough coal to smelt 5 raw iron.");
    return;
  }

  // Smelt the 5 raw iron using the furnace and the available coal as fuel
  await smeltItem(bot, "raw_iron", "coal", 5);
  bot.chat("5 raw iron smelted.");
}