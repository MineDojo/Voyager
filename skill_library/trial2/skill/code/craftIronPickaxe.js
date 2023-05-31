async function craftIronPickaxe(bot) {
  const requiredIronIngots = 3;
  const requiredSticks = 2;
  const ironIngotsCount = bot.inventory.count(mcData.itemsByName.iron_ingot.id);
  const sticksCount = bot.inventory.count(mcData.itemsByName.stick.id);
  if (ironIngotsCount < requiredIronIngots || sticksCount < requiredSticks) {
    bot.chat("Not enough iron ingots or sticks to craft an iron pickaxe.");
    return;
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
  await craftItem(bot, "iron_pickaxe", 1);
  bot.chat("Iron pickaxe crafted.");
}