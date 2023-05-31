async function eatCookedPorkchop(bot) {
  // Equip the cooked porkchop in the bot's hand
  const cookedPorkchop = bot.inventory.findInventoryItem(mcData.itemsByName.cooked_porkchop.id);
  await bot.equip(cookedPorkchop, "hand");

  // Consume the cooked porkchop
  await bot.consume();

  // Send a chat message to indicate the task is completed
  bot.chat("Ate 1 cooked porkchop.");
}