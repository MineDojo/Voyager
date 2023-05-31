async function smeltRawCopper(bot) {
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
  const requiredCoal = 7;
  const coalCount = bot.inventory.count(mcData.itemsByName.coal.id);
  if (coalCount < requiredCoal) {
    bot.chat("Not enough coal. Mining more coal...");
    await mineCoalOre(bot);
  }
  await smeltItem(bot, "raw_copper", "coal", 7);
  bot.chat("7 raw copper smelted.");
}