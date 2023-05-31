async function craftIronSword(bot) {
  // Check if there are enough iron ingots in the inventory
  const ironIngots = bot.inventory.count(mcData.itemsByName["iron_ingot"].id);
  if (ironIngots < 2) {
    bot.chat("Not enough iron ingots to craft an iron sword.");
    return;
  }

  // Check if there are enough sticks in the inventory
  const sticks = bot.inventory.count(mcData.itemsByName["stick"].id);
  if (sticks < 1) {
    // Craft more sticks using oak planks
    await craftItem(bot, "stick", 1 - sticks);
  }

  // Place the crafting table near the player
  const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Craft an iron sword using iron ingots and sticks with the crafting table
  await craftItem(bot, "iron_sword", 1, craftingTablePosition);
  bot.chat("Iron sword crafted.");
}