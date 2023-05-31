async function craftStoneSword(bot) {
  const requiredCobblestones = 2;
  const requiredSticks = 1;
  const cobblestoneCount = bot.inventory.count(mcData.itemsByName.cobblestone.id);
  const sticksCount = bot.inventory.count(mcData.itemsByName.stick.id);
  if (cobblestoneCount < requiredCobblestones) {
    bot.chat("Not enough cobblestones. Mining more...");
    await mineBlock(bot, "stone", requiredCobblestones - cobblestoneCount);
    bot.chat("Cobblestones mined.");
  }
  if (sticksCount < requiredSticks) {
    bot.chat("Not enough sticks. Crafting more...");
    await craftSticks(bot);
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
  await craftItem(bot, "stone_sword", 1);
  bot.chat("Stone sword crafted.");
}