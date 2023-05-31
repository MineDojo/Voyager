async function craftWoodenPickaxe(bot) {
  // check if crafting table is in the inventory
  const craftingTableCount = bot.inventory.count(
    mcData.itemsByName.crafting_table.id
  );

  // If not, craft a crafting table
  if (craftingTableCount === 0) {
    await craftCraftingTable(bot);
  }

  // Check if there are enough oak planks in the inventory
  const oakPlanksCount = bot.inventory.count(mcData.itemsByName.oak_planks.id);

  // If not, craft oak planks from oak logs
  if (oakPlanksCount < 6) {
    const oakLogsCount = bot.inventory.count(mcData.itemsByName.oak_log.id);
    const planksToCraft = Math.ceil((6 - oakPlanksCount) / 4);
    if (oakLogsCount < planksToCraft) {
      await mineBlock(bot, "oak_log", planksToCraft - oakLogsCount);
    }
    await craftItem(bot, "oak_planks", planksToCraft);
    bot.chat("Crafted oak planks.");
  }

  // Check if there are enough sticks in the inventory
  const sticksCount = bot.inventory.count(mcData.itemsByName.stick.id);

  // If not, craft sticks from oak planks
  if (sticksCount < 2) {
    await craftItem(bot, "stick", 1);
    bot.chat("Crafted sticks.");
  }

  // Place the crafting table near the bot
  const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Craft a wooden pickaxe using the crafting table
  await craftItem(bot, "wooden_pickaxe", 1);
  bot.chat("Crafted a wooden pickaxe.");
}
