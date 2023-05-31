async function craftIronChestplate(bot) {
  // Check if there are enough iron ingots in the inventory
  const ironIngotsCount = bot.inventory.count(mcData.itemsByName.iron_ingot.id);

  // If not enough iron ingots, mine iron ores and smelt them into iron ingots
  if (ironIngotsCount < 8) {
    await mineBlock(bot, "iron_ore", 8 - ironIngotsCount);
    bot.chat("Collected iron ores.");
    await smeltItem(bot, "iron_ore", "coal", 8 - ironIngotsCount);
    bot.chat("Smelted iron ores into iron ingots.");
  }

  // Place the crafting table near the bot
  const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Craft an iron chestplate using the crafting table
  await craftItem(bot, "iron_chestplate", 1);
  bot.chat("Crafted an iron chestplate.");
}