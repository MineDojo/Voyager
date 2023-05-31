async function equipIronChestplate(bot) {
  // Check if the bot has an iron chestplate in its inventory
  const ironChestplate = bot.inventory.findInventoryItem(mcData.itemsByName.iron_chestplate.id);

  // If the iron chestplate is found, equip it in the "torso" slot
  if (ironChestplate) {
    await bot.equip(ironChestplate, "torso");
    bot.chat("Iron chestplate equipped.");
  } else {
    bot.chat("No iron chestplate found in the inventory.");
  }
}