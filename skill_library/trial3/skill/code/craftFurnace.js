async function craftFurnace(bot) {
  // Check if there are enough cobblestones in the inventory
  const cobblestones = bot.inventory.count(mcData.itemsByName["cobblestone"].id);
  if (cobblestones < 8) {
    bot.chat("Not enough cobblestones to craft a furnace.");
    return;
  }

  // Place the crafting table near the player
  const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Craft a furnace using cobblestones and the crafting table
  await craftItem(bot, "furnace", 1, craftingTablePosition);
  bot.chat("Furnace crafted.");
}