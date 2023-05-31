async function smeltRawIron(bot) {
  // Find a suitable position to place the furnace
  const furnacePosition = bot.entity.position.offset(1, -1, 1);

  // Place the furnace at the found position
  await placeItem(bot, "furnace", furnacePosition);
  bot.chat("Furnace placed.");

  // Mine 1 coal_ore as fuel
  await mineBlock(bot, "coal_ore", 1);
  bot.chat("Coal mined.");

  // Smelt the raw iron using the furnace and the mined coal as fuel
  await smeltItem(bot, "raw_iron", "coal", 1);
  bot.chat("Raw iron smelted.");
}