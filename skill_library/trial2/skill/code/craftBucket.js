async function craftBucket(bot) {
  const requiredIronIngots = 3;
  const ironIngotsCount = bot.inventory.count(mcData.itemsByName.iron_ingot.id);
  if (ironIngotsCount < requiredIronIngots) {
    bot.chat("Not enough iron ingots to craft a bucket.");
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
  await craftItem(bot, "bucket", 1);
  bot.chat("Bucket crafted.");
}