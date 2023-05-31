async function mineFiveCopperOre(bot) {
  // Equip the iron pickaxe
  const ironPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName["iron_pickaxe"].id);
  await bot.equip(ironPickaxe, "hand");

  // Find 5 copper ore blocks
  const copperOres = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const copperOres = bot.findBlocks({
      matching: mcData.blocksByName["copper_ore"].id,
      maxDistance: 32,
      count: 5
    });
    return copperOres.length >= 5 ? copperOres : null;
  });

  // Mine the 5 copper ore blocks
  await mineBlock(bot, "copper_ore", 5);
  bot.chat("5 copper ore mined.");
}