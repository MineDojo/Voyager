async function craftTenCobblestoneWalls(bot) {
  // Check if there are enough cobblestones in the inventory
  const cobblestones = bot.inventory.count(mcData.itemsByName["cobblestone"].id);
  if (cobblestones < 32) {
    bot.chat("Not enough cobblestones to craft 10 cobblestone walls.");
    return;
  }

  // Place the crafting table near the player
  const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Craft 6 cobblestone walls using the crafting table
  await craftItem(bot, "cobblestone_wall", 1, craftingTablePosition);

  // Craft 6 more cobblestone walls using the crafting table
  await craftItem(bot, "cobblestone_wall", 1, craftingTablePosition);
  bot.chat("10 cobblestone walls crafted.");
}