async function mineFiveCoalOre(bot) {
  // Equip the iron pickaxe
  const ironPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName["iron_pickaxe"].id);
  await bot.equip(ironPickaxe, "hand");

  // Find 5 coal ore blocks
  const coalOres = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const coalOres = bot.findBlocks({
      matching: mcData.blocksByName["coal_ore"].id,
      maxDistance: 32,
      count: 5
    });
    return coalOres.length >= 5 ? coalOres : null;
  });

  // Mine the 5 coal ore blocks
  await mineBlock(bot, "coal_ore", 5);
  bot.chat("5 coal ore mined.");
}