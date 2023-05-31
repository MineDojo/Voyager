async function smeltRawIron(bot) {
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
  const requiredCoal = 3;
  const coalCount = bot.inventory.count(mcData.itemsByName.coal.id);
  if (coalCount < requiredCoal) {
    bot.chat("Not enough coal. Mining more coal...");
    await mineBlock(bot, "coal_ore", requiredCoal - coalCount);
  }
  await smeltItem(bot, "raw_iron", "coal", 3);
  bot.chat("3 raw iron smelted.");
}