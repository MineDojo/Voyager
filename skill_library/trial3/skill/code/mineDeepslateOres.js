async function mineDeepslateOres(bot) {
  // Equip the iron pickaxe
  const ironPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName["iron_pickaxe"].id);
  await bot.equip(ironPickaxe, "hand");

  // Find and mine 1 deepslate_redstone_ore
  await mineBlock(bot, "deepslate_redstone_ore", 1);
  bot.chat("1 deepslate_redstone_ore mined.");

  // Find and mine 1 deepslate_gold_ore
  await mineBlock(bot, "deepslate_gold_ore", 1);
  bot.chat("1 deepslate_gold_ore mined.");
}