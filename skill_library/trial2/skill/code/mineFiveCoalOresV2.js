async function mineFiveCoalOres(bot) {
  const stonePickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.stone_pickaxe.id);
  if (!stonePickaxe) {
    bot.chat("No stone pickaxe found in inventory.");
    return;
  }
  await bot.equip(mcData.itemsByName.stone_pickaxe.id, "hand");
  await mineBlock(bot, "coal_ore", 5);
  bot.chat("5 coal ores mined.");
}