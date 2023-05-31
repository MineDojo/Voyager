async function craftIronPickaxeWithMaterials(bot) {
  const requiredIronIngots = 3;
  const requiredSticks = 2;
  const ironIngotsCount = bot.inventory.count(mcData.itemsByName.iron_ingot.id);
  const sticksCount = bot.inventory.count(mcData.itemsByName.stick.id);
  if (ironIngotsCount < requiredIronIngots) {
    bot.chat("Not enough iron ingots. Mining iron ores...");
    await mineBlock(bot, "iron_ore", requiredIronIngots - ironIngotsCount);
    bot.chat("Iron ores mined. Smelting iron ingots...");
    await smeltItem(bot, "iron_ore", "coal", requiredIronIngots - ironIngotsCount);
    bot.chat("Iron ingots smelted.");
  }
  if (sticksCount < requiredSticks) {
    bot.chat("Not enough sticks. Crafting more...");
    await craftItem(bot, "stick", requiredSticks - sticksCount);
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
  await craftItem(bot, "iron_pickaxe", 1);
  bot.chat("Iron pickaxe crafted.");
}