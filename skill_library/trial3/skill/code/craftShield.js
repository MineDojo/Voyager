async function craftShield(bot) {
  // Check if there are enough oak planks in the inventory
  const oakPlanks = bot.inventory.count(mcData.itemsByName["oak_planks"].id);
  if (oakPlanks < 6) {
    // Craft more oak planks using oak logs
    await craftItem(bot, "oak_planks", 6 - oakPlanks);
  }

  // Check if there are enough iron ingots in the inventory
  const ironIngots = bot.inventory.count(mcData.itemsByName["iron_ingot"].id);
  if (ironIngots < 1) {
    bot.chat("Not enough iron ingots to craft a shield.");
    return;
  }

  // Place the crafting table near the player
  const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Craft a shield using oak planks and iron ingots with the crafting table
  await craftItem(bot, "shield", 1, craftingTablePosition);
  bot.chat("Shield crafted.");
}