async function eatCookedBeef(bot) {
  // Equip a cooked beef in the bot's hand
  const cookedBeef = bot.inventory.findInventoryItem(mcData.itemsByName["cooked_beef"].id);
  await bot.equip(cookedBeef, "hand");

  // Consume the cooked beef
  await bot.consume();
  bot.chat("1 cooked beef eaten.");
}