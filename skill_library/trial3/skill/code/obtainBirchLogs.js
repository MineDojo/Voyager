async function obtainBirchLogs(bot) {
  // Check if there are enough birch logs in the inventory
  const birchLogs = bot.inventory.count(mcData.itemsByName["birch_log"].id);
  const logsNeeded = 5 - birchLogs;
  if (logsNeeded > 0) {
    // Mine the required number of birch logs
    await mineBlock(bot, "birch_log", logsNeeded);
    bot.chat("5 birch logs obtained.");
  } else {
    bot.chat("Already have 5 birch logs in the inventory.");
  }
}