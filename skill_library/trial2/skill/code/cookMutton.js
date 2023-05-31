async function cookMutton(bot) {
  const rawMuttonCount = bot.inventory.count(mcData.itemsByName.mutton.id);
  if (rawMuttonCount < 5) {
    bot.chat("Not enough raw mutton to cook. Please collect more first.");
    return;
  }
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
  const requiredCoal = 5;
  const coalCount = bot.inventory.count(mcData.itemsByName.coal.id);
  if (coalCount < requiredCoal) {
    bot.chat("Not enough coal. Mining more coal...");
    await mineBlock(bot, "coal_ore", requiredCoal - coalCount);
  }
  await smeltItem(bot, "mutton", "coal", 5);
  bot.chat("5 mutton cooked.");
}