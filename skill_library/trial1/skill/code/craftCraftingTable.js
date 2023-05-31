async function craftCraftingTable(bot) {
  // Check if there are enough oak planks in the inventory
  const oakPlanksCount = bot.inventory.count(mcData.itemsByName.oak_planks.id);

  // If not, craft oak planks from oak logs
  if (oakPlanksCount < 4) {
    const oakLogsCount = bot.inventory.count(mcData.itemsByName.oak_log.id);
    const planksToCraft = Math.ceil((4 - oakPlanksCount) / 4);
    if (oakLogsCount >= planksToCraft) {
      await craftItem(bot, "oak_planks", planksToCraft);
      bot.chat("Crafted oak planks.");
    } else {
      bot.chat("Not enough oak logs to craft oak planks.");
      return;
    }
  }

  // Craft a crafting table using oak planks
  await craftItem(bot, "crafting_table", 1);
  bot.chat("Crafted a crafting table.");
}