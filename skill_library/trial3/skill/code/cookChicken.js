async function cookChicken(bot) {
  // Check if there is a furnace in the inventory
  const furnace = bot.inventory.findInventoryItem(mcData.itemsByName["furnace"].id);

  // If there is no furnace, craft one using cobblestone
  if (!furnace) {
    await craftItem(bot, "furnace", 1);
  }

  // Place the furnace near the player
  const furnacePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "furnace", furnacePosition);

  // Smelt the raw chicken using coal as fuel in the furnace
  await smeltItem(bot, "chicken", "coal", 1);

  // Collect the cooked chicken
  bot.chat("1 chicken cooked.");
}