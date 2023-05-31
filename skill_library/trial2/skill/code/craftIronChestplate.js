async function craftIronChestplate(bot) {
  const requiredIronIngots = 8;
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
  await craftItem(bot, "iron_chestplate", 1);
  bot.chat("Iron chestplate crafted.");
}