async function craftFurnace(bot) {
  const requiredCobblestones = 8;
  const cobblestoneCount = bot.inventory.count(mcData.itemsByName.cobblestone.id);
  if (cobblestoneCount < requiredCobblestones) {
    bot.chat("Not enough cobblestones to craft a furnace.");
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
  await craftItem(bot, "furnace", 1);
  bot.chat("Furnace crafted.");
}