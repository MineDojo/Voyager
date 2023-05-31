async function findSuitablePosition(bot) {
  const offsets = [
    new Vec3(1, 0, 0),
    new Vec3(-1, 0, 0),
    new Vec3(0, 0, 1),
    new Vec3(0, 0, -1),
  ];
  for (const offset of offsets) {
    const position = bot.entity.position.offset(offset.x, offset.y, offset.z);
    const block = bot.blockAt(position);
    if (block.name === "air") {
      return position;
    }
  }
  return null;
}

async function smeltFiveRawIron(bot) {
  // Check if there is coal in the inventory
  const coalCount = bot.inventory.count(mcData.itemsByName.coal.id);
  // If not enough coal, mine coal_ore to obtain coal
  if (coalCount < 3) {
    await mineBlock(bot, "coal_ore", 3 - coalCount);
    bot.chat("Collected coal.");
  }
  // Check if there is a furnace in the inventory
  const furnaceItem = bot.inventory.findInventoryItem(
    mcData.itemsByName.furnace.id
  );

  // If not, craft a furnace using the available cobblestone
  if (!furnaceItem) {
    await craftFurnace(bot);
  }

  // Find a suitable position to place the furnace
  const furnacePosition = await findSuitablePosition(bot);
  if (!furnacePosition) {
    bot.chat("Could not find a suitable position to place the furnace.");
    return;
  }

  // Place the furnace at the suitable position
  await placeItem(bot, "furnace", furnacePosition);

  // Smelt 5 raw iron using the available coal as fuel
  await smeltItem(bot, "raw_iron", "coal", 5);
  bot.chat("5 raw iron smelted.");
}
