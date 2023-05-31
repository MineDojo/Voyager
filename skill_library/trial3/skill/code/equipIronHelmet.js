async function equipIronHelmet(bot) {
  // Find the iron helmet in the bot's inventory
  const ironHelmet = bot.inventory.findInventoryItem(mcData.itemsByName["iron_helmet"].id);

  // Equip the iron helmet in the head slot
  await bot.equip(ironHelmet, "head");
  bot.chat("Iron helmet equipped.");
}