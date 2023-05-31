async function cookPorkchops(bot) {
  // Check if there is a furnace in the inventory
  const furnaceItem = bot.inventory.findInventoryItem(mcData.itemsByName.furnace.id);

  // If not, craft a furnace using the available cobblestone
  if (!furnaceItem) {
    await craftFurnace(bot);
  }

  // Place the furnace near the bot
  const furnacePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "furnace", furnacePosition);

  // Smelt 2 porkchops using the available coal as fuel
  await smeltItem(bot, "porkchop", "coal", 2);
  bot.chat("2 porkchops cooked.");
}