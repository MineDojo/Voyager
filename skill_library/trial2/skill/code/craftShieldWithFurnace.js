async function craftShieldWithFurnace(bot) {
  const requiredIronIngots = 1;
  const requiredSprucePlanks = 6;
  const ironIngotsCount = bot.inventory.count(mcData.itemsByName.iron_ingot.id);
  const sprucePlanksCount = bot.inventory.count(mcData.itemsByName.spruce_planks.id);
  if (ironIngotsCount < requiredIronIngots) {
    bot.chat("Not enough iron ingots. Smelting iron ingots...");
    const furnace = bot.findBlock({
      matching: mcData.blocksByName.furnace.id,
      maxDistance: 32
    });
    if (!furnace) {
      const furnacePosition = bot.entity.position.offset(1, 0, 0);
      await placeItem(bot, "furnace", furnacePosition);
      bot.chat("Furnace placed.");
    }
    await smeltItem(bot, "raw_iron", "coal", requiredIronIngots - ironIngotsCount);
    bot.chat("Iron ingots smelted.");
  }
  if (sprucePlanksCount < requiredSprucePlanks) {
    bot.chat("Not enough spruce planks. Crafting more...");
    await craftItem(bot, "spruce_planks", requiredSprucePlanks - sprucePlanksCount);
    bot.chat("Spruce planks crafted.");
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
  await craftItem(bot, "shield", 1);
  bot.chat("Shield crafted.");
}