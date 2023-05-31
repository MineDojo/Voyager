async function craftIronShovel(bot) {
  // Check if there are enough iron ingots and sticks in the inventory
  const ironIngotsCount = bot.inventory.count(mcData.itemsByName.iron_ingot.id);
  const sticksCount = bot.inventory.count(mcData.itemsByName.stick.id);

  // If not enough iron ingots or sticks, collect the required items
  if (ironIngotsCount < 1) {
    await mineBlock(bot, "iron_ore", 1);
    bot.chat("Collected iron ore.");
    await smeltItem(bot, "iron_ore", "coal", 1);
    bot.chat("Smelted iron ore into iron ingot.");
  }
  if (sticksCount < 2) {
    await craftItem(bot, "stick", 1);
    bot.chat("Crafted sticks.");
  }

  // Find a suitable position to place the crafting table
  const suitablePosition = bot.entity.position.offset(1, 0, 0);
  const block = bot.blockAt(suitablePosition);
  if (block.name === "grass_block" || block.name === "dirt") {
    await bot.dig(block);
  }

  // Place the crafting table at the suitable position
  await placeItem(bot, "crafting_table", suitablePosition);

  // Craft an iron shovel using the crafting table
  await craftItem(bot, "iron_shovel", 1);
  bot.chat("Crafted an iron shovel.");
}