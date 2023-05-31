async function craftShieldWithIron(bot) {
  // Check if we have enough spruce planks
  const sprucePlankCount = bot.inventory.count(mcData.itemsByName.spruce_planks.id);
  if (sprucePlankCount < 6) {
    // Mine 3 more spruce planks
    await mineBlock(bot, "spruce_log", 3);
    // Craft spruce planks from spruce logs
    await craftItem(bot, "spruce_planks", 3);
    bot.chat("Spruce planks crafted.");
  }

  // Check if we have enough iron ingots
  const ironIngotCount = bot.inventory.count(mcData.itemsByName.iron_ingot.id);
  if (ironIngotCount < 1) {
    // Mine iron ore
    await mineBlock(bot, "iron_ore", 1);
    bot.chat("Iron ore mined.");

    // Place a furnace if it's not already placed
    const furnacePosition = bot.entity.position.offset(1, -1, 0);
    const furnaceBlock = bot.blockAt(furnacePosition);
    if (!furnaceBlock || furnaceBlock.name !== "furnace") {
      await placeItem(bot, "furnace", furnacePosition);
      bot.chat("Furnace placed.");
    }

    // Smelt iron ore into iron ingot using a furnace
    await smeltItem(bot, "raw_iron", "coal", 1);
    bot.chat("Iron ingot smelted.");
  }

  // Place the crafting table if it's not already placed
  const craftingTablePosition = bot.entity.position.offset(1, -1, 0);
  const craftingTableBlock = bot.blockAt(craftingTablePosition);
  if (!craftingTableBlock || craftingTableBlock.name !== "crafting_table") {
    await placeItem(bot, "crafting_table", craftingTablePosition);
    bot.chat("Crafting table placed.");
  }

  // Craft the shield using the 6 spruce planks and 1 iron ingot
  await craftItem(bot, "shield", 1);
  bot.chat("Shield crafted.");
}