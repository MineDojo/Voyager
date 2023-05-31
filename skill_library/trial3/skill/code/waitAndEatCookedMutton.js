async function waitAndEatCookedMutton(bot) {
  // Wait until the bot's hunger is less than 20
  while (bot.food >= 20) {
    await bot.waitForTicks(20);
  }

  // Equip a cooked mutton in the bot's hand
  const cookedMutton = bot.inventory.findInventoryItem(mcData.itemsByName["cooked_mutton"].id);
  await bot.equip(cookedMutton, "hand");

  // Consume the cooked mutton
  await bot.consume();
  bot.chat("1 cooked mutton eaten.");
}