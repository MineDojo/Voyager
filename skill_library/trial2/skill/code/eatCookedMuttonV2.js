async function eatCookedMutton(bot) {
  const cookedMutton = bot.inventory.findInventoryItem(mcData.itemsByName.cooked_mutton.id);
  await bot.equip(cookedMutton, "hand");
  await bot.consume();
  bot.chat("Cooked mutton eaten.");
}