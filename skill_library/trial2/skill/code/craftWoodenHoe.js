async function craftWoodenHoe(bot) {
  const requiredPlanks = 2;
  const requiredSticks = 2;
  const planksCount = bot.inventory.count(mcData.itemsByName.spruce_planks.id);
  const sticksCount = bot.inventory.count(mcData.itemsByName.stick.id);
  if (planksCount < requiredPlanks) {
    bot.chat("Not enough spruce_planks. Crafting more...");
    await craftItem(bot, "spruce_planks", requiredPlanks - planksCount);
    bot.chat("Spruce_planks crafted.");
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
  await craftItem(bot, "wooden_hoe", 1);
  bot.chat("Wooden hoe crafted.");
}