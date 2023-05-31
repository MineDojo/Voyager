async function mineEightCobblestone(bot) {
  // Equip the wooden pickaxe
  const woodenPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName["wooden_pickaxe"].id);
  await bot.equip(woodenPickaxe, "hand");

  // Find stone blocks
  const stoneBlocks = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const stone = bot.findBlock({
      matching: mcData.blocksByName["stone"].id,
      maxDistance: 32
    });
    return stone;
  });

  // Mine 8 cobblestone
  await mineBlock(bot, "stone", 8);
  bot.chat("8 cobblestone mined.");
}