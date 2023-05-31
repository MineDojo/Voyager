async function smeltOneRawIron(bot) {
  const furnaceInInventory = bot.inventory.findInventoryItem(mcData.itemsByName.furnace.id);
  if (!furnaceInInventory) {
    bot.chat("No furnace found in inventory. Please craft one first.");
    return;
  }
  let furnacePosition = bot.entity.position.offset(1, 0, 0);
  const blockAtFurnacePosition = bot.blockAt(furnacePosition);
  if (blockAtFurnacePosition.name === "coal_ore") {
    furnacePosition = bot.entity.position.offset(-1, 0, 0);
  }
  await placeItem(bot, "furnace", furnacePosition);
  bot.chat("Furnace placed.");
  await smeltItem(bot, "raw_iron", "coal", 1);
  bot.chat("1 raw iron smelted.");
}