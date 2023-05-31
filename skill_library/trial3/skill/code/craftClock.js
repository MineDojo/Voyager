async function craftClock(bot) {
  // Check if there is a crafting table in the inventory
  const craftingTable = bot.inventory.findInventoryItem(mcData.itemsByName["crafting_table"].id);

  // If there is no crafting table, craft one using oak planks
  if (!craftingTable) {
    await craftItem(bot, "crafting_table", 1);
  }

  // Place the crafting table near the player
  const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Craft a clock using 4 gold ingots and 1 redstone dust with the crafting table
  await craftItem(bot, "clock", 1, craftingTablePosition);
  bot.chat("Clock crafted.");
}