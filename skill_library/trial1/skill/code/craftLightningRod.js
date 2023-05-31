async function findSuitablePosition(bot) {
  const offsets = [new Vec3(1, 0, 0), new Vec3(-1, 0, 0), new Vec3(0, 0, 1), new Vec3(0, 0, -1)];
  for (const offset of offsets) {
    const position = bot.entity.position.offset(offset.x, offset.y, offset.z);
    const block = bot.blockAt(position);
    if (block.name === "air") {
      return position;
    }
  }
  return null;
}

async function craftLightningRod(bot) {
  // Find a suitable position to place the crafting table
  const craftingTablePosition = await findSuitablePosition(bot);

  // Place the crafting table at the found position
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Check if there are enough copper ingots in the inventory
  const copperIngotsCount = bot.inventory.count(mcData.itemsByName.copper_ingot.id);

  // If not enough copper ingots, mine copper ores and smelt them into copper ingots
  if (copperIngotsCount < 3) {
    await mineBlock(bot, "copper_ore", 3 - copperIngotsCount);
    bot.chat("Collected copper ores.");
    await smeltItem(bot, "copper_ore", "coal", 3 - copperIngotsCount);
    bot.chat("Smelted copper ores into copper ingots.");
  }

  // Craft a lightning rod using the crafting table
  await craftItem(bot, "lightning_rod", 1);
  bot.chat("Crafted a lightning rod.");
}