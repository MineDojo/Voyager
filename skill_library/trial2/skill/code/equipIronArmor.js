async function equipIronArmor(bot) {
  const ironHelmet = bot.inventory.findInventoryItem(mcData.itemsByName.iron_helmet.id);
  const ironChestplate = bot.inventory.findInventoryItem(mcData.itemsByName.iron_chestplate.id);
  const ironLeggings = bot.inventory.findInventoryItem(mcData.itemsByName.iron_leggings.id);
  const ironBoots = bot.inventory.findInventoryItem(mcData.itemsByName.iron_boots.id);
  if (ironHelmet) {
    await bot.equip(ironHelmet, "head");
    bot.chat("Iron helmet equipped.");
  } else {
    bot.chat("Iron helmet not found in inventory.");
  }
  if (ironChestplate) {
    await bot.equip(ironChestplate, "torso");
    bot.chat("Iron chestplate equipped.");
  } else {
    bot.chat("Iron chestplate not found in inventory.");
  }
  if (ironLeggings) {
    await bot.equip(ironLeggings, "legs");
    bot.chat("Iron leggings equipped.");
  } else {
    bot.chat("Iron leggings not found in inventory.");
  }
  if (ironBoots) {
    await bot.equip(ironBoots, "feet");
    bot.chat("Iron boots equipped.");
  } else {
    bot.chat("Iron boots not found in inventory.");
  }
}