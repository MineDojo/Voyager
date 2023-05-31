async function craftStoneShovel(bot) {
  // Check if there are enough cobblestone and sticks in the inventory
  const cobblestoneCount = bot.inventory.count(mcData.itemsByName.cobblestone.id);
  const sticksCount = bot.inventory.count(mcData.itemsByName.stick.id);

  // If not enough cobblestone, mine cobblestone
  if (cobblestoneCount < 1) {
    await mineBlock(bot, "stone", 1);
    bot.chat("Collected cobblestone.");
  }

  // If not enough sticks, craft sticks
  if (sticksCount < 2) {
    await craftItem(bot, "stick", 1);
    bot.chat("Crafted sticks.");
  }

  // Place the crafting table near the bot
  const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Craft a stone shovel using the crafting table
  await craftItem(bot, "stone_shovel", 1);
  bot.chat("Crafted a stone shovel.");
}