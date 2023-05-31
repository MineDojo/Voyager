async function craftWoodenSword(bot) {
  // Check if there are enough oak planks in the inventory
  const oakPlanks = bot.inventory.count(mcData.itemsByName["oak_planks"].id);
  if (oakPlanks < 2) {
    // Craft more oak planks using oak logs
    await craftItem(bot, "oak_planks", 2 - oakPlanks);
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

  // Craft a wooden sword using oak planks and sticks with the crafting table
  await craftItem(bot, "wooden_sword", 1, craftingTablePosition);
  bot.chat("Wooden sword crafted.");
}