async function craftCopperBlock(bot) {
  // Check if there are enough copper ingots in the inventory
  const copperIngotsCount = bot.inventory.count(mcData.itemsByName.copper_ingot.id);

  // If not enough copper ingots, mine copper ores and smelt them into copper ingots
  if (copperIngotsCount < 9) {
    await mineBlock(bot, "copper_ore", 9 - copperIngotsCount);
    bot.chat("Collected copper ores.");
    await smeltItem(bot, "copper_ore", "coal", 9 - copperIngotsCount);
    bot.chat("Smelted copper ores into copper ingots.");
  }

  // Place the crafting table near the bot
  const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Craft a copper block using the crafting table
  await craftItem(bot, "copper_block", 1);
  bot.chat("Crafted a copper block.");
}