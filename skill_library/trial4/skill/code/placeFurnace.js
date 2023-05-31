async function placeFurnace(bot) {
  // Check if the bot has a furnace in its inventory
  const furnaceCount = bot.inventory.count(mcData.itemsByName.furnace.id);
  if (furnaceCount > 0) {
    // Find a suitable position to place the furnace
    const furnacePosition = bot.entity.position.offset(1, -1, 1);

    // Place the furnace at the found position
    await placeItem(bot, "furnace", furnacePosition);
    bot.chat("Furnace placed.");
  } else {
    bot.chat("No furnace in inventory.");
  }
}