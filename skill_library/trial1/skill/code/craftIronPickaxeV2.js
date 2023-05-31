async function craftIronPickaxe(bot) {
  // Check if there are enough iron ingots and sticks in the inventory
  const ironIngotsCount = bot.inventory.count(mcData.itemsByName.iron_ingot.id);
  const sticksCount = bot.inventory.count(mcData.itemsByName.stick.id);

  // If not enough iron ingots or sticks, collect the required items
  if (ironIngotsCount < 3) {
    await mineBlock(bot, "iron_ore", 3 - ironIngotsCount);
    bot.chat("Collected iron ores.");
    await smeltItem(bot, "iron_ore", "coal", 3 - ironIngotsCount);
    bot.chat("Smelted iron ores into iron ingots.");
  }
  if (sticksCount < 2) {
    await craftItem(bot, "stick", 1);
    bot.chat("Crafted sticks.");
  }

  // Place the crafting table near the bot
  const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Craft an iron pickaxe using the crafting table
  await craftItem(bot, "iron_pickaxe", 1);
  bot.chat("Crafted an iron pickaxe.");
}