async function cookRawMutton(bot) {
  // Check if there is a furnace in the inventory
  const furnace = bot.inventory.findInventoryItem(mcData.itemsByName["furnace"].id);

  // If there is no furnace, craft one using cobblestone
  if (!furnace) {
    await craftItem(bot, "furnace", 1);
  }

  // Place the furnace near the player
  const furnacePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "furnace", furnacePosition);

  // Smelt the 4 raw mutton using coal as fuel in the furnace
  await smeltItem(bot, "mutton", "coal", 4);

  // Collect the cooked mutton
  bot.chat("4 raw mutton cooked.");
}