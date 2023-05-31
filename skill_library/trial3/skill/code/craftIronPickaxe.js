async function craftIronPickaxe(bot) {
  // Check if there are enough iron ingots in the inventory
  const ironIngots = bot.inventory.count(mcData.itemsByName["iron_ingot"].id);
  if (ironIngots < 3) {
    bot.chat("Not enough iron ingots to craft an iron pickaxe.");
    return;
  }

  // Check if there are enough sticks in the inventory
  const sticks = bot.inventory.count(mcData.itemsByName["stick"].id);
  if (sticks < 2) {
    // Craft more sticks using oak planks
    await craftItem(bot, "stick", 2 - sticks);
  }

  // Place the crafting table near the player
  const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Craft an iron pickaxe using iron ingots and sticks with the crafting table
  await craftItem(bot, "iron_pickaxe", 1, craftingTablePosition);
  bot.chat("Iron pickaxe crafted.");
}