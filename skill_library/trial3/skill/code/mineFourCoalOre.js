async function mineFourCoalOre(bot) {
  // Equip the stone pickaxe
  const stonePickaxe = bot.inventory.findInventoryItem(mcData.itemsByName["stone_pickaxe"].id);
  await bot.equip(stonePickaxe, "hand");

  // Find and mine 4 coal ore blocks
  await mineBlock(bot, "coal_ore", 4);
  bot.chat("4 coal ore mined.");
}