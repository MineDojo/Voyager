async function craftWoodenPickaxe(bot) {
  // Check if there are enough oak logs in the inventory
  const oakLogs = bot.inventory.count(mcData.itemsByName["oak_log"].id);
  if (oakLogs < 4) {
    // Mine more oak logs
    await mineBlock(bot, "oak_log", 4 - oakLogs);
  }

  // Craft a crafting table using oak logs
  await craftItem(bot, "crafting_table", 1);

  // Place the crafting table near the player
  const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Craft oak planks using oak logs
  await craftItem(bot, "oak_planks", 4, craftingTablePosition);

  // Check if there are enough sticks in the inventory
  const sticks = bot.inventory.count(mcData.itemsByName["stick"].id);
  if (sticks < 2) {
    // Craft sticks using oak planks
    await craftItem(bot, "stick", 2 - sticks, craftingTablePosition);
  }

  // Craft a wooden pickaxe using oak planks and sticks with the crafting table
  await craftItem(bot, "wooden_pickaxe", 1, craftingTablePosition);
  bot.chat("Wooden pickaxe crafted.");
}