async function craftDiamondSword(bot) {
  // Check if there are enough diamonds in the inventory
  const diamonds = bot.inventory.count(mcData.itemsByName["diamond"].id);
  if (diamonds < 2) {
    bot.chat("Not enough diamonds to craft a diamond sword.");
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

  // Craft a diamond sword using diamonds and sticks with the crafting table
  await craftItem(bot, "diamond_sword", 1, craftingTablePosition);
  bot.chat("Diamond sword crafted.");
}