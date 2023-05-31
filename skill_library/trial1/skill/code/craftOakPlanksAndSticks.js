async function craftOakPlanksAndSticks(bot) {
  // Check if there are enough oak planks in the inventory
  const oakPlanksCount = bot.inventory.count(mcData.itemsByName.oak_planks.id);

  // If not, craft oak planks from oak logs
  if (oakPlanksCount < 8) {
    const oakLogsCount = bot.inventory.count(mcData.itemsByName.oak_log.id);
    const planksToCraft = Math.ceil((8 - oakPlanksCount) / 4);
    if (oakLogsCount >= planksToCraft) {
      await craftItem(bot, "oak_planks", planksToCraft);
      bot.chat("Crafted oak planks.");
    } else {
      bot.chat("Not enough oak logs to craft oak planks.");
      return;
    }
  }

  // Check if there are enough sticks in the inventory
  const sticksCount = bot.inventory.count(mcData.itemsByName.stick.id);

  // If not, craft sticks from oak planks
  if (sticksCount < 4) {
    await craftItem(bot, "stick", 2);
    bot.chat("Crafted sticks.");
  }
}