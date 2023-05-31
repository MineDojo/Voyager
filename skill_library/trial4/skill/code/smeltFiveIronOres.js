async function smeltFiveIronOres(bot) {
  // Check if the bot has a furnace in its inventory
  const furnaceItem = bot.inventory.findInventoryItem(mcData.itemsByName.furnace.id);
  if (!furnaceItem) {
    // Craft a furnace if not found in the inventory
    await craftFurnace(bot);
  }

  // Find a suitable position to place the furnace
  const furnacePosition = bot.entity.position.offset(1, -1, 1);

  // Place the furnace at the found position
  await placeItem(bot, "furnace", furnacePosition);
  bot.chat("Furnace placed.");

  // Check if the bot has coal in its inventory
  const coalCount = bot.inventory.count(mcData.itemsByName.coal.id);
  if (coalCount < 5) {
    // Mine enough coal to smelt 5 iron ores
    await mineBlock(bot, "coal_ore", 5 - coalCount);
    bot.chat("Coal mined.");
  }

  // Smelt the 5 raw iron ores into iron ingots using the furnace and coal as fuel
  await smeltItem(bot, "raw_iron", "coal", 5);
  bot.chat("5 raw iron ores smelted into iron ingots.");
}