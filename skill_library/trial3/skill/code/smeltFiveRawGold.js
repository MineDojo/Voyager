async function smeltFiveRawGold(bot) {
  // Check if there is a furnace in the inventory
  const furnace = bot.inventory.findInventoryItem(mcData.itemsByName["furnace"].id);

  // If there is no furnace, craft one using cobblestone
  if (!furnace) {
    await craftItem(bot, "furnace", 1);
  }

  // Place the furnace near the player
  const furnacePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "furnace", furnacePosition);

  // Smelt the 5 raw gold using coal as fuel in the furnace
  await smeltItem(bot, "raw_gold", "coal", 5);

  // Collect the smelted gold ingots
  bot.chat("5 raw gold smelted.");
}