async function craftSixteenTorches(bot) {
  const requiredSticks = 4;
  const sticksCount = bot.inventory.count(mcData.itemsByName.stick.id);
  if (sticksCount < requiredSticks) {
    bot.chat("Not enough sticks. Crafting more...");
    await craftItem(bot, "stick", 1);
    bot.chat("Sticks crafted.");
  }
  const craftingTable = bot.findBlock({
    matching: mcData.blocksByName.crafting_table.id,
    maxDistance: 32
  });
  if (!craftingTable) {
    const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
    await placeItem(bot, "crafting_table", craftingTablePosition);
    bot.chat("Crafting_table placed.");
  }
  await craftItem(bot, "torch", 2);
  bot.chat("16 torches crafted.");
}