async function mineFiveCopperOres(bot) {
  const copperOreCount = bot.inventory.count(mcData.itemsByName.copper_ore.id);
  if (copperOreCount >= 5) {
    bot.chat("Already have 5 copper ores in inventory.");
    return;
  }
  await bot.equip(mcData.itemsByName.iron_pickaxe.id, "hand");
  await mineBlock(bot, "copper_ore", 5 - copperOreCount);
  bot.chat("5 copper ores mined.");
}