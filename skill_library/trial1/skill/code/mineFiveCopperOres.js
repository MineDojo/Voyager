async function mineFiveCopperOres(bot) {
  // Equip the stone pickaxe
  const stonePickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.stone_pickaxe.id);
  await bot.equip(stonePickaxe, "hand");

  // Find 5 copper_ore blocks
  const copperOres = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const copperOres = bot.findBlocks({
      matching: block => block.name === "copper_ore",
      maxDistance: 32,
      count: 5
    });
    return copperOres.length >= 5 ? copperOres : null;
  });
  if (!copperOres) {
    bot.chat("Could not find enough copper ores.");
    return;
  }

  // Mine the 5 copper_ore blocks
  await mineBlock(bot, "copper_ore", 5);
  bot.chat("5 copper ores mined.");
}