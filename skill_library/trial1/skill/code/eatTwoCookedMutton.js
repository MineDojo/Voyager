async function eatTwoCookedMutton(bot) {
  // Check if there are 2 cooked mutton in the inventory
  const cookedMutton = bot.inventory.findInventoryItem(mcData.itemsByName.cooked_mutton.id);
  if (!cookedMutton || cookedMutton.count < 2) {
    bot.chat("Not enough cooked mutton in the inventory.");
    return;
  }

  // Equip the cooked mutton in the bot's hand
  await bot.equip(cookedMutton, "hand");

  // Consume the cooked mutton twice
  await bot.consume();
  await bot.consume();

  // Send a chat message to indicate the task is completed
  bot.chat("Ate 2 cooked mutton.");
}