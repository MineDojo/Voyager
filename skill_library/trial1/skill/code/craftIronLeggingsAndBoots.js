async function craftIronLeggingsAndBoots(bot) {
  // Check if there are enough iron ingots in the inventory
  const ironIngotsCount = bot.inventory.count(mcData.itemsByName.iron_ingot.id);

  // If not enough iron ingots, mine iron ores and smelt them into iron ingots
  if (ironIngotsCount < 11) {
    await mineBlock(bot, "iron_ore", 11 - ironIngotsCount);
    bot.chat("Collected iron ores.");
    await smeltItem(bot, "iron_ore", "coal", 11 - ironIngotsCount);
    bot.chat("Smelted iron ores into iron ingots.");
  }

  // Place the crafting table near the bot
  const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Craft iron leggings using the crafting table
  await craftItem(bot, "iron_leggings", 1);
  bot.chat("Crafted iron leggings.");

  // Craft iron boots using the crafting table
  await craftItem(bot, "iron_boots", 1);
  bot.chat("Crafted iron boots.");
}