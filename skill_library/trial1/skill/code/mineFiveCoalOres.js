async function mineFiveCoalOres(bot) {
  // Equip the wooden pickaxe
  const woodenPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.wooden_pickaxe.id);
  await bot.equip(woodenPickaxe, "hand");

  // Find 5 coal_ore blocks
  const coalOres = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const coalOres = bot.findBlocks({
      matching: block => block.name === "coal_ore",
      maxDistance: 32,
      count: 5
    });
    return coalOres.length >= 5 ? coalOres : null;
  });
  if (!coalOres) {
    bot.chat("Could not find enough coal ores.");
    return;
  }

  // Mine the 5 coal_ore blocks
  await mineBlock(bot, "coal_ore", 5);
  bot.chat("5 coal ores mined.");
}