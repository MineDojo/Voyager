async function smeltTwelveRawCopper(bot) {
  // Check if the bot has a furnace in its inventory
  const furnaceItem = bot.inventory.findInventoryItem(mcData.itemsByName.furnace.id);
  if (!furnaceItem) {
    // Craft a furnace if not found in the inventory
    await craftItem(bot, "furnace", 1);
    bot.chat("Furnace crafted.");
  }

  // Find a suitable position to place the furnace
  const furnacePosition = bot.entity.position.offset(1, -1, 1);

  // Place the furnace at the found position
  await placeItem(bot, "furnace", furnacePosition);
  bot.chat("Furnace placed.");

  // Check if the bot has enough coal in its inventory to smelt 12 raw copper
  const coalCount = bot.inventory.count(mcData.itemsByName.coal.id);
  if (coalCount < 12) {
    // Mine enough coal to smelt 12 raw copper
    await mineBlock(bot, "coal_ore", 12 - coalCount);
    bot.chat("Coal mined.");
  }

  // Smelt the 12 raw copper using the furnace and the available coal as fuel
  await smeltItem(bot, "raw_copper", "coal", 12);
  bot.chat("12 raw copper smelted.");
}