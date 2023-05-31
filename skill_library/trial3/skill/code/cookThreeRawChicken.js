async function cookThreeRawChicken(bot) {
  // Find a suitable location to place the furnace
  const furnacePosition = bot.entity.position.offset(1, 0, 0);

  // Place the furnace
  await placeItem(bot, "furnace", furnacePosition);

  // Smelt 3 raw chicken using coal as fuel
  await smeltItem(bot, "chicken", "coal", 3);
  bot.chat("3 raw chicken cooked.");
}