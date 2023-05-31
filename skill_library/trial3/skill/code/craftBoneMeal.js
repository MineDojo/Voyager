async function craftBoneMeal(bot) {
  // Check if there are enough bones in the inventory
  const bones = bot.inventory.count(mcData.itemsByName["bone"].id);
  if (bones < 2) {
    bot.chat("Not enough bones to craft 4 bone meal.");
    return;
  }

  // Place the crafting table near the player
  const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Craft 4 bone meal using 2 bones and the crafting table
  await craftItem(bot, "bone_meal", 2, craftingTablePosition);
  bot.chat("4 bone meal crafted.");
}