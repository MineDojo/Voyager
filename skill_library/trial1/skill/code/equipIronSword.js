async function equipIronSword(bot) {
  // Find the iron sword in the inventory
  let ironSword = bot.inventory.findInventoryItem(mcData.itemsByName.iron_sword.id);

  // If the iron sword is not found in the inventory, check the chest
  if (!ironSword) {
    const chestPosition = new Vec3(89, 41, 206);
    const itemsToGet = {
      "iron_sword": 1
    };
    await getItemFromChest(bot, chestPosition, itemsToGet);
    ironSword = bot.inventory.findInventoryItem(mcData.itemsByName.iron_sword.id);
  }

  // Equip the iron sword
  if (ironSword) {
    await bot.equip(ironSword, "hand");
    bot.chat("Equipped iron sword.");
  } else {
    bot.chat("Iron sword not found in inventory or chest.");
  }
}