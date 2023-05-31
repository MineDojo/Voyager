async function craftTorches(bot) {
  const requiredCoal = 2;
  const requiredSticks = 2;
  const coalCount = bot.inventory.count(mcData.itemsByName.coal.id);
  const sticksCount = bot.inventory.count(mcData.itemsByName.stick.id);
  if (coalCount < requiredCoal) {
    bot.chat("Not enough coal. Mining more...");
    await mineBlock(bot, "coal_ore", requiredCoal - coalCount);
    bot.chat("Coal mined.");
  }
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
  await craftItem(bot, "torch", 1);
  bot.chat("8 torches crafted.");
}