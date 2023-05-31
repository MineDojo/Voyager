async function craftIronHelmet(bot) {
  const requiredIronIngots = 5;
  const ironIngotsCount = bot.inventory.count(mcData.itemsByName.iron_ingot.id);
  if (ironIngotsCount < requiredIronIngots) {
    bot.chat("Not enough iron ingots to craft an iron helmet.");
    return;
  }
  let craftingTable = bot.findBlock({
    matching: mcData.blocksByName.crafting_table.id,
    maxDistance: 32
  });
  if (!craftingTable) {
    const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
    await placeItem(bot, "crafting_table", craftingTablePosition);
    bot.chat("Crafting_table placed.");
    // Update the craftingTable variable after placing it
    craftingTable = bot.blockAt(craftingTablePosition);
  }
  await craftItem(bot, "iron_helmet", 1);
  bot.chat("Iron helmet crafted.");
}