async function craftIronLeggingsAndBoots(bot) {
  const requiredIronIngots = 11; // 7 for leggings, 4 for boots
  const ironIngotsCount = bot.inventory.count(mcData.itemsByName.iron_ingot.id);
  if (ironIngotsCount < requiredIronIngots) {
    bot.chat("Not enough iron ingots. Mining iron ores...");
    await mineBlock(bot, "iron_ore", requiredIronIngots - ironIngotsCount);
    bot.chat("Iron ores mined. Smelting iron ingots...");
    await smeltItem(bot, "iron_ore", "coal", requiredIronIngots - ironIngotsCount);
    bot.chat("Iron ingots smelted.");
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
  await craftItem(bot, "iron_leggings", 1);
  bot.chat("Iron leggings crafted.");
  await craftItem(bot, "iron_boots", 1);
  bot.chat("Iron boots crafted.");
}