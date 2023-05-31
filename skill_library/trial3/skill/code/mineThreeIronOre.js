async function mineThreeIronOre(bot) {
  // Equip the stone pickaxe
  const stonePickaxe = bot.inventory.findInventoryItem(mcData.itemsByName["stone_pickaxe"].id);
  await bot.equip(stonePickaxe, "hand");

  // Find and mine 3 iron ore blocks
  await mineBlock(bot, "iron_ore", 3);
  bot.chat("3 iron ore mined.");
}