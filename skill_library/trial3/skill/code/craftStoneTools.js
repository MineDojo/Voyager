async function craftStoneTools(bot) {
  // Check if there are enough cobblestones in the inventory
  const cobblestones = bot.inventory.count(mcData.itemsByName["cobblestone"].id);
  if (cobblestones < 6) {
    // Mine more cobblestones
    await mineBlock(bot, "stone", 6 - cobblestones);
  }

  // Check if there are enough sticks in the inventory
  const sticks = bot.inventory.count(mcData.itemsByName["stick"].id);
  if (sticks < 5) {
    // Craft more sticks using oak planks
    await craftItem(bot, "stick", 5 - sticks);
  }

  // Place the crafting table near the player
  const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Craft a stone sword, a stone axe, and a stone shovel using the crafting table
  await craftItem(bot, "stone_sword", 1, craftingTablePosition);
  await craftItem(bot, "stone_axe", 1, craftingTablePosition);
  await craftItem(bot, "stone_shovel", 1, craftingTablePosition);
  bot.chat("Stone sword, stone axe, and stone shovel crafted.");
}