async function eatCookedMuttonIfHungry(bot) {
  // Check if the bot's hunger is less than 20
  if (bot.food < 20) {
    // Equip the cooked mutton in the bot's hand
    const cookedMutton = bot.inventory.findInventoryItem(mcData.itemsByName["cooked_mutton"].id);
    await bot.equip(cookedMutton, "hand");

    // Consume the cooked mutton
    await bot.consume();
    bot.chat("1 cooked mutton eaten.");
  } else {
    bot.chat("Hunger is full, no need to eat cooked mutton.");
  }
}