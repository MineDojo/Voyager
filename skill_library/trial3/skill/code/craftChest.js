async function craftChest(bot) {
  // Check if there are enough oak planks in the inventory
  const oakPlanks = bot.inventory.count(mcData.itemsByName["oak_planks"].id);
  if (oakPlanks < 8) {
    // Mine more oak logs
    await mineBlock(bot, "oak_log", 8 - oakPlanks);
    // Craft oak planks using oak logs
    await craftItem(bot, "oak_planks", 8 - oakPlanks);
  }

  // Place the crafting table near the player
  const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Craft a chest using oak planks with the crafting table
  await craftItem(bot, "chest", 1, craftingTablePosition);
  bot.chat("Chest crafted.");
}