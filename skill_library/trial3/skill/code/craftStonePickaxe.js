async function craftStonePickaxe(bot) {
  // Check if there are enough cobblestones in the inventory
  const cobblestones = bot.inventory.count(mcData.itemsByName["cobblestone"].id);
  if (cobblestones < 3) {
    bot.chat("Not enough cobblestones to craft a stone pickaxe.");
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

  // Craft a stone pickaxe using cobblestones and sticks with the crafting table
  await craftItem(bot, "stone_pickaxe", 1, craftingTablePosition);
  bot.chat("Stone pickaxe crafted.");
}