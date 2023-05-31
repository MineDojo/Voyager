async function craftFurnace(bot) {
  // Check if there are enough cobblestones in the inventory
  const cobblestoneCount = bot.inventory.count(mcData.itemsByName.cobblestone.id);

  // If not, mine the required cobblestones
  if (cobblestoneCount < 8) {
    await mineBlock(bot, "stone", 8 - cobblestoneCount);
    bot.chat("Collected cobblestone.");
  }

  // Place the crafting table near the bot
  const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Craft a furnace using the crafting table
  await craftItem(bot, "furnace", 1);
  bot.chat("Crafted a furnace.");
}