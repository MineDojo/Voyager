async function craftCopperBlock(bot) {
  // Check if there are enough copper ingots in the inventory
  const copperIngots = bot.inventory.count(mcData.itemsByName["copper_ingot"].id);
  if (copperIngots < 9) {
    bot.chat("Not enough copper ingots to craft a copper block.");
    return;
  }

  // Place the crafting table near the player
  const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Craft a copper block using copper ingots and the crafting table
  await craftItem(bot, "copper_block", 1, craftingTablePosition);
  bot.chat("Copper block crafted.");
}