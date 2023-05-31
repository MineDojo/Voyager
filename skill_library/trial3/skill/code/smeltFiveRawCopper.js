async function smeltFiveRawCopper(bot) {
  // Find a suitable location to place the furnace
  const furnacePosition = bot.entity.position.offset(1, 0, 0);

  // Place the furnace
  await placeItem(bot, "furnace", furnacePosition);

  // Smelt 5 raw copper using coal as fuel
  await smeltItem(bot, "raw_copper", "coal", 5);
  bot.chat("5 raw copper smelted.");
}