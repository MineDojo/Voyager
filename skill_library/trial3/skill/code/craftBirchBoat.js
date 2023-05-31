async function findSuitablePosition(bot) {
  const offsets = [new Vec3(1, 0, 0), new Vec3(-1, 0, 0), new Vec3(0, 0, 1), new Vec3(0, 0, -1)];
  for (const offset of offsets) {
    const position = bot.entity.position.offset(offset.x, offset.y, offset.z);
    const blockBelow = bot.blockAt(position.offset(0, -1, 0));
    if (blockBelow && blockBelow.name !== "air") {
      return position;
    }
  }
  return null;
}

async function craftBirchBoat(bot) {
  // Check if there are enough birch logs in the inventory
  const birchLogs = bot.inventory.count(mcData.itemsByName["birch_log"].id);
  if (birchLogs < 5) {
    // Mine more birch logs
    await mineBlock(bot, "birch_log", 5 - birchLogs);
  }

  // Craft birch planks using birch logs
  await craftItem(bot, "birch_planks", 5);

  // Check if there is a crafting table in the inventory
  const craftingTable = bot.inventory.findInventoryItem(mcData.itemsByName["crafting_table"].id);
  if (!craftingTable) {
    // Craft a crafting table
    await craftItem(bot, "crafting_table", 1);
  }

  // Find a suitable position to place the crafting table
  const craftingTablePosition = await findSuitablePosition(bot);
  if (!craftingTablePosition) {
    bot.chat("Failed to find a suitable position to place the crafting table. Please try again.");
    return;
  }

  // Place the crafting table at the suitable position
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Craft a birch boat using birch planks and the crafting table
  await craftItem(bot, "birch_boat", 1, craftingTablePosition);
  bot.chat("Birch boat crafted.");
}