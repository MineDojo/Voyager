async function equipIronChestplate(bot) {
  // Find the iron chestplate in the inventory
  const ironChestplate = bot.inventory.findInventoryItem(mcData.itemsByName.iron_chestplate.id);

  // Equip the iron chestplate
  if (ironChestplate) {
    await bot.equip(ironChestplate, "torso");
    bot.chat("Equipped iron chestplate.");
  } else {
    bot.chat("Iron chestplate not found in inventory.");
  }
}